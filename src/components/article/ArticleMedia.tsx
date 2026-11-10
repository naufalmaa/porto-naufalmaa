"use client";

import * as React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import type { CarouselItem as Slide } from "@/lib/article";

/**
 * Images with a caption each: one slide at a time, the caption of the visible slide under it, a click to enlarge.
 * `video` keeps the 16:9 frame older articles use; `wide` (16:10) suits screenshots of an application.
 */
export function ArticleCarousel({ items, altPrefix = "Screenshot", frame = "wide" }: { items: Slide[]; altPrefix?: string; frame?: "wide" | "video" }) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    const update = () => setIndex(api.selectedScrollSnap());
    api.on("select", update);
    api.on("reInit", update);
    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);

  if (!items.length) return null;
  const altOf = (item: Slide, i: number) => item.caption || `${altPrefix} ${i + 1}`;

  return (
    <figure className="not-prose my-10 font-sans">
      <Carousel setApi={setApi} className="relative w-full">
        <CarouselContent>
          {items.map((item, i) => (
            <CarouselItem key={item.src}>
              <div className={`${frame === "wide" ? "aspect-[16/10]" : "aspect-video"} overflow-hidden rounded-xl border border-border/50 bg-muted/20`}>
                <Dialog>
                  <DialogTrigger
                    render={
                      <button
                        type="button"
                        aria-label={`Enlarge: ${altOf(item, i)}`}
                        className="block h-full w-full outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      />
                    }
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.src}
                      alt={altOf(item, i)}
                      loading={i === 0 ? "eager" : "lazy"}
                      decoding="async"
                      className="h-full w-full cursor-zoom-in object-contain transition-opacity hover:opacity-90"
                    />
                  </DialogTrigger>
                  <DialogContent
                    showCloseButton={true}
                    className="flex h-[95vh] max-w-[95vw] items-center justify-center border-none bg-transparent p-0 shadow-none sm:max-w-[95vw]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.src} alt={altOf(item, i)} className="max-h-full max-w-full object-contain" />
                  </DialogContent>
                </Dialog>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {items.length > 1 && (
          <>
            <CarouselPrevious className="absolute left-4 bg-background/80 shadow-md backdrop-blur" />
            <CarouselNext className="absolute right-4 bg-background/80 shadow-md backdrop-blur" />
          </>
        )}
      </Carousel>
      <figcaption className="mt-3 flex items-start justify-between gap-4 text-sm leading-snug text-muted-foreground">
        <span aria-live="polite">{items[index]?.caption}</span>
        {items.length > 1 && (
          <span className="shrink-0 text-xs tabular-nums" aria-hidden>
            {index + 1} / {items.length}
          </span>
        )}
      </figcaption>
    </figure>
  );
}

/**
 * A short screen recording. `loop` plays it muted and without controls, and stops it for visitors who asked for
 * less motion (they get the poster and the controls). Otherwise it waits for a click.
 */
export function ArticleVideo({ src, poster, caption, loop }: { src: string; poster?: string; caption?: string; loop: boolean }) {
  const ref = React.useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    if (!loop) return;
    const video = ref.current;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      setReduced(query.matches);
      if (query.matches) video?.pause();
      else video?.play().catch(() => {});
    };
    query.addEventListener("change", apply);
    // the first check waits a frame: React 19 flags a state change made while the effect runs
    const first = requestAnimationFrame(apply);
    return () => {
      cancelAnimationFrame(first);
      query.removeEventListener("change", apply);
    };
  }, [loop]);

  return (
    <figure className="not-prose my-8 font-sans">
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        playsInline
        loop={loop}
        autoPlay={loop}
        controls={!loop || reduced}
        preload={loop ? "auto" : "metadata"}
        aria-label={caption}
        className="w-full rounded-xl border border-border/50 bg-muted/20"
      />
      {caption && <figcaption className="mt-3 text-sm leading-snug text-muted-foreground">{caption}</figcaption>}
    </figure>
  );
}
