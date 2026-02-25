import { useState } from "react";
// @ts-ignore
import IconLink from "../assets/icons/link.svg?react";
// @ts-ignore
import IconCheck from "../assets/icons/check.svg?react";
// @ts-ignore
import IconX from "../assets/icons/x.svg?react";

export default function CopyButton() {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    setTimeout(() => setStatus("idle"), 2000);
  };

  const title =
    status === "copied" ? "已复制" : status === "failed" ? "复制失败" : "复制链接";

  return (
    <button
      onClick={handleCopy}
      aria-label="复制链接"
      title={title}
      className="flex"
    >
      <IconCheck
        className={`${status === "copied" ? "size-6 opacity-100" : "size-0 opacity-0"} animation stroke-foreground stroke-2`}
      />
      <IconX
        className={`${status === "failed" ? "size-6 opacity-100" : "size-0 opacity-0"} animation stroke-foreground stroke-2`}
      />
      <IconLink
        className={`${status === "idle" ? "size-6 opacity-100" : "size-0 opacity-0"} animation stroke-foreground stroke-1 hover:stroke-2`}
      />
    </button>
  );
}
