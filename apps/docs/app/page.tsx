import {
  BlueskyPostEmbed,
  config as blueskyEmbedConfig,
  updateConfig as updateBlueskyEmbedConfig,
} from "@hamstack/bluesky-embed-rsc";
import {
  Code,
  type CodeProps,
  updateConfig as updateKanapaConfig,
} from "kanapa";
import { StarIcon, Terminal } from "lucide-react";
import {
  H1,
  H2,
  InlineCode,
  Link,
  P,
  UnorderedList,
} from "~/components/typography";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

updateBlueskyEmbedConfig({
  ...blueskyEmbedConfig,
  rootClassName: "my-2 mx-auto",
});

updateKanapaConfig({
  themes: {
    dark: "github-dark",
    light: "github-light",
  },
  selectors: {
    light: "html.light",
    dark: "html.dark",
  },
});

function CodeBlock(props: CodeProps) {
  return (
    <Code
      {...props}
      className="[&>pre]:p-4 [&>pre]:rounded-md [&>pre]:overflow-auto my-2"
    />
  );
}

let sectionClasses =
  "py-10 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14 max-w-[75ch] mx-auto min-h-[40vh] flex flex-col justify-center";

export default async function Home() {
  return (
    <main>
      <header className={sectionClasses}>
        <H1>Bluesky Embed RSC</H1>
        <P>Embed Bluesky posts in your app, with graceful fallbacks!</P>

        {/* @ts-expect-error: RSC */}
        <BlueskyPostEmbed src="https://bsky.app/profile/matthamlin.me/post/3lbsqkauk5s2d">
          <blockquote
            className="bluesky-embed"
            data-bluesky-uri="at://did:plc:j73k5g4hr6qpkgwoalm3cfkh/app.bsky.feed.post/3lbsqkauk5s2d"
            data-bluesky-cid="bafyreie6hfknj36ufbflaqtrsxwyr7sz2a7a42i7fi4tpqgydl5ewg76bq"
          >
            <p lang="en">
              New package alert 🚨 `@hamstack/bluesky-embed-rsc` A React Server
              Component for embedding @bsky.app posts!
              bluesky-embed-rsc.vercel.app
              <br />
              <br />
              <a href="https://bsky.app/profile/did:plc:j73k5g4hr6qpkgwoalm3cfkh/post/3lbsqkauk5s2d?ref_src=embed">
                [image or embed]
              </a>
            </p>
            &mdash; Matt Hamlin (
            <a href="https://bsky.app/profile/did:plc:j73k5g4hr6qpkgwoalm3cfkh?ref_src=embed">
              @matthamlin.me
            </a>
            ){" "}
            <a href="https://bsky.app/profile/did:plc:j73k5g4hr6qpkgwoalm3cfkh/post/3lbsqkauk5s2d?ref_src=embed">
              November 25, 2024 at 7:06 PM
            </a>
          </blockquote>
        </BlueskyPostEmbed>

        <div className="pt-10 flex row justify-evenly items-center">
          <Button asChild>
            <a href="#installation">Get Started</a>
          </Button>
          <Button variant="outline" asChild>
            <a href="https://github.com/hamlim/bluesky-embed-rsc">
              <StarIcon className="mr-2 inline-flex" /> Star on GitHub
            </a>
          </Button>
        </div>
      </header>
      <section id="installation" className={sectionClasses}>
        <H2>Installation</H2>
        <P>
          Install <InlineCode>@hamstack/bluesky-embed-rsc</InlineCode> via your
          favorite package manager:
        </P>
        <div className="mt-6">
          <Tabs defaultValue="bun">
            <TabsList>
              <TabsTrigger value="bun">Bun</TabsTrigger>
              <TabsTrigger value="yarn">Yarn</TabsTrigger>
              <TabsTrigger value="pnpm">pnpm</TabsTrigger>
              <TabsTrigger value="npm">npm</TabsTrigger>
            </TabsList>
            <div className="my-10">
              <TabsContent value="bun">
                <CodeBlock lang="shell">{`
# Install the library and it's peer dependencies
bun install @hamstack/bluesky-embed-rsc \\
  @atcute/bluesky \\
  @atcute/lexicons \\
  @atcute/client \\
  @atcute/bluesky-richtext-segmenter \\
  hls.js \\
  @radix-ui/react-aspect-ratio \\
  clsx \\
  tailwind-merge \\
  lucide-react
                `}</CodeBlock>
              </TabsContent>
              <TabsContent value="yarn">
                <CodeBlock lang="shell">{`
# Install the library and it's peer dependencies
yarn add @hamstack/bluesky-embed-rsc \\
  @atcute/bluesky \\
  @atcute/lexicons \\
  @atcute/client \\
  @atcute/bluesky-richtext-segmenter \\
  hls.js \\
  @radix-ui/react-aspect-ratio \\
  clsx \\
  tailwind-merge \\
  lucide-react
                `}</CodeBlock>
              </TabsContent>
              <TabsContent value="pnpm">
                <CodeBlock lang="shell">{`
# Install the library and it's peer dependencies
pnpm install @hamstack/bluesky-embed-rsc \\
  @atcute/bluesky \\
  @atcute/lexicons \\
  @atcute/client \\
  @atcute/bluesky-richtext-segmenter \\
  hls.js \\
  @radix-ui/react-aspect-ratio \\
  clsx \\
  tailwind-merge \\
  lucide-react
                `}</CodeBlock>
              </TabsContent>
              <TabsContent value="npm">
                <CodeBlock lang="shell">{`
# Install the library and it's peer dependencies
npm install @hamstack/bluesky-embed-rsc \\
  @atcute/bluesky \\
  @atcute/lexicons \\
  @atcute/client \\
  @atcute/bluesky-richtext-segmenter \\
  hls.js \\
  @radix-ui/react-aspect-ratio \\
  clsx \\
  tailwind-merge \\
  lucide-react
                `}</CodeBlock>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </section>
      <section id="usage" className={sectionClasses}>
        <H2>Usage:</H2>
        <P>Here&apos;s an example of how to set this up with Next.js:</P>
        <CodeBlock lang="tsx">{`import { BlueskyPostEmbed } from "@hamstack/bluesky-embed-rsc";

export default function Home() {
  return (
    <BlueskyPostEmbed src="https://bsky.app/profile/matthamlin.me/post/3layiwns2kk2h">
      This post could not be loaded!
    </BlueskyPostEmbed>
  );
}`}</CodeBlock>
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You&apos;ll need to also configure <InlineCode>tailwind</InlineCode>{" "}
            to look at <InlineCode>node_modules</InlineCode> for the default
            styles to be applied.
            <P>For Tailwind v3.x:</P>
            <CodeBlock lang="ts">{`
// In your tailwind config file:

content: [
  "./node_modules/@hamstack/bluesky-embed-rsc/dist/**/*.js",
]`}</CodeBlock>
            <P>For Tailwind v4.x:</P>
            <CodeBlock lang="css">{`
/* In your styles.css file: */

@source "./node_modules/@hamstack/bluesky-embed-rsc/dist/**/*.js";
`}</CodeBlock>
          </AlertDescription>
        </Alert>
        <P>
          The <InlineCode>BlueskyPostEmbed</InlineCode> component will render
          the post, or fallback content if the post can&apos;t be loaded.
        </P>
        <P>Here&apos;s what the output looks like: </P>
        {/* @ts-expect-error: RSC */}
        <BlueskyPostEmbed src="https://bsky.app/profile/matthamlin.me/post/3layiwns2kk2h">
          <blockquote
            className="bluesky-embed"
            data-bluesky-uri="at://did:plc:j73k5g4hr6qpkgwoalm3cfkh/app.bsky.feed.post/3layiwns2kk2h"
            data-bluesky-cid="bafyreicwe6ad5detejagfiho46jcdmaw7hgw5y4amylcihlw36bbn7gk7i"
          >
            <p lang="en">
              Beer and a fish finger sandwich with chips 🙌<br />
              <br />
              <a href="https://bsky.app/profile/did:plc:j73k5g4hr6qpkgwoalm3cfkh/post/3layiwns2kk2h?ref_src=embed">
                [image or embed]
              </a>
            </p>
            &mdash; Matt Hamlin (
            <a href="https://bsky.app/profile/did:plc:j73k5g4hr6qpkgwoalm3cfkh?ref_src=embed">
              @matthamlin.me
            </a>
            ){" "}
            <a href="https://bsky.app/profile/did:plc:j73k5g4hr6qpkgwoalm3cfkh/post/3layiwns2kk2h?ref_src=embed">
              November 15, 2024 at 8:41 AM
            </a>
          </blockquote>
        </BlueskyPostEmbed>
      </section>
      <section id="usage" className={sectionClasses}>
        <H2>Exports:</H2>
        <P>
          <InlineCode>@hamstack/bluesky-embed-rsc</InlineCode> provides the
          following exports:
        </P>
        <UnorderedList>
          <li>
            <P>
              <InlineCode>BlueskyPostEmbed</InlineCode> - A server component
              that renders a Bluesky post embed
            </P>
            <P>Props:</P>
            <UnorderedList>
              <li>
                <InlineCode>src: string</InlineCode> - The post URL to embed
                (this should follow the format of" "
                <InlineCode>{`https://bsky.app/profile/{HANDLE}/post/{POST_ID}`}</InlineCode>
                )
              </li>
              <li>
                <InlineCode>children?: ReactNode</InlineCode> - The optional
                fallback content if the post can&apos;t be loaded (this can be
                something custom - or it can be the embed blockquote from
                Bluesky)
              </li>
            </UnorderedList>
          </li>
        </UnorderedList>
        <P>
          Additionally, a <InlineCode>updateConfig</InlineCode> function is
          exported to update the configuration at runtime. This can be useful if
          you want to customize the various icons or components used inside the
          embed!
        </P>
        <CodeBlock lang="ts">{`import { updateConfig } from "@hamstack/bluesky-embed-rsc";
import {
  HeartIcon,
  LinkIcon,
  MessageCircleIcon,
  QuoteIcon,
  RepeatIcon,
} from "your-favorite-icon-library";
import Image from "your-favorite-image-library";

// customize the Image component, or the icons used in the embed
updateConfig({
  components: {
    Image: Image,
    // can also pass:
    // Video - used for rendering videos
    // External - used for rendering website previews/embeds
  },
  icons: {
    Heart: HeartIcon,
    Link: LinkIcon,
    MessageCircle: MessageCircleIcon,
    Quote: QuoteIcon,
    Repeat: RepeatIcon,
  },
  // can also pass in \`linkClassName\` to customize the link styles
  rootClassName: "my-2 mx-auto",
});`}</CodeBlock>
        <P>The default config is:</P>
        <CodeBlock lang="ts">{`export let config: Config = {
  components: {
    // Custom Image, Video, and External components
    Image,
    Video,
    External,
  },
  icons: {
    // Icons from lucide-react
    Heart,
    Link: LinkIcon,
    MessageCircle,
    Quote,
    Repeat,
  },
  linkClassName: "",
  rootClassName: "",
};`}</CodeBlock>
      </section>
      <section id="features" className={sectionClasses}>
        <H2>Features:</H2>
        <P>
          The <InlineCode>BlueskyPostEmbed</InlineCode> component is a server
          component, so it can be used in any React Server Component compatible
          framework (e.g. Waku, Parcel, Redwood SDK, Next etc.).
        </P>
        <P>
          The component will render the post, or fallback content (see the{" "}
          <InlineCode>children</InlineCode> prop) if the post can&apos;t be
          loaded.
        </P>
        <P>
          Additionally, the component will "expand" (e.g. render inline
          previews) post embeds, currently limited to images, videos, and
          external links!
        </P>
        <P>
          Here&apos;s an example post that shows an embedded preview to another
          website:
        </P>
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
      </section>
      <footer className={sectionClasses}>
        <P>
          The source code for the library is available on{" "}
          <Link href="https://github.com/hamlim/bluesky-embed-rsc">GitHub</Link>
          . If you run into any bugs, please report them via{" "}
          <Link href="https://github.com/hamlim/bluesky-embed-rsc/issues/new">
            issues
          </Link>
          .
        </P>
        <P>
          If you&apos;d like to discuss changes to the project, feel free to
          start a{" "}
          <Link href="https://github.com/hamlim/bluesky-embed-rsc/discussions/new/choose">
            discussion
          </Link>
          !
        </P>
      </footer>
    </main>
  );
}
