import {
  BlueskyPostEmbed,
  config as blueskyEmbedConfig,
  updateConfig as updateBlueskyEmbedConfig,
} from "@hamstack/bluesky-embed-rsc";

updateBlueskyEmbedConfig({
  ...blueskyEmbedConfig,
  rootClassName: "my-2 mx-auto",
});

export default function DemoPage() {
  return (
    <main>
      <details id="#5">
        <summary>Line Breaks</summary>
        {/* @ts-expect-error: RSC */}
        <BlueskyPostEmbed src="https://bsky.app/profile/robertl.in/post/3l7wpu4rrha2q">
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
        </BlueskyPostEmbed>
      </details>
      <details id="external-embed">
        <summary>External Embed</summary>
        {/* @ts-expect-error: RSC */}
        <BlueskyPostEmbed src="https://bsky.app/profile/matthamlin.me/post/3lbsa7kpbf227">
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
        </BlueskyPostEmbed>
      </details>
      <details id="#7">
        <summary>Link Truncation</summary>
        {/* @ts-expect-error - RSC */}
        <BlueskyPostEmbed src="https://bsky.app/profile/ped.ro/post/3laozswp32s22">
          <blockquote
            className="bluesky-embed"
            data-bluesky-uri="at://did:plc:iajrasi3btaj5j4fidztqmao/app.bsky.feed.post/3laozswp32s22"
            data-bluesky-cid="bafyreidprdjm4rx4iobfcqx572pckpsxejegkfres3lbmtnsbcrpwg2fw4"
          >
            <p lang="en">
              bluesky extension for @raycast.com
              \n\nwww.raycast.com/dharamkapila...
              <br />
              <br />
              <a href="https://bsky.app/profile/did:plc:iajrasi3btaj5j4fidztqmao/post/3laozswp32s22?ref_src=embed">
                [image or embed]
              </a>
            </p>
            &mdash; Pedro Duarte (
            <a href="https://bsky.app/profile/did:plc:iajrasi3btaj5j4fidztqmao?ref_src=embed">
              @ped.ro
            </a>
            ){" "}
            <a href="https://bsky.app/profile/did:plc:iajrasi3btaj5j4fidztqmao/post/3laozswp32s22?ref_src=embed">
              November 11, 2024 at 2:17 PM
            </a>
          </blockquote>
        </BlueskyPostEmbed>
      </details>
      <details id="9">
        <summary>Single Image Embed Overflow</summary>
        {/* @ts-expect-error: RSC */}
        <BlueskyPostEmbed src="https://bsky.app/profile/ped.ro/post/3laozswp32s22">
          <blockquote
            className="bluesky-embed"
            data-bluesky-uri="at://did:plc:iajrasi3btaj5j4fidztqmao/app.bsky.feed.post/3laozswp32s22"
            data-bluesky-cid="bafyreidprdjm4rx4iobfcqx572pckpsxejegkfres3lbmtnsbcrpwg2fw4"
          >
            <p lang="en">
              bluesky extension for @raycast.com
              \n\nwww.raycast.com/dharamkapila...
              <br />
              <br />
              <a href="https://bsky.app/profile/did:plc:iajrasi3btaj5j4fidztqmao/post/3laozswp32s22?ref_src=embed">
                [image or embed]
              </a>
            </p>
            &mdash; Pedro Duarte (
            <a href="https://bsky.app/profile/did:plc:iajrasi3btaj5j4fidztqmao?ref_src=embed">
              @ped.ro
            </a>
            ){" "}
            <a href="https://bsky.app/profile/did:plc:iajrasi3btaj5j4fidztqmao/post/3laozswp32s22?ref_src=embed">
              November 11, 2024 at 2:17 PM
            </a>
          </blockquote>
        </BlueskyPostEmbed>
      </details>
    </main>
  );
}
