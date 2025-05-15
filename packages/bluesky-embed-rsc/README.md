# `@hamstack/bluesky-embed-rsc`

Embed Bluesky posts in your app, with graceful fallbacks!

## Getting Started:

```bash
# Install the library and it's peer dependencies
bun install @hamstack/bluesky-embed-rsc \
  @atcute/bluesky \
  @atcute/lexicons \
  @atcute/client \
  @atcute/bluesky-richtext-segmenter \
  hls.js \
  @radix-ui/react-aspect-ratio \
  clsx \
  tailwind-merge \
  lucide-react
```

## Usage:

```tsx
import { BlueskyPostEmbed } from '@hamstack/bluesky-embed-rsc';

<BlueskyPostEmbed src="<link-to-post-here>">
  Optional fallback here!
</BlueskyPostEmbed>
```

See [the docs](https://bluesky-embed-rsc.vercel.app/) for more details!


## Contributing:

### Building:

This library uses [`swc`](https://swc.rs/) and [`TypeScript`](https://www.typescriptlang.org/docs/) to build the source code and generate types.

To build the library, run `bun run build` from the root, or from this workspace!

### Code Quality:

#### Type Checking:

This library uses TypeScript to perform type checks, run `bun run type-check` from the root or from this workspace!

#### Linting

This library uses [BiomeJS](https://biomejs.dev/) for linting, run `bun run lint` from the root or from this workspace!

#### Tests

This library uses Bun for running unit tests, run `bun run test` from the root or from this workspace!

### Publishing:

To publish the library, run `bun run pub` from the workspace root. This will prompt you to login to npm and publish the package.

## Inspiration:

This package is heavily inspired by the following projects:

- [`bluesky-embed`](https://github.com/mary-ext/bluesky-embed)
- [`bsky-react-post`](https://bsky-react-post.rhinobase.io/)

If this package doesn't fit your needs, I'd highly recommend one of the above instead!