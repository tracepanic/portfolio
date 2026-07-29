---
title: Hello, and a note on this site
date: 2026-07-20
description: What this site is, and how it's built.
tags: [meta]
---

This is where I'll write things down: short notes, longer pieces, whatever's
worth keeping.

The site is deliberately plain: no framework chrome, no animations fighting for
attention. Just text you can read.

## How it works

Every post is a plain Markdown file in `src/content/blog`. Frontmatter carries
the title, date, and description:

```md
---
title: My Post
date: 2026-07-20
description: A one-line summary.
draft: false
---
```

To publish, drop a `.md` file in that folder. To keep a draft out of
production, add `draft: true`, and it still shows up while running `pnpm dev`.

## What to expect

- notes on things I'm building
- documentation experiments
- the occasional opinion

That's it. Thanks for reading.
