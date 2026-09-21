const SITE = {
  contract: "TBA_FOLLOW_WAGETOKENSOL_FOR_CA",
  buyUrl: "https://t.me/wagetokensol",
};

const toastEl = document.getElementById("toast");
let toastTimer = 0;

function toast(message) {
  toastEl.textContent = message;
  toastEl.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toastEl.classList.remove("show"), 2200);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.left = "-9999px";
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand("copy");
      area.remove();
      return ok;
    } catch {
      return false;
    }
  }
}

/* Nav */
const nav = document.getElementById("nav");
const menuBtn = document.getElementById("menu-btn");

function setNavOpen(open) {
  nav.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  document.body.style.overflow = open ? "hidden" : "";
}

menuBtn.addEventListener("click", () => setNavOpen(!nav.classList.contains("open")));
nav.addEventListener("click", (event) => {
  const link = event.target.closest(".mobile-nav a");
  if (link) setNavOpen(false);
});
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setNavOpen(false);
});
window.addEventListener("resize", () => {
  if (window.matchMedia("(min-width: 768px)").matches) setNavOpen(false);
});
window.addEventListener(
  "scroll",
  () => nav.classList.toggle("scrolled", window.scrollY > 8),
  { passive: true },
);
nav.classList.toggle("scrolled", window.scrollY > 8);

/* Rotating hero quotes */
(function initHeadline() {
  const quotes = [
    `<span class="headline-line">Clock out.</span><span class="headline-line"><span class="yellow">$WAGE</span> is your <span class="green">CFO.</span></span>`,
    `<span class="headline-line">No bosses.</span><span class="headline-line">No 2% annual <span class="green">raises.</span></span>`,
    `<span class="headline-line">Punch out.</span><span class="headline-line"><span class="yellow">$WAGE</span> keeps the <span class="green">bag.</span></span>`,
    `<span class="headline-line">Skip the 1:1.</span><span class="headline-line">The chart is your <span class="green">raise.</span></span>`,
    `<span class="headline-line">You're the <span class="green">CFO.</span></span><span class="headline-line">The cubicle can <span class="yellow">wait.</span></span>`,
    `<span class="headline-line">Clock in never.</span><span class="headline-line"><span class="yellow">$WAGE</span> pays <span class="green">louder.</span></span>`,
  ];

  const a = document.getElementById("headline-a");
  const b = document.getElementById("headline-b");
  if (!a || !b) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let index = 0;
  let showingA = true;

  function swap() {
    index = (index + 1) % quotes.length;
    const incoming = showingA ? b : a;
    const outgoing = showingA ? a : b;
    incoming.innerHTML = quotes[index];
    incoming.setAttribute("aria-hidden", "false");
    outgoing.setAttribute("aria-hidden", "true");
    incoming.classList.remove("is-out");
    void incoming.offsetWidth;
    outgoing.classList.remove("is-in");
    outgoing.classList.add("is-out");
    incoming.classList.add("is-in");
    showingA = !showingA;
  }

  window.setInterval(swap, 4800);
})();

/* Copy CA */
const copyBtn = document.getElementById("copy-ca");
copyBtn.addEventListener("click", async () => {
  if (!SITE.contract || SITE.contract.startsWith("TBA")) {
    toast("CA drops at launch. Follow Telegram, Discord, and X.");
    return;
  }
  const ok = await copyText(SITE.contract);
  if (ok) {
    copyBtn.classList.add("copied");
    toast("Copied to Clipboard!");
    window.setTimeout(() => copyBtn.classList.remove("copied"), 1800);
  } else {
    toast("Could not copy. Select the address instead.");
  }
});

/* FAQ */
document.querySelectorAll(".faq-item").forEach((item) => {
  const btn = item.querySelector(".faq-q");
  btn.addEventListener("click", () => {
    const open = item.classList.contains("open");
    document.querySelectorAll(".faq-item.open").forEach((el) => {
      el.classList.remove("open");
      el.querySelector(".faq-q")?.setAttribute("aria-expanded", "false");
    });
    if (!open) {
      item.classList.add("open");
      btn.setAttribute("aria-expanded", "true");
    }
  });
});

/* Player */
const video = document.getElementById("ep-video");
const cinema = document.getElementById("cinema");
const playHit = document.getElementById("play-hit");
const playBtn = document.getElementById("play-btn");
const playIcon = document.getElementById("play-icon");
const pauseIcon = document.getElementById("pause-icon");
const seek = document.getElementById("seek");
const tNow = document.getElementById("t-now");
const tEnd = document.getElementById("t-end");
const fsBtn = document.getElementById("fs-btn");
const shareBtn = document.getElementById("share-btn");
const epBadge = document.getElementById("ep-badge");
const logline = document.getElementById("logline");
const dlEp = document.getElementById("dl-ep");
const dlLabel = document.getElementById("dl-label");

