/// <reference lib="dom" />
"use client";

import Hls from "hls.js";
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { AspectRatio } from "./aspect-ratio.js";

export function Video({
  playlist,
  width,
  height,
  className,
  ...props
}: {
  playlist: string;
  width: number;
  height: number;
  className?: string;
}): ReactNode {
  let videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (Hls.isSupported()) {
        let hls = new Hls();
        hls.loadSource(playlist);
        hls.attachMedia(videoRef.current);
      } else if (
        videoRef.current.canPlayType("application/vnd.apple.mpegurl")
      ) {
        videoRef.current.src = playlist;
      }
    }
  }, [playlist]);

  function handleClickCapture(event: React.MouseEvent<HTMLVideoElement>) {
    event.stopPropagation();
  }

  return (
    <AspectRatio ratio={width / height} className="flex justify-center">
      <video
        onClickCapture={handleClickCapture}
        controls
        ref={videoRef}
        height={height}
        width={width}
        {...props}
      />
    </AspectRatio>
  );
}
