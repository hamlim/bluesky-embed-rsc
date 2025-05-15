"use client";

import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";
import type { ReactNode } from "react";

function AspectRatio({
  ...props
}: React.ComponentProps<typeof AspectRatioPrimitive.Root>): ReactNode {
  return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />;
}

export { AspectRatio };
