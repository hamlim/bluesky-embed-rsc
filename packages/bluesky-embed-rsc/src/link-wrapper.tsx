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
    // @ts-expect-error: DOM
    window.open(href, "_blank");
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLAnchorElement>): void {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
      // @ts-expect-error: DOM
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
