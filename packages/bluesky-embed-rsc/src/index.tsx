import {
  AppBskyEmbedExternal,
  AppBskyEmbedImages,
  AppBskyEmbedVideo,
  type AppBskyFeedPost,
  AppBskyRichtextFacet,
} from "@atcute/bluesky";
import { segmentize } from "@atcute/bluesky-richtext-segmenter";
import { Client, isXRPCErrorPayload, simpleFetchHandler } from "@atcute/client";
import { type ActorIdentifier, is } from "@atcute/lexicons";
import { Heart, LinkIcon, MessageCircle, Quote, Repeat } from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import { Fragment } from "react";
import { AspectRatio } from "./aspect-ratio.js";
import { cn } from "./cn.js";
import { EmbeddedAnchor, LinkWrapper } from "./link-wrapper.js";
import { Video } from "./video.js";

// side effect import to register bluesky lexicons
import "@atcute/bluesky";

let handler = simpleFetchHandler({ service: "https://public.api.bsky.app" });

let rpc = new Client({ handler });

function extractHandleAndPost(
  url: string,
): { handle: string; post: string } | null {
  const pattern = /\/profile\/([^/]+)\/post\/([^/]+)/;
  const match = url.match(pattern);

  if (match) {
    return {
      handle: match[1] ?? "",
      post: match[2] ?? "",
    };
  }
  return null;
}

function formatDistanceToNow(dateString: string): string {
  let date = new Date(dateString);
  let now = new Date();
  let seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    return `${interval} year${interval === 1 ? "" : "s"}`;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return `${interval} month${interval === 1 ? "" : "s"}`;
  }
  interval = Math.floor(seconds / 604800);
  if (interval >= 1) {
    return `${interval} week${interval === 1 ? "" : "s"}`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return `${interval} day${interval === 1 ? "" : "s"}`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return `${interval} hour${interval === 1 ? "" : "s"}`;
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return `${interval} minute${interval === 1 ? "" : "s"}`;
  }
  if (seconds <= 1) {
    return `${seconds} second`;
  }
  return `${Math.floor(seconds)} seconds`;
}

function formatNewLines(text: string): ReactNode {
  if (text.includes("\n")) {
    return text.split("\n").map((line, index) => (
      <Fragment key={index.toString()}>
        {line}
        {index < text.split("\n").length - 1 && <br />}
      </Fragment>
    ));
  }
  return text;
}

export type ImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  displaySize?: "exact" | "aspect-ratio";
};

export type VideoProps = {
  playlist: string;
  width: number;
  height: number;
  className?: string;
};

export type ExternalProps = {
  src: string;
  title: string;
  description: string;
  width: number;
  height: number;
  className?: string;
  thumb?: string;
};

export type IconProps = {
  size: number;
  className?: string;
};

export type Config = {
  components: {
    Image: ComponentType<ImageProps>;
    Video: ComponentType<VideoProps>;
    External: ComponentType<ExternalProps>;
  };
  icons: {
    Heart: ComponentType<IconProps>;
    Link: ComponentType<IconProps>;
    MessageCircle: ComponentType<IconProps>;
    Quote: ComponentType<IconProps>;
    Repeat: ComponentType<IconProps>;
  };
  rootClassName?: string;
  linkClassName?: string;
};

function Image({
  src,
  alt,
  width,
  height,
  displaySize = "aspect-ratio",
  ...props
}: ImageProps): ReactNode {
  if (displaySize === "exact") {
    return (
      <img
        src={src}
        height={height}
        width={width}
        loading="lazy"
        {...props}
        alt={alt}
      />
    );
  }
  return (
    <AspectRatio ratio={width / height} className="flex justify-center">
      <img
        src={src}
        height={height}
        width={width}
        loading="lazy"
        {...props}
        alt={alt}
      />
    </AspectRatio>
  );
}

