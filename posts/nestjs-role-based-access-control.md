---
title: "Handling Role-Based Access Control (RBAC) in NestJS"
tags: ["NestJS", "Authentication"]
slug: "nestjs-role-based-access-control"
date: "2025-04-01"
readTime: 9
image: "/blogs/nestjs-role-based-access-control.webp"
isLatest: true
description: "Learn how to implement Role-Based Access Control (RBAC) in NestJS using decorators, guards, and JWT authentication to secure your application."
---

Role-Based Access Control (RBAC) is a common approach to managing permissions in applications, ensuring that only authorized users can access specific routes or perform certain actions. In this post, we'll explore how to implement RBAC in a NestJS application using guards and decorators.

## TL;DR

Even though using a fully managed auth provider like Clerk or any other provider is easy and probably saves times. Learning how to do your authentication from scratch is quite important for your learning experience.

This is not a beginners guide to RBAC but rather an overview of the overal implementation.

## 1. Setting Up User Roles

First, define the roles available in your application using an enum:

```
export enum Role {
  Admin = 'admin',
  User = 'user',
  Manager = 'manager',
}
```

This enum will help us enforce role-based access at different levels of the application.

## 2. Creating a Roles Decorator

NestJS allows us to attach metadata to routes using decorators. Let’s create a custom `@Roles()` decorator:

```
import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
```

This decorator will allow us to specify roles for each route, which our guard will later check.

## 3. Implementing the Roles Guard

Now, let’s create a `RolesGuard` that will check if a user has the required role before allowing access to a route.

```
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true; // If no roles are set, allow access
    }

    const { user } = context.switchToHttp().getRequest();
    return user && user.roles?.some((role) => requiredRoles.includes(role));
  }
}
```

This guard extracts the roles from metadata and verifies if the current user has one of the required roles.

## 4. Applying RBAC to Routes

Now, let’s secure routes using our `@Roles()` decorator and RolesGuard.

```
import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { Role } from '../enums/role.enum';

@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
  @Get('admin')
  @Roles(Role.Admin)
  getAdminData() {
    return 'This is only accessible to admins';
  }

  @Get('manager')
  @Roles(Role.Manager, Role.Admin)
  getManagerData() {
    return 'This is accessible to managers and admins';
  }
}
```

With this setup:
- The `/users/admin` route is accessible only to `Admin` users.
- The `/users/manager` route is accessible to both `Admin` and `Manager` users.

## 5. Ensuring User Role in JWT Authentication

If you’re using JWT authentication, ensure that user roles are included when signing the JWT:

```
const payload = { username: user.username, sub: user.id, roles: user.roles };
const token = this.jwtService.sign(payload);
```

When a user logs in, this ensures their roles are available for the `RolesGuard` to check.

> In an real world application you want to setup a `JwtAuthGuard` to decode the `Bearer <TOKEN>` and get the roles then re-attach them to the request before the `RolesGuard` gets the request.

```
import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { RolesGuard } from '../guards/roles.guard';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {}
```

## 6. Storing and Managing Roles in a Database

For a real-world application, user roles should be stored in a database. If you’re using TypeORM, define your User entity like this:

```
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../enums/role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ type: 'enum', enum: Role, array: true, default: [Role.User] })
  roles: Role[];
}
```

Then, fetch the user and roles from the database inside your authentication logic.

> Reading from the database is always an extra network trip and will add a couple of milli-seconds to each request.

---

# Conclusion

By implementing RBAC in NestJS, we can ensure that only authorized users can access specific routes. This approach is flexible and scalable, allowing for fine-grained access control.

## Next Steps

- Extend the system with permissions-based access control (PBAC) for more granular permissions.

With this foundation, your NestJS app will have a solid and secure role-based access control system! 🚀
