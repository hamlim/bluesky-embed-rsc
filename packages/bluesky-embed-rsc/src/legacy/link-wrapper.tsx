"use client";
import type { ReactNode } from "react";

export function LinkWrapper({
  children,
  href,
  element: Tag = "article",
  ...props
}: {
  children: ReactNode;
  href: string;
  element: React.ElementType;
  className?: string;
}): ReactNode {
  function handleClick(event: React.MouseEvent<HTMLAnchorElement>): void {
    event.preventDefault();
    event.stopPropagation();
    window.open(href, "_blank");
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLAnchorElement>): void {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
      window.open(href, "_blank");
    }
  }

  return (
    <Tag
      {...props}
      // biome-ignore lint/a11y/useSemanticElements: This is a hidden anchor that is used to link to the post
      role="link"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {children}
    </Tag>
  );
}

export function EmbeddedAnchor({
  href,
  children,
  ...props
}: {
  href?: string;
  children: ReactNode;
  className?: string;
}): ReactNode {
  function handleClick(event: React.MouseEvent<HTMLAnchorElement>): void {
    if (!href) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    window.open(href, "_blank");
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLAnchorElement>): void {
    if (!href) {
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
      window.open(href, "_blank");
    }
  }

  return (
    <a
      {...props}
      href={href}
      onClickCapture={handleClick}
      onKeyDownCapture={handleKeyDown}
    >
      {children}
    </a>
  );
}
