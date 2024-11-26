import { Agent, RichText } from "@atproto/api";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { Heart, Link, MessageCircle, Quote, Repeat } from "lucide-react";
import NextImage from "next/image";
import type { ComponentType, ReactNode } from "react";
import { LinkWrapper } from "./link-wrapper";

export type ImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fill?: boolean;
};

export type IconProps = {
  size: number;
  className?: string;
};

export type Config = {
  components: {
    Image: ComponentType<ImageProps>;
  };
  icons: {
    Heart: ComponentType<IconProps>;
    Link: ComponentType<IconProps>;
    MessageCircle: ComponentType<IconProps>;
    Quote: ComponentType<IconProps>;
    Repeat: ComponentType<IconProps>;
  };
  rootClassName?: string;
};

export let config: Config = {
  components: {
    Image: NextImage,
  },
  icons: {
    Heart,
    Link,
    MessageCircle,
    Quote,
    Repeat,
  },
  rootClassName: "",
};

export function updateConfig(cfg: Partial<Config>): void {
  config = { ...config, ...cfg };
}

function cn(...inputs: Array<string | undefined | boolean>): string {
  return inputs.filter(Boolean).join(" ");
}

let agent = new Agent("https://public.api.bsky.app");

function extractHandleAndPost(
  url: string,
): { handle: string; post: string } | null {
  const pattern = /\/profile\/([^/]+)\/post\/([^/]+)/;
  const match = url.match(pattern);

  if (match) {
    return {
      handle: match[1],
      post: match[2],
    };
  }
  return null;
}

// @NOTE: really only typing the things we care about
type BlueskyProfile = {
  did: string;
  handle: string;
  displayName: string;
  avatar: string;
};

async function resolveDid(handle: string): Promise<BlueskyProfile> {
  let profileEndpoint = new URL(
    "https://public.api.bsky.app/xrpc/app.bsky.actor.getProfile",
  );
  profileEndpoint.searchParams.set("actor", handle);
  let res = await fetch(profileEndpoint as URL);

  let profile = (await res.json()) as BlueskyProfile;

  return profile;
}

// @NOTE: really only typing the things we care about
type BlueskyPost = {
  uri: string;
  record: {
    text: string;
    createdAt: string;
  };
  // @TODO: Are there other embed types?
  embed?:
    | {
        $type: "app.bsky.embed.images#view";
        images: Array<{
          thumb: string;
          alt: string;
        }>;
      }
    | {
        $type: "app.bsky.embed.external#view";
        external: {
          uri: string;
          title: string;
          description: string;
          thumb: string;
        };
      };
  replyCount: number;
  likeCount: number;
  repostCount: number;
  quoteCount: number;
};

async function getProfileAndPost(
  src: string,
): Promise<{ post: BlueskyPost; profile: BlueskyProfile }> {
  let parsed = extractHandleAndPost(src);
  if (!parsed) {
    throw new Error("Invalid URL format");
  }
  let { handle, post: rkey } = parsed;

  let profile = await resolveDid(handle);

  let getPostsEndpoint = new URL(
    `https://public.api.bsky.app/xrpc/app.bsky.feed.getPosts`,
  );

  let uri = `at://${profile.did}/app.bsky.feed.post/${rkey}`;

  getPostsEndpoint.searchParams.set("uris", uri);

  let res = await fetch(getPostsEndpoint as URL);
  let json = (await res.json()) as { posts: Array<BlueskyPost> };

  return { post: json.posts[0], profile };
}

