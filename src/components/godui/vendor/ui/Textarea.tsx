// Adapted from Lucas Bassetti's GodUI (MIT); upstream: packages/components/src/ui/textarea.tsx
// Kept isolated from the builder until its inspector schema and Merge slots are registered.
import type * as React from "react";
import { cn } from "@/lib/utils";

export type GodUITextareaProps = React.ComponentProps<"textarea">;

export function GodUITextarea({ className, ...props }: GodUITextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      data-merge-layer="content"
      className={cn(
        "flex field-sizing-content min-h-16 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:ring-destructive/40",
        className,
      )}
      {...props}
    />
  );
}
