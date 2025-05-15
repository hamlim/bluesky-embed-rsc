### Unreleased:

### [0.2.0] - May 15th, 2025

- **Breaking Changes**:
  - `BlueskyPost` is now exported as `BlueskyPostEmbed`
  - New peer dependencies:
    - `hls.js`
    - `@radix-ui/react-aspect-ratio`
    - `clsx`
    - `tailwind-merge`
    - `@atcute/bluesky`
    - `@atcute/lexicons`
    - `@atcute/client`
    - `@atcute/bluesky-richtext-segmenter`

This is effectively a ground up re-write of the library, it's no longer tightly coupled to `next` (it uses a custom `Image` component instead of `next/image`), additionally it's no longer directly reliant upon `@atproto/api` or `date-fns`.

The previous version of the library is still temporarily supported via the `/legacy` path, if you don't want to move to the new implementation yet then you can update your code like so:

```diff
+ import {BlueskyPostEmbed as BlueskyPost} from '@hamstack/bluesky-embed-rsc/legacy';
- import {BlueskyPost} from '@hamstack/bluesky-embed-rsc';
```

### [0.1.1] - November 26th, 2024

- Fix: Fix rendering of truncated embed links

### [0.1.0] - November 26th, 2024

- Fix: Fix missing line breaks within content
- Feat: Add support for hashtag facets
- Feat: Add support for caching
- Fix: Rendering of images if only one present
- Fix: Click handling for embedded links
- Fix: Rendering of link facet if truncated

### [0.0.1] - November 25th, 2024

- Initial library release!