const EPISODES = {
  "ep-01": {
    src: "episodes/ep-01.mp4",
    poster: "episodes/ep-01.jpg",
    badge: "Ep 01 · The Grind",
    logline: "He finds $WAGE. Then the 9-to-5 starts looking like a trap.",
    downloadName: "wage-ep-01-the-grind.mp4",
    downloadLabel: "Download EP 01",
    shareTitle: "THE $WAGE MOVIE · EP 01: The Grind",
    durationHint: 50,
  },
  "ep-02": {
    src: "episodes/ep-02.mp4",
    poster: "episodes/ep-02.jpg",
    badge: "Ep 02 · The Bag",
    logline: "He buys $WAGE. Then he gets rich.",
    downloadName: "wage-ep-02-the-bag.mp4",
    downloadLabel: "Download EP 02",
    shareTitle: "THE $WAGE MOVIE · EP 02: The Bag",
    durationHint: 107,
  },
};

let currentEp = "ep-01";
let playGen = 0;
let ignorePauseUntil = 0;
let scrubbing = false;

function formatClock(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const total = Math.floor(seconds);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}

function setPausedUI(paused) {
  cinema.dataset.playing = paused ? "false" : "true";
  const label = EPISODES[currentEp].badge;
  playHit.setAttribute("aria-label", paused ? `Play ${label}` : "Pause episode");
  playBtn.setAttribute("aria-label", paused ? "Play" : "Pause");
  playIcon.toggleAttribute("hidden", !paused);
  pauseIcon.toggleAttribute("hidden", paused);
}

function paintSeek() {
  const hint = EPISODES[currentEp].durationHint;
  const duration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : hint;
  const current = scrubbing ? Number(seek.value) || 0 : video.currentTime || 0;
  const progress = duration > 0 ? Math.min(current / duration, 1) : 0;
  if (!scrubbing) {
    seek.max = String(duration);
    seek.value = String(current);
  }
  seek.style.background = `linear-gradient(to right, var(--accent) ${progress * 100}%, color-mix(in oklab, var(--fg) 18%, transparent) ${progress * 100}%)`;
  tNow.textContent = formatClock(current);
  tEnd.textContent = formatClock(duration);
}

async function playVideo() {
  if (!video.paused) return;
  const gen = ++playGen;
  ignorePauseUntil = performance.now() + 400;
  setPausedUI(false);
  try {
    await video.play();
  } catch (err) {
    if (playGen !== gen) return;
    if (err instanceof DOMException && (err.name === "AbortError" || err.name === "NotAllowedError")) {
      try {
        await video.play();
      } catch {
        setPausedUI(true);
      }
    } else {
      setPausedUI(true);
    }
  }
}

function pauseVideo() {
  if (performance.now() < ignorePauseUntil) return;
  playGen += 1;
  video.pause();
  setPausedUI(true);
}

function togglePlay() {
  if (video.paused) void playVideo();
  else pauseVideo();
}

function loadEpisode(id) {
  const ep = EPISODES[id];
  if (!ep || id === currentEp) return;
  playGen += 1;
  video.pause();
  currentEp = id;
  scrubbing = false;
  video.src = ep.src;
  video.poster = ep.poster;
  video.load();
  seek.value = "0";
  epBadge.textContent = ep.badge;
  logline.textContent = ep.logline;
  dlEp.href = ep.src;
  dlEp.setAttribute("download", ep.downloadName);
  dlLabel.textContent = ep.downloadLabel;
  setPausedUI(true);
  paintSeek();
  document.querySelectorAll(".ep-card").forEach((card) => {
    const on = card.dataset.ep === id;
    card.classList.toggle("selected", on);
    const thumb = card.querySelector(".ep-thumb");
    if (!thumb) return;
    const existing = thumb.querySelector(".showing");
    if (on && !existing) {
      const tag = document.createElement("span");
      tag.className = "showing";
      tag.textContent = "Now showing";
      thumb.appendChild(tag);
    } else if (!on && existing) {
      existing.remove();
    }
  });
}

playHit.addEventListener("click", () => {
  cinema.focus({ preventScroll: true });
  togglePlay();
});
playBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  togglePlay();
});

video.addEventListener("play", () => setPausedUI(false));
video.addEventListener("pause", () => {
  if (performance.now() < ignorePauseUntil) return;
  setPausedUI(true);
});
video.addEventListener("ended", () => setPausedUI(true));
video.addEventListener("timeupdate", paintSeek);
video.addEventListener("loadedmetadata", paintSeek);
video.addEventListener("durationchange", paintSeek);
video.addEventListener("error", () => {
  setPausedUI(true);
  toast("Couldn't load the episode. Try again.");
});

function seekTo(seconds) {
  const duration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : Number(seek.max);
  if (!Number.isFinite(seconds) || !Number.isFinite(duration)) return;
  const next = Math.min(Math.max(seconds, 0), duration);
  try {
    video.currentTime = next;
  } catch {
    /* not seekable yet */
  }
  seek.value = String(next);
  paintSeek();
}

