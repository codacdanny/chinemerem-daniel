"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Custom cursor: a small dot plus a lagging ring. The ring grows and shows a
 * label when hovering elements marked with [data-cursor]. Falls back to the
 * native cursor on touch / coarse pointers and for reduced-motion users.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!fine || reduced) {
      document.body.classList.add("no-custom-cursor");
      return;
    }
    setEnabled(true);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      const target = (e.target as HTMLElement)?.closest<HTMLElement>(
        "[data-cursor], a, button",
      );
      if (target) {
        const l = target.getAttribute("data-cursor");
        setLabel(l ?? "");
        ringRef.current?.setAttribute("data-hover", l ? "label" : "link");
      } else {
        setLabel("");
        ringRef.current?.removeAttribute("data-hover");
      }
    };

    const loop = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    const onDown = () => ringRef.current?.setAttribute("data-down", "true");
    const onUp = () => ringRef.current?.removeAttribute("data-down");

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[70]">
      <div
        ref={dotRef}
        className="fixed left-0 top-0 -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-acid mix-blend-difference"
      />
      <div
        ref={ringRef}
        className="cursor-ring fixed left-0 top-0 flex items-center justify-center rounded-full"
      >
        {label && (
          <span className="label !text-[0.6rem] !tracking-[0.15em] text-bg">
            {label}
          </span>
        )}
      </div>
      <style jsx>{`
        .cursor-ring {
          width: 34px;
          height: 34px;
          margin-left: -17px;
          margin-top: -17px;
          border: 1px solid var(--color-line-strong);
          transition:
            width 0.28s var(--ease-out-expo),
            height 0.28s var(--ease-out-expo),
            margin 0.28s var(--ease-out-expo),
            background-color 0.28s var(--ease-out-expo),
            border-color 0.28s var(--ease-out-expo);
        }
        .cursor-ring[data-hover="link"] {
          width: 52px;
          height: 52px;
          margin-left: -26px;
          margin-top: -26px;
          border-color: var(--color-acid);
        }
        .cursor-ring[data-hover="label"] {
          width: 84px;
          height: 84px;
          margin-left: -42px;
          margin-top: -42px;
          background-color: var(--color-acid);
          border-color: var(--color-acid);
        }
        .cursor-ring[data-down="true"] {
          transform: scale(0.9);
        }
      `}</style>
    </div>
  );
}