async function Post(
  props:
    | {
        post: BlueskyPost;
        profile: BlueskyProfile;
        agent: Agent;
        className?: string;
      }
    | {
        children: ReactNode;
        className?: string;
      },
): Promise<ReactNode> {
  if ("post" in props && "profile" in props && "agent" in props) {
    let { post, profile, agent, className } = props;
    let {
      components: { Image },
      icons: { Heart, Link, MessageCircle, Quote, Repeat },
    } = config;
    const richText = new RichText({ text: post.record.text });
    await richText.detectFacets(agent);
    const postUrl = `https://bsky.app/profile/${profile.handle}/post/${post.uri.split("/").pop()}`;
    const createdAt = new Date(post.record.createdAt);

    let content = [];
    let idx = -1;
    for (let segment of richText.segments()) {
      idx++;
      if (segment.isLink()) {
        content.push(
          <a
            key={idx}
            href={segment.link?.uri}
            className="text-blue-500 hover:underline"
          >
            {segment.text}
          </a>,
        );
      } else if (segment.isMention()) {
        content.push(
          <a
            key={idx}
            href={`https://bsky.app/profile/${segment.mention?.did}`}
            className="text-blue-500 hover:underline"
          >
            {segment.text}
          </a>,
        );
      } else {
        content.push(<span key={idx}>{segment.text}</span>);
      }
    }

    let embeds = [];

    if (post.embed?.$type === "app.bsky.embed.external#view") {
      const { external } = post.embed;
      embeds.push(
        <LinkWrapper
          element="div"
          href={external.uri}
          key="external-embed"
          className="mt-2 border rounded-lg overflow-hidden cursor-pointer"
        >
          {external.thumb && (
            <div className="relative h-40 bg-gray-100 dark:bg-gray-900">
              <Image
                src={external.thumb}
                alt={external.title || "Embedded content"}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="p-3">
            <h3 className="font-semibold text-sm line-clamp-2">
              {external.title}
            </h3>
            {external.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                {external.description}
              </p>
            )}
            <div className="flex items-center text-xs text-gray-500 mt-2">
              <Link size={12} className="mr-1" />
              <span className="truncate">{external.uri}</span>
            </div>
          </div>
        </LinkWrapper>,
      );
    } else if (post.embed?.$type === "app.bsky.embed.images#view") {
      embeds.push(
        <div key="embed-images" className="mt-2 grid grid-cols-2 gap-2">
          {post.embed.images.map((image) => (
            <Image
              key={image.thumb}
              src={image.thumb}
              alt={image.alt || ""}
              width={300}
              height={300}
              className="rounded-lg"
            />
          ))}
        </div>,
      );
    }

    return (
      <LinkWrapper
        element="article"
        href={postUrl}
        className={cn(
          "border rounded-lg p-4 max-w-xl hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 transition-colors cursor-pointer",
          className,
          config.rootClassName,
        )}
      >
        <header className="flex items-center mb-2">
          <Image
            src={profile.avatar}
            alt={profile.displayName || profile.handle}
            width={48}
            height={48}
            className="rounded-full mr-2"
          />
          <div>
            <p className="font-bold text-gray-900 dark:text-gray-100">
              {profile.displayName || profile.handle}
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              @{profile.handle}
            </p>
          </div>
        </header>
        <div className="mb-2 text-gray-800 dark:text-gray-200">{content}</div>
        {embeds}
        <footer className="mt-2">
          <div className="flex justify-between items-center text-gray-500 dark:text-gray-400 text-sm mb-2">
            <span suppressHydrationWarning>
              {formatDistanceToNow(createdAt)} ago
            </span>
            <span className="hover:underline">View on bsky.app</span>
          </div>
          <div className="flex justify-between items-center text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <MessageCircle size={18} />
              <span>{post.replyCount}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart size={18} />
              <span>{post.likeCount}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Repeat size={18} />
              <span>{post.repostCount}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Quote size={18} />
              <span>{post.quoteCount}</span>
            </div>
          </div>
        </footer>
      </LinkWrapper>
    );
  }
  let { children, className } = props;
  return (
    <article
      className={cn(
        "border rounded-lg p-4 max-w-xl hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 transition-colors",
        className,
        config.rootClassName,
      )}
    >
      {children || (
        <p className="text-gray-500 dark:text-gray-400">
          Unable to load Bluesky post.
        </p>
      )}
    </article>
  );
}

export async function BlueskyPost({
  src,
  mode = "preview",
  children,
  className,
}: {
  src: string;
  children?: ReactNode;
  mode?: "debug" | "preview";
  className?: string;
}): Promise<ReactNode> {
  try {
    let { post, profile } = await getProfileAndPost(src);
    if (mode === "debug") {
      return <pre>{JSON.stringify({ profile, post }, null, 2)}</pre>;
    }
    return (
      // @ts-expect-error: RSC
      <Post post={post} agent={agent} profile={profile} className={className} />
    );
  } catch (error) {
    console.error("Error fetching Bluesky post:", error);
    // @ts-expect-error: RSC
    return <Post className={className}>{children}</Post>;
  }
}
