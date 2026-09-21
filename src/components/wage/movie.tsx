import { useEffect, useRef, useState } from "react";
import { Download, Maximize2, Minimize2, Pause, Play, Share2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { copyToClipboard } from "@/lib/clipboard";

type Episode = {
  id: string;
  ep: string;
  title: string;
  logline: string;
  duration: string;
  poster?: string;
  src?: string;
  file?: string;
  status: "live" | "soon";
};

const EPISODES: Episode[] = [
  {
    id: "ep-01",
    ep: "01",
    title: "The Grind",
    logline: "He finds $WAGE. Then the 9-to-5 starts looking like a trap.",
    duration: "0:50",
    poster: "/episodes/ep-01.jpg?v=upscale",
    src: "/episodes/ep-01.mp4?v=upscale",
    file: "wage-ep-01-the-grind.mp4",
    status: "live",
  },
  {
    id: "ep-02",
    ep: "02",
    title: "The Bag",
    logline: "He buys $WAGE. Then he gets rich.",
    duration: "TBA",
    status: "soon",
  },
];

function formatClock(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const total = Math.floor(seconds);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}

export function Movie() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const playGen = useRef(0);
  const ignorePauseUntil = useRef(0);
  const [paused, setPaused] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [activeId, setActiveId] = useState(EPISODES[0].id);
  const episode = EPISODES.find((item) => item.id === activeId) ?? EPISODES[0];
  const progress = duration > 0 ? Math.min(currentTime / duration, 1) : 0;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.readyState >= 1 && Number.isFinite(video.duration) && video.duration > 0) {
      setDuration(video.duration);
      setCurrentTime(video.currentTime || 0);
    }
  }, [episode.id]);

  useEffect(() => {
    function syncFullscreen() {
      const node = frameRef.current;
      setFullscreen(Boolean(node && document.fullscreenElement === node));
    }
    document.addEventListener("fullscreenchange", syncFullscreen);
    return () => document.removeEventListener("fullscreenchange", syncFullscreen);
  }, []);

  function syncClock(video: HTMLVideoElement) {
    if (Number.isFinite(video.duration) && video.duration > 0) {
      setDuration(video.duration);
    }
    setCurrentTime(video.currentTime || 0);
  }

  async function playVideo() {
    const video = videoRef.current;
    if (!video || !episode.src) return;
    if (!video.paused) return;
    const gen = ++playGen.current;
    ignorePauseUntil.current = performance.now() + 400;
    setPaused(false);
    try {
      await video.play();
    } catch (err) {
      if (playGen.current !== gen) return;
      if (err instanceof DOMException && (err.name === "AbortError" || err.name === "NotAllowedError")) {
        try {
          await video.play();
        } catch {
          setPaused(true);
        }
      } else {
        setPaused(true);
      }
    }
  }

  function pauseVideo() {
    if (performance.now() < ignorePauseUntil.current) return;
    playGen.current += 1;
    videoRef.current?.pause();
    setPaused(true);
  }

  function seekTo(next: number) {
    const video = videoRef.current;
    if (!video || !Number.isFinite(next)) return;
    video.currentTime = next;
    setCurrentTime(next);
  }

  async function toggleFullscreen() {
    const frame = frameRef.current;
    if (!frame) return;
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
        return;
      }
      await frame.requestFullscreen();
    } catch {
      toast.error("Fullscreen is blocked in this browser.");
    }
  }

  function selectEpisode(next: Episode) {
    if (next.status !== "live" || !next.src) {
      toast.message(`Episode ${next.ep} drops when the next reel lands.`);
      return;
    }
    if (next.id === activeId) return;
    pauseVideo();
    setPaused(true);
    setCurrentTime(0);
    setDuration(0);
    setActiveId(next.id);
  }

  async function shareMovie() {
    const url = `${window.location.origin}#movie`;
    const payload = {
      title: `THE $WAGE MOVIE · EP ${episode.ep}: ${episode.title}`,
      text: episode.logline,
      url,
    };
    try {
      if (navigator.share) {
        await navigator.share(payload);
        return;
      }
      await copyToClipboard(url);
      toast.success("Copied to Clipboard!");
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      toast.error("Could not share. Copy the URL instead.");
    }
  }

  return (
    <section id="movie" className="scroll-mt-28 border-b border-line">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-green">
          02 — The Feature
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight text-fg sm:text-4xl">
          The $WAGE Movie: Clocking Out For Good
        </h2>
        <p className="mt-3 max-w-xl text-muted">
          Two episodes. First he finds $WAGE and survives the grind. Then he buys, and gets rich.
        </p>

        <div className="relative mx-auto mt-10 max-w-4xl">
          <div
            ref={frameRef}
            className="cinema-frame relative overflow-hidden rounded-md bg-bg"
            data-playing={paused ? "false" : "true"}
          >
            <div className="cinema-stage relative aspect-video">
              {episode.src ? (
                <video
                  key={episode.id}
                  ref={videoRef}
                  src={episode.src}
                  className={cn(
                    "h-full w-full",
                    fullscreen ? "object-contain" : "object-cover",
                  )}
                  poster={episode.poster}
                  playsInline
                  preload="auto"
                  controls={false}
                  onPlay={() => setPaused(false)}
                  onPause={() => {
                    if (performance.now() < ignorePauseUntil.current) return;
                    setPaused(true);
                  }}
                  onEnded={() => setPaused(true)}
                  onTimeUpdate={(event) => syncClock(event.currentTarget)}
                  onLoadedMetadata={(event) => syncClock(event.currentTarget)}
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-bg px-6 text-center">
                  <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-green">
                    Episode {episode.ep}
                  </p>
                  <p className="font-display text-2xl font-bold uppercase text-fg">{episode.title}</p>
                  <p className="text-sm text-muted">Reel not punched in yet.</p>
                </div>
              )}

              <div className="cinema-badge pointer-events-none absolute left-3 top-3 z-10 sm:left-4 sm:top-4">
                <p className="rounded-pill border border-green/70 bg-bg/70 px-2.5 py-1 font-display text-[10px] font-bold uppercase tracking-[0.16em] text-green backdrop-blur-sm">
                  Ep {episode.ep} · {episode.title}
                </p>
              </div>

              {episode.src ? (
                <button
                  type="button"
                  onClick={() => (paused ? void playVideo() : pauseVideo())}
                  className={cn(
                    "absolute inset-0 z-[1] flex items-center justify-center transition-[opacity,background-color] duration-200",
                    paused ? "bg-bg/40 opacity-100" : "bg-transparent opacity-0",
                  )}
                  aria-label={paused ? `Play episode ${episode.ep}` : "Pause episode"}
                >
                  <span
                    className={cn(
                      "flex size-16 items-center justify-center rounded-full bg-accent text-accent-fg shadow-glow-yellow transition-[opacity,transform,filter] duration-200 sm:size-20",
                      paused ? "scale-100 opacity-100 blur-0" : "scale-[0.25] opacity-0 blur-[4px]",
                    )}
                  >
                    <Play className="size-7 translate-x-0.5 fill-current sm:size-8" />
                  </span>
                </button>
              ) : null}

              {episode.src ? (
                <div className="cinema-controls absolute inset-x-0 bottom-0 z-[2] flex items-center gap-3 bg-gradient-to-t from-bg/90 via-bg/55 to-transparent px-3 pb-3 pt-8">
                  <button
                    type="button"
                    onClick={() => (paused ? void playVideo() : pauseVideo())}
                    className="pointer-events-auto flex size-11 shrink-0 items-center justify-center rounded-full bg-accent text-accent-fg"
                    aria-label={paused ? "Play" : "Pause"}
                  >
                    {paused ? (
                      <Play className="size-4 translate-x-px fill-current" />
                    ) : (
                      <Pause className="size-4 fill-current" />
                    )}
                  </button>
                  <span className="w-10 shrink-0 font-mono text-xs tabular-nums text-fg">
                    {formatClock(currentTime)}
                  </span>
                  <input
                    type="range"
                    className="cinema-seek pointer-events-auto"
                    min={0}
                    max={duration || 50}
                    step={0.05}
                    value={duration ? Math.min(currentTime, duration) : 0}
                    aria-label="Seek"
                    style={{
                      background: `linear-gradient(to right, var(--color-accent) ${progress * 100}%, color-mix(in oklab, var(--color-fg) 18%, transparent) ${progress * 100}%)`,
                    }}
                    onChange={(event) => seekTo(Number(event.currentTarget.value))}
                    onClick={(event) => event.stopPropagation()}
                  />
                  <span className="w-10 shrink-0 text-right font-mono text-xs tabular-nums text-muted">
                    {duration ? formatClock(duration) : episode.duration}
                  </span>
                  <button
                    type="button"
                    onClick={() => void toggleFullscreen()}
                    className="pointer-events-auto flex size-11 shrink-0 items-center justify-center rounded-full border border-fg/40 text-fg transition-[background-color,border-color] duration-150 hover:border-accent hover:bg-fg/10"
                    aria-label={fullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                  >
                    <span className="relative size-4">
                      <Maximize2
                        className={cn(
                          "absolute inset-0 size-4 transition-[opacity,transform,filter] duration-200",
                          fullscreen ? "scale-[0.25] opacity-0 blur-[4px]" : "scale-100 opacity-100 blur-0",
                        )}
                      />
                      <Minimize2
                        className={cn(
                          "absolute inset-0 size-4 transition-[opacity,transform,filter] duration-200",
                          fullscreen ? "scale-100 opacity-100 blur-0" : "scale-[0.25] opacity-0 blur-[4px]",
                        )}
                      />
                    </span>
                  </button>
                </div>
              ) : null}
            </div>
          </div>
          <p className="mt-4 text-sm text-muted">{episode.logline}</p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {episode.src && episode.file ? (
            <Button asChild variant="yellow">
              <a href={episode.src} download={episode.file}>
                <Download className="size-4" />
                Download EP {episode.ep}
              </a>
            </Button>
          ) : null}
          <Button type="button" variant="outline" onClick={shareMovie}>
            <Share2 className="size-4" />
            Share Movie
          </Button>
        </div>

        <div className="mt-12" id="episodes">
          <p className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-muted">
            Episodes
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {EPISODES.map((item) => {
              const live = item.status === "live";
              const selected = item.id === activeId;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectEpisode(item)}
                  className={cn(
                    "overflow-hidden rounded-lg border bg-surface text-left transition-[border-color,box-shadow,transform] duration-150",
                    selected
                      ? "border-green shadow-glow-green"
                      : "border-line hover:border-fg/50",
                  )}
                >
                  <div className="relative aspect-video overflow-hidden bg-bg">
                    {item.poster ? (
                      <img
                        src={item.poster}
                        alt=""
                        width={640}
                        height={360}
                        className={cn("h-full w-full object-cover", live ? "" : "opacity-55 grayscale")}
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center gap-1 px-4 text-center">
                        <p className="font-display text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
                          Next reel
                        </p>
                        <p className="font-display text-lg font-bold uppercase text-fg">{item.title}</p>
                      </div>
                    )}
                    {!live ? (
                      <span className="stamp absolute right-3 top-3 px-1.5 py-1 text-[8px]">
                        Coming
                        <br />
                        Soon
                      </span>
                    ) : (
                      <span className="absolute bottom-3 left-3 rounded-pill bg-green px-2 py-0.5 font-display text-[10px] font-bold uppercase tracking-wide text-green-fg">
                        Now showing
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="font-display text-[10px] font-bold uppercase tracking-[0.16em] text-green">
                      Episode {item.ep} · {item.duration}
                    </p>
                    <h3 className="mt-1 font-display text-sm font-bold uppercase tracking-tight text-fg">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted">{item.logline}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