seek.addEventListener("pointerdown", (event) => {
  event.stopPropagation();
  scrubbing = true;
});
seek.addEventListener("input", () => {
  const next = Number(seek.value);
  if (!Number.isFinite(next)) return;
  seekTo(next);
});
seek.addEventListener("change", () => {
  const next = Number(seek.value);
  if (Number.isFinite(next)) seekTo(next);
  scrubbing = false;
  paintSeek();
});
seek.addEventListener("pointerup", () => {
  scrubbing = false;
  paintSeek();
});
seek.addEventListener("click", (event) => event.stopPropagation());
window.addEventListener("pointerup", () => {
  if (!scrubbing) return;
  scrubbing = false;
  paintSeek();
});

async function toggleFullscreen() {
  try {
    const active = document.fullscreenElement || document.webkitFullscreenElement;
    if (active) {
      if (document.exitFullscreen) await document.exitFullscreen();
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
      return;
    }
    if (cinema.requestFullscreen) await cinema.requestFullscreen();
    else if (cinema.webkitRequestFullscreen) cinema.webkitRequestFullscreen();
    else if (video.webkitEnterFullscreen) video.webkitEnterFullscreen();
  } catch {
    toast("Fullscreen is blocked in this browser.");
  }
}

fsBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  void toggleFullscreen();
});

document.addEventListener("fullscreenchange", syncFs);
document.addEventListener("webkitfullscreenchange", syncFs);

function syncFs() {
  const on = Boolean(document.fullscreenElement === cinema || document.webkitFullscreenElement === cinema);
  cinema.classList.toggle("is-fs", on);
  fsBtn.setAttribute("aria-label", on ? "Exit fullscreen" : "Enter fullscreen");
}

cinema.addEventListener("keydown", (event) => {
  if (event.key === " " || event.key === "k" || event.key === "K") {
    event.preventDefault();
    togglePlay();
  } else if (event.key === "f" || event.key === "F") {
    event.preventDefault();
    void toggleFullscreen();
  } else if (event.key === "ArrowRight") {
    event.preventDefault();
    seekTo((video.currentTime || 0) + 5);
  } else if (event.key === "ArrowLeft") {
    event.preventDefault();
    seekTo((video.currentTime || 0) - 5);
  }
});

shareBtn.addEventListener("click", async () => {
  const ep = EPISODES[currentEp];
  const url = `${window.location.origin}${window.location.pathname}#movie`;
  const payload = {
    title: ep.shareTitle,
    text: ep.logline,
    url,
  };
  try {
    if (navigator.share) {
      await navigator.share(payload);
      return;
    }
    const ok = await copyText(url);
    toast(ok ? "Copied to Clipboard!" : "Could not share. Copy the URL instead.");
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") return;
    toast("Could not share. Copy the URL instead.");
  }
});

document.querySelectorAll(".ep-card").forEach((card) => {
  card.addEventListener("click", () => {
    const id = card.dataset.ep;
    if (!EPISODES[id]) return;
    loadEpisode(id);
  });
});

paintSeek();

/* Punch-clock pointer + card tilt */
(function initDeskMotion() {
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (!fine.matches || reduce.matches) return;

  const punch = document.getElementById("punch");
  if (!punch) return;

  let tx = window.innerWidth * 0.6;
  let ty = window.innerHeight * 0.3;
  let cx = tx;
  let cy = ty;
  punch.classList.add("on");

  function tick() {
    cx += (tx - cx) * 0.2;
    cy += (ty - cy) * 0.2;
    punch.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
    punch.style.setProperty("--hand", `${(cx + cy) * 0.35}deg`);
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  window.addEventListener(
    "pointermove",
    (event) => {
      tx = event.clientX;
      ty = event.clientY;
      document.documentElement.style.setProperty("--mx", `${event.clientX}px`);
      document.documentElement.style.setProperty("--my", `${event.clientY}px`);
      const hot = event.target.closest(
        "a, button, .card, .why-card, .ep-card, .social, .step, .faq-q, .cinema-seek, .wage-badge",
      );
      punch.classList.toggle("hot", Boolean(hot));
    },
    { passive: true },
  );
  window.addEventListener("pointerdown", () => punch.classList.add("down"));
  window.addEventListener("pointerup", () => punch.classList.remove("down"));
  document.addEventListener("mouseleave", () => punch.classList.remove("on"));
  document.addEventListener("mouseenter", () => punch.classList.add("on"));

  document.querySelectorAll(".card, .why-card, .ep-card, .social, .step").forEach((el) => {
    el.addEventListener("pointermove", (event) => {
      const box = el.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width - 0.5;
      const y = (event.clientY - box.top) / box.height - 0.5;
      el.style.transform = `perspective(900px) rotateY(${x * 9}deg) rotateX(${-y * 7}deg) translateY(-5px)`;
    });
    el.addEventListener("pointerleave", () => {
      el.style.transform = "";
    });
  });
})();
