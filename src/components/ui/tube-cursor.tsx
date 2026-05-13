"use client";

import { useEffect, useRef } from "react";

type TubesCursorProps = {
  title?: string;
  subtitle?: string;
  caption?: string;
  initialColors?: string[];
  lightColors?: string[];
  lightIntensity?: number;
  titleSize?: string;
  subtitleSize?: string;
  captionSize?: string;
  enableRandomizeOnClick?: boolean;
  className?: string;
};

const DEFAULT_INITIAL_COLORS = ["#7dc6ff", "#b3f2c8", "#ffd59a"];
const DEFAULT_LIGHT_COLORS = ["#fff1b8", "#b8f1ff", "#ffd1e6", "#c3f0ca"];
const DEFAULT_LIGHT_INTENSITY = 120;

const TubesCursor = ({
  title = "Tubes",
  subtitle = "Cursor",
  caption = "WebGPU / WebGL",
  initialColors = DEFAULT_INITIAL_COLORS,
  lightColors = DEFAULT_LIGHT_COLORS,
  lightIntensity = DEFAULT_LIGHT_INTENSITY,
  titleSize = "text-[80px]",
  subtitleSize = "text-[60px]",
  captionSize = "text-base",
  enableRandomizeOnClick = true,
  className = "",
}: TubesCursorProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const appRef = useRef<any>(null);

  useEffect(() => {
    let removeClick: (() => void) | null = null;
    let destroyed = false;

    (async () => {
      const mod = await import(
        /* webpackIgnore: true */
        "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js"
      );
      const TubesCursorCtor = (mod as any).default ?? mod;

      if (!canvasRef.current || destroyed) return;

      const app = TubesCursorCtor(canvasRef.current, {
        tubes: {
          colors: initialColors,
          lights: {
            intensity: lightIntensity,
            colors: lightColors,
          },
        },
      });

      appRef.current = app;

      if (enableRandomizeOnClick) {
        const handler = () => {
          const colors = randomColors(initialColors.length);
          const lights = randomColors(lightColors.length);
          app.tubes.setColors(colors);
          app.tubes.setLightsColors(lights);
        };
        document.body.addEventListener("click", handler);
        removeClick = () => document.body.removeEventListener("click", handler);
      }
    })();

    return () => {
      destroyed = true;
      if (removeClick) removeClick();
      try {
        appRef.current?.dispose?.();
        appRef.current = null;
      } catch {
        // ignore
      }
    };
  }, [initialColors, lightColors, lightIntensity, enableRandomizeOnClick]);

  return (
    <div
      className={`relative h-screen w-screen overflow-hidden bg-slate-50 text-slate-900 ${className}`}
    >
      <canvas ref={canvasRef} className="fixed inset-0 block h-full w-full opacity-90" />
      <div className="pointer-events-none absolute inset-0 bg-white/35" aria-hidden />

      <div className="relative z-10 flex h-full w-full select-none flex-col items-center justify-center gap-2 text-center">
        <h1
          className={`m-0 p-0 font-bold uppercase leading-none drop-shadow-[0_10px_30px_rgba(15,23,42,0.2)] ${titleSize}`}
        >
          {title}
        </h1>
        <h2
          className={`m-0 p-0 font-medium uppercase leading-none drop-shadow-[0_10px_30px_rgba(15,23,42,0.2)] ${subtitleSize}`}
        >
          {subtitle}
        </h2>
        <p
          className={`m-0 p-0 leading-none drop-shadow-[0_10px_30px_rgba(15,23,42,0.2)] ${captionSize}`}
        >
          {caption}
        </p>
      </div>
    </div>
  );
};

function randomColors(count: number) {
  return new Array(count).fill(0).map(
    () =>
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
  );
}

export { TubesCursor };
