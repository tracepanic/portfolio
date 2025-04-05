---
title: "Advanced Authorization in NestJS with Roles, Permissions, Actions, and Resources"
tags: ["New", "NestJS", "Authentication"]
slug: "advanced-authorization-in-nestjs"
date: "2025-04-05"
readTime: 14
image: "/blogs/advanced-authorization-in-nestjs.png"
isLatest: true
description: "Implementing advanced authorization in NestJS using roles, permissions, actions, and resources to give fine-grained access control."
---

In the [previous post](https://tracepanic.com/blog/nestjs-role-based-access-control), we implemented a simple yet powerful Role-Based Access Control (RBAC) system in NestJS using guards and decorators. While that setup works great for small to medium applications, real-world systems often require more control over what users can do and where they can do it.

That’s where Policy-Based Access Control (PBAC) steps in. Think of PBAC as RBAC’s smarter cousin — it gives you fine-grained control at the action and resource level. Today, we're combining both of them for a solid, flexible, and scalable auth system.

## Why Go Beyond Basic RBAC?

RBAC is simple and intuitive — you assign users to roles (e.g., `admin`, `user`, `manager`), and those roles grant access to routes or resources. However, problems arise when:
- You need to allow `admin` to edit settings, but only allow them to read user data.
- You want `manager` to view reports but not update anything.
- You need flexibility to define custom permissions without rewriting a lot of code.

By introducing permissions, we can map roles to actions (like `CREATE`, `READ`, `UPDATE`, `DELETE`) on specific resources (like `ADMIN_SETTINGS`, `COURSE`, `USER_PROFILE`). This allows for declarative, readable, and maintainable access control.

Instead of scattering checks across your code, you define them once, assign them to roles, and the rest of the app can rely on centralized logic for checking access. This reduces duplication, prevents errors, and gives your team confidence in how access is managed across the system.

## 1. Define the Authorization Data Model

We'll begin by creating a flexible schema in Prisma for this approach.

> You can use whatever ORM, Query Builder or what you prefer. Just do SQL how your most comftable with

```
enum PermissionAction {
  READ
  CREATE
  UPDATE
  DELETE
}

enum PermissionResource {
  ADMIN_SETTINGS
}

enum UserType {
  ADMIN
  TEACHER
  STUDENT
}

model Role {
  id          String       @id @default(uuid())
  name        String       @unique
  users       User[]
  permissions Permission[] @relation("RoleToPermission")
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
}

model Permission {
  id        String             @id @default(uuid())
  actions   PermissionAction[]
  resource  PermissionResource
  roleId    String
  role      Role               @relation(fields: [roleId], references: [id], name: "RoleToPermission")
  createdAt DateTime           @default(now())
  updatedAt DateTime           @updatedAt
}

model User {
  id       String   @id @default(uuid())
  name     String
  email    String   @unique
  username String   @unique
  password String
  roleId   String?
  role     Role?     @relation(fields: [roleId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

This schema defines a relationship between users, roles, and the permissions assigned to those roles. The `Permission` model connects a role to specific `actions` it can perform on a given `resource`. You can easily extend this to include new resources or actions as your application grows.

A nice benefit of this setup is that you don’t need to hardcode permissions in your codebase. You can manage them in the database and even build an admin panel later to assign and change them dynamically.

## 2. The Permissions Decorator

From the [previous post](https://tracepanic.com/blog/nestjs-role-based-access-control) we saw how to use decorators. We will create a `@Permissions` decorator here to attach the neccessary auth metadata to routes.

Decorators in NestJS are a powerful way to declare metadata that can later be accessed by guards. This keeps your controller methods clean and expressive.

```
import { SetMetadata } from '@nestjs/common';
import { PermissionAction, PermissionResource } from '@prisma/client';

export const PERMISSIONS_KEY = 'permissions';

export const Permissions = (permissions: {
  resource: PermissionResource;
  actions: PermissionAction[];
}[]) => SetMetadata(PERMISSIONS_KEY, permissions);
```

Now when defining a controller method, you can do something like:

```
@Permissions([
  { resource: PermissionResource.ADMIN_SETTINGS, actions: [PermissionAction.READ] },
])
@Get('settings')
getSettings() {
  return this.settingsService.getSettings();
}
```

This keeps your route logic clean while still ensuring strict access control.

## 3. The Authorization Guard

Now let’s build a guard that checks whether the current user has the required permission to access a route. This guard will extract the metadata from the `@Permissions()` decorator and compare it with the permissions granted to the user’s role.

Guards in NestJS are classes that implement the `CanActivate` interface and determine whether a request should proceed or not. Here’s how you might implement a robust authorization guard:

```
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/auth/auth.service';
import { PERMISSIONS_KEY } from 'src/auth/decorators/permissions.decorator';
import { RequestWithUser } from 'src/auth/types';
import { PermissionDto } from 'src/roles/dto/request.dto';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();

    if (!request.user.sub) throw new UnauthorizedException();

    const routePermissions: PermissionDto[] = this.reflector.getAllAndOverride(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!routePermissions) return true;

    try {
      const userPermissions = await this.authService.getUserPermissions(
        request.user.sub,
      );

      if (!userPermissions) throw new ForbiddenException();

      for (const routePermission of routePermissions) {
        const userPermission = userPermissions.find(
          (perm) => perm.resource === routePermission.resource,
        );

        if (!userPermission) throw new ForbiddenException();

        const allActionsAvailable = routePermission.actions.every(
          (requiredAction) => userPermission.actions.includes(requiredAction),
        );

        if (!allActionsAvailable) throw new ForbiddenException();
      }
    } catch {
      throw new ForbiddenException();
    }

    return true;
  }
}
```

This guard ensures that the current user's role includes the appropriate permissions to perform the requested action. If not, it throws a `ForbiddenException` and blocks access.

## Applying It to Real Routes

```
@Controller('settings/admin')
export class AdminSettingsController {
  constructor(private readonly adminSettingsService: AdminSettingsService) {}

  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Permissions([
    {
      resource: PermissionResource.ADMIN_SETTINGS,
      actions: [PermissionAction.READ],
    },
  ])
  @Get('general')
  getGeneralSettings() {
    return this.adminSettingsService.getGeneralSettings();
  }

  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Permissions([
    {
      resource: PermissionResource.ADMIN_SETTINGS,
      actions: [PermissionAction.UPDATE],
    },
  ])
  @Put('general')
  updateGeneralSettings(@Body() dto: UpdateGeneralSettingsDto) {
    return this.adminSettingsService.updateGeneralSettings(dto);
  }
}
```

With this setup, even admins can't update settings unless they specifically have the `UPDATE` action on `ADMIN_SETTINGS`.

---

# Conclusion

A simple `@Roles()` check might be enough to get started, but complex applications need granular and maintainable authorization logic. Always make sure your auth scales with you. Don&apos;t go super advanced when you don&apos;t need it but also never compromise your app by going so basic.

## Next Steps
- Add caching (e.g., Redis) to reduce DB hits
- Add ABAC (attribute-based access control) if you really need it

This bulds on RBAC setup and expanded it to support full-fledged permissions, turning your NestJS app into a secure, enterprise-ready backend.

