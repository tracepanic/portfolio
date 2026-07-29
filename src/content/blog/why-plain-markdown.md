---
title: Why plain Markdown beats a CMS for a personal site
date: 2026-07-26
description: Files in git, rendered at build time. No database, no dashboard.
tags: [writing, tooling]
---

For a personal site, a database-backed CMS is usually more machinery than the
job needs. Here's the setup I keep coming back to.

## Posts are just files

Each post is a Markdown file tracked in git. That means:

- **Version history for free**: every edit is a commit.
- **No backend**: the whole site stays a static bundle.
- **Portable**: the content isn't locked inside a product.

## Rendering

At build time the files are read as raw strings, the frontmatter is parsed, and
the body is turned into HTML. Nothing runs at request time.

```ts
const files = import.meta.glob("../content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});
```

## The trade-off

You give up a fancy editing UI. In exchange you get something that will still
build in five years with no service to keep alive. For a site that changes a
few times a month, that's the right trade.