function External({
  src,
  title,
  description,
  className,
  thumb,
}: ExternalProps): ReactNode {
  return (
    <EmbeddedAnchor
      href={src}
      className={cn(
        className,
        "mt-2 border rounded-lg overflow-hidden cursor-pointer block",
      )}
    >
      {thumb && (
        <div className="relative overflow-hidden h-60 bg-gray-100 dark:bg-gray-900">
          <img
            src={thumb}
            alt={title || "Embedded content"}
            className="object-cover"
          />
        </div>
      )}
      <div className="p-3">
        <h3 className="font-semibold text-sm line-clamp-2">{title}</h3>
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
            {description}
          </p>
        )}
        <div className="flex items-center text-xs text-gray-500 mt-2">
          <LinkIcon size={12} className="mr-1" />
          <span className="truncate">{src}</span>
        </div>
      </div>
    </EmbeddedAnchor>
  );
}

export let config: Config = {
  components: {
    Image,
    Video,
    External,
  },
  icons: {
    Heart,
    Link: LinkIcon,
    MessageCircle,
    Quote,
    Repeat,
  },
  linkClassName: "",
  rootClassName: "",
};

export function updateConfig(newConfig: Partial<Config>): void {
  let existingConfig = config;
  config = {
    ...existingConfig,
    components: {
      ...existingConfig.components,
      ...newConfig.components,
    },
    icons: {
      ...existingConfig.icons,
      ...newConfig.icons,
    },
    linkClassName: newConfig.linkClassName ?? existingConfig.linkClassName,
    rootClassName: newConfig.rootClassName ?? existingConfig.rootClassName,
  } as Config;
}

