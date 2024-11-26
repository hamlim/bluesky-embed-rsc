import {
  BlueskyPost,
  type ImageProps,
  config as blueskyEmbedConfig,
  updateConfig as updateBlueskyEmbedConfig,
} from "@hamstack/bluesky-embed-rsc";

let fillClasses =
  "absolute h-full w-full left-0 top-0 right-0 bottom-0 color-transparent";

function cn(...classes: Array<string | undefined | null | boolean>): string {
  return classes.filter(Boolean).join(" ");
}

function LocalImage({ fill, ...props }: ImageProps) {
  // biome-ignore lint/a11y/useAltText: <explanation>
  return (
    <img {...props} className={cn(fill && fillClasses, props.className)} />
  );
}

updateBlueskyEmbedConfig({
  ...blueskyEmbedConfig,
  components: {
    Image: LocalImage,
  },
  rootClassName: "my-2 mx-auto",
});

export default function DemoPage() {
  return (
    <main>
      <section id="#5">
        <h2>Line Breaks</h2>
        {/* @ts-expect-error: RSC */}
        <BlueskyPost
          mode="debug"
          src="https://bsky.app/profile/robertlin.bsky.social/post/3l7wpu4rrha2q"
        >
          <blockquote
            className="bluesky-embed"
            data-bluesky-uri="at://did:plc:5wlpm2j3d6can6quf5hotdcc/app.bsky.feed.post/3l7wpu4rrha2q"
            data-bluesky-cid="bafyreiambef2u7akbgxoey3w73vp6hjgpjakfpnrdvcrkcghskn3xmv2t4"
          >
            This is so cool. There are TWO ways to do domain verification with
            #atproto: 1. By DNS OR 2. By uploading your did to
            `https://&lt;YOUR-DOMAIN&gt;/.well-known/atproto-did` It works!
            (Haha, this is why you should always read the docs 😅) TY,
            @lepahc.com &amp; @edavis.dev for teaching me this!! 🙏<br />
            <br />
            <a href="https://bsky.app/profile/did:plc:5wlpm2j3d6can6quf5hotdcc/post/3l7wpu4rrha2q?ref_src=embed">
              [image or embed]
            </a>
            &mdash; Robert Lin (
            <a href="https://bsky.app/profile/did:plc:5wlpm2j3d6can6quf5hotdcc?ref_src=embed">
              @robertlin.bsky.social
            </a>
            ){" "}
            <a href="https://bsky.app/profile/did:plc:5wlpm2j3d6can6quf5hotdcc/post/3l7wpu4rrha2q?ref_src=embed">
              November 1, 2024 at 11:14 PM
            </a>
          </blockquote>
        </BlueskyPost>
        {/* @ts-expect-error: RSC */}
        <BlueskyPost src="https://bsky.app/profile/robertlin.bsky.social/post/3l7wpu4rrha2q">
          <blockquote
            className="bluesky-embed"
            data-bluesky-uri="at://did:plc:5wlpm2j3d6can6quf5hotdcc/app.bsky.feed.post/3l7wpu4rrha2q"
            data-bluesky-cid="bafyreiambef2u7akbgxoey3w73vp6hjgpjakfpnrdvcrkcghskn3xmv2t4"
          >
            This is so cool. There are TWO ways to do domain verification with
            #atproto: 1. By DNS OR 2. By uploading your did to
            `https://&lt;YOUR-DOMAIN&gt;/.well-known/atproto-did` It works!
            (Haha, this is why you should always read the docs 😅) TY,
            @lepahc.com &amp; @edavis.dev for teaching me this!! 🙏<br />
            <br />
            <a href="https://bsky.app/profile/did:plc:5wlpm2j3d6can6quf5hotdcc/post/3l7wpu4rrha2q?ref_src=embed">
              [image or embed]
            </a>
            &mdash; Robert Lin (
            <a href="https://bsky.app/profile/did:plc:5wlpm2j3d6can6quf5hotdcc?ref_src=embed">
              @robertlin.bsky.social
            </a>
            ){" "}
            <a href="https://bsky.app/profile/did:plc:5wlpm2j3d6can6quf5hotdcc/post/3l7wpu4rrha2q?ref_src=embed">
              November 1, 2024 at 11:14 PM
            </a>
          </blockquote>
        </BlueskyPost>
      </section>
      <section id="external-embed">
        <h2>External Embed</h2>
        {/* @ts-expect-error: RSC */}
        <BlueskyPost
          mode="debug"
          src="https://bsky.app/profile/matthamlin.me/post/3lbsa7kpbf227"
        >
          <blockquote
            className="bluesky-embed"
            data-bluesky-uri="at://did:plc:j73k5g4hr6qpkgwoalm3cfkh/app.bsky.feed.post/3lbsa7kpbf227"
            data-bluesky-cid="bafyreif7muzg5ydifwmcaz5dtjyxr4v63svrlzqn5vb624pueqy6gl2st4"
          >
            <p lang="en">
              Finally got around to writing another (short) blog post! Bluesky
              Tips and Tools: matthamlin.me/blog/2024/no...
              <br />
              <br />
              <a href="https://bsky.app/profile/did:plc:j73k5g4hr6qpkgwoalm3cfkh/post/3lbsa7kpbf227?ref_src=embed">
                [image or embed]
              </a>
            </p>
            &mdash; Matt Hamlin (
            <a href="https://bsky.app/profile/did:plc:j73k5g4hr6qpkgwoalm3cfkh?ref_src=embed">
              @matthamlin.me
            </a>
            ){" "}
            <a href="https://bsky.app/profile/did:plc:j73k5g4hr6qpkgwoalm3cfkh/post/3lbsa7kpbf227?ref_src=embed">
              November 25, 2024 at 2:14 PM
            </a>
          </blockquote>
        </BlueskyPost>
        {/* @ts-expect-error: RSC */}
        <BlueskyPost src="https://bsky.app/profile/matthamlin.me/post/3lbsa7kpbf227">
          <blockquote
            className="bluesky-embed"
            data-bluesky-uri="at://did:plc:j73k5g4hr6qpkgwoalm3cfkh/app.bsky.feed.post/3lbsa7kpbf227"
            data-bluesky-cid="bafyreif7muzg5ydifwmcaz5dtjyxr4v63svrlzqn5vb624pueqy6gl2st4"
          >
            <p lang="en">
              Finally got around to writing another (short) blog post! Bluesky
              Tips and Tools: matthamlin.me/blog/2024/no...
              <br />
              <br />
              <a href="https://bsky.app/profile/did:plc:j73k5g4hr6qpkgwoalm3cfkh/post/3lbsa7kpbf227?ref_src=embed">
                [image or embed]
              </a>
            </p>
            &mdash; Matt Hamlin (
            <a href="https://bsky.app/profile/did:plc:j73k5g4hr6qpkgwoalm3cfkh?ref_src=embed">
              @matthamlin.me
            </a>
            ){" "}
            <a href="https://bsky.app/profile/did:plc:j73k5g4hr6qpkgwoalm3cfkh/post/3lbsa7kpbf227?ref_src=embed">
              November 25, 2024 at 2:14 PM
            </a>
          </blockquote>
        </BlueskyPost>
      </section>
    </main>
  );
}