export async function BlueskyPostEmbed({
  src,
  children,
}: {
  src: string;
  children: ReactNode;
}): Promise<ReactNode> {
  let handleAndPostKey = extractHandleAndPost(src);

  if (!handleAndPostKey) {
    return children;
  }

  let { handle, post: rkey } = handleAndPostKey;

  let profileResult = await rpc.get("app.bsky.actor.getProfile", {
    params: {
      actor: handle as ActorIdentifier,
    },
  });

  if (!profileResult.data) {
    return children;
  }

  if (isXRPCErrorPayload(profileResult.data)) {
    return children;
  }

  let profile = profileResult.data;

  let postsResult = await rpc.get("app.bsky.feed.getPosts", {
    params: {
      uris: [`at://${profileResult.data.did}/app.bsky.feed.post/${rkey}`],
    },
  });

  if (isXRPCErrorPayload(postsResult.data)) {
    return children;
  }

  if (!postsResult.data.posts[0]) {
    return children;
  }

  let post = postsResult.data.posts[0];
  let postRecord = post.record as AppBskyFeedPost.Main;

  let segments = segmentize(postRecord.text, postRecord.facets);

  let content = [];

  let idx = -1;
  for (let segment of segments) {
    idx++;
    if (segment.features) {
      if (is(AppBskyRichtextFacet.mentionSchema, segment.features[0])) {
        if (segment.features[0].did) {
          let mentionedProfile = await rpc.get("app.bsky.actor.getProfile", {
            params: {
              actor: segment.features[0].did as ActorIdentifier,
            },
          });

          if (isXRPCErrorPayload(mentionedProfile.data)) {
            content.push(
              <span key={idx + segment.text}>
                {formatNewLines(segment.text)}
              </span>,
            );
          } else if (!mentionedProfile.data) {
            content.push(
              <span key={idx + segment.text}>
                {formatNewLines(segment.text)}
              </span>,
            );
          } else if (mentionedProfile.data) {
            content.push(
              <EmbeddedAnchor
                className={config.linkClassName ?? ""}
                href={`https://bsky.app/profile/${mentionedProfile.data.handle}`}
                key={idx + segment.text}
              >
                {formatNewLines(segment.text)}
              </EmbeddedAnchor>,
            );
          } else {
            content.push(
              <span key={idx + segment.text}>
                {formatNewLines(segment.text)}
              </span>,
            );
          }
        } else {
          content.push(
            <span key={idx + segment.text}>
              {formatNewLines(segment.text)}
            </span>,
          );
        }
      } else if (is(AppBskyRichtextFacet.linkSchema, segment.features[0])) {
        // render link
        content.push(
          <EmbeddedAnchor
            className={config.linkClassName ?? ""}
            href={segment.features[0].uri}
            key={idx + segment.text}
          >
            {formatNewLines(segment.text)}
          </EmbeddedAnchor>,
        );
      } else if (is(AppBskyRichtextFacet.tagSchema, segment.features[0])) {
        // render tag
        content.push(
          <EmbeddedAnchor
            className={config.linkClassName ?? ""}
            href={`https://bsky.app/hashtag/${segment.features[0].tag}`}
            key={idx + segment.text}
          >
            {formatNewLines(segment.text)}
          </EmbeddedAnchor>,
        );
      } else {
        // fallback to plain old text for unrecognized content
        content.push(
          <span key={idx + segment.text}>{formatNewLines(segment.text)}</span>,
        );
      }
    } else {
      // fallback to plain old text for unrecognized content
      content.push(
        <span key={idx + segment.text}>{formatNewLines(segment.text)}</span>,
      );
    }
  }

  let embeds = [];
  if (post.embed) {
    if (is(AppBskyEmbedImages.viewSchema, post.embed)) {
      let images = post.embed.images;
      let wrapperClasses = "grid-cols-2";
      let imageProps: { width: number; height: number; className?: string } = {
        width: 300,
        height: 300,
      };
      if (images.length === 1 && images[0]) {
        wrapperClasses = "grid-cols-1";
        imageProps = {
          width: images[0].aspectRatio?.width ?? 16,
          height: images[0].aspectRatio?.height ?? 9,
        };
      }
      embeds.push(
        <div
          key={post.embed.images[0].thumb}
          className={cn(`relative mt-2 grid gap-2`, wrapperClasses)}
        >
          {post.embed.images.map((image) => (
            <config.components.Image
              key={image.thumb}
              src={image.thumb}
              alt={image.alt || ""}
              {...imageProps}
              className={cn(imageProps.className, "rounded-lg")}
            />
          ))}
        </div>,
      );
    } else if (is(AppBskyEmbedVideo.viewSchema, post.embed)) {
      let video = post.embed;
      embeds.push(
        <config.components.Video
          key={video.playlist}
          playlist={video.playlist}
          width={video.aspectRatio?.width ?? 16}
          height={video.aspectRatio?.height ?? 9}
        />,
      );
    } else if (is(AppBskyEmbedExternal.viewSchema, post.embed)) {
      let external = post.embed.external;
      embeds.push(
        <config.components.External
          key={external.uri}
          src={external.uri}
          description={external.description}
          title={external.title}
          thumb={external.thumb as string}
          width={16}
          height={9}
        />,
      );
    }
  }

  return (
    <LinkWrapper
      element="article"
      href={src}
      className={cn(
        config.rootClassName,
        "border rounded-lg p-4 max-w-xl md:min-w-xl mx-auto bg-gray-50 hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 transition-colors cursor-pointer",
      )}
    >
      <header className="flex items-center mb-2">
        <config.components.Image
          src={profile.avatar ?? ""}
          alt={profile.displayName || profile.handle}
          width={48}
          height={48}
          className="rounded-full mr-2 h-[48px] w-[48px]"
          displaySize="exact"
        />
        <div>
          <p className="font-bold text-gray-900 dark:text-gray-100">
            {profile.displayName || profile.handle}
          </p>
          <p className="text-gray-500 dark:text-gray-400">@{profile.handle}</p>
        </div>
      </header>
      <div className="mb-2 text-gray-800 dark:text-gray-200">{content}</div>
      {embeds}
      <footer className="mt-2">
        <div className="flex justify-between items-center text-gray-500 dark:text-gray-400 text-sm mb-2">
          <span suppressHydrationWarning>
            {formatDistanceToNow(postRecord.createdAt)} ago
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
