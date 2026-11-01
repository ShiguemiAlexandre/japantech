import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

/**
 * Carousel with real jAPPa ERP screens (fictitious demo data).
 *
 * Layout: one frame with a FIXED aspect ratio per breakpoint (phone screens 3:5 below `sm`,
 * desktop screens 16:10 from `sm` up). All slides are stacked in that frame and cross-fade, and
 * the images use object-fit: contain on a graphite background, so changing slides never
 * changes the height. A <picture> serves the phone or desktop print of the same screen per
 * breakpoint; slides that only exist as a phone print (fast check-out) show it centered.
 * Captions are stacked in one grid cell so the caption row always has the tallest caption's height.
 *
 * Accessibility: WAI-ARIA carousel pattern. Rotation pauses on hover, focus, touch, when
 * off-screen, with the pause button, and is off with prefers-reduced-motion. Arrow/Home/End keys
 * work on the region, and aria-live is "polite" whenever rotation is not running.
 */
const SLIDES: { file: string; desktop: boolean }[] = [
  { file: '01-painel', desktop: true },
  { file: '02-baixa-rapida', desktop: false },
  { file: '03-cadastro-ia', desktop: true },
  { file: '04-varias-fotos', desktop: true },
  { file: '05-nota-fiscal', desktop: true },
  { file: '06-historico', desktop: true },
  { file: '07-produtos', desktop: true },
];
const INTERVAL_MS = 5000;
const TOUCH_RESUME_MS = 8000;

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return reduced;
};

const ProductCarousel: React.FC = () => {
  const { t } = useLanguage();
  const g = t.product.gallery;
  const total = SLIDES.length;

  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  const rootRef = useRef<HTMLDivElement>(null);
  const touchTimer = useRef<number | undefined>(undefined);
  const swipeStart = useRef<{ x: number; y: number } | null>(null);

  const rotating = !reducedMotion && !userPaused && !hovered && !focused && !touched && inView;

  const go = useCallback((i: number) => setIndex(((i % total) + total) % total), [total]);
  const prev = () => go(index - 1);
  const next = () => go(index + 1);

  // Auto-advance; depends on `index` so any manual change restarts the full interval.
  useEffect(() => {
    if (!rotating) return;
    const id = window.setTimeout(() => go(index + 1), INTERVAL_MS);
    return () => window.clearTimeout(id);
  }, [rotating, index, go]);

  // Only rotate while the carousel is on screen.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => () => window.clearTimeout(touchTimer.current), []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const keys: Record<string, () => void> = {
      ArrowLeft: prev,
      ArrowRight: next,
      Home: () => go(0),
      End: () => go(total - 1),
    };
    const fn = keys[e.key];
    if (fn) {
      e.preventDefault();
      fn();
    }
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse') return;
    window.clearTimeout(touchTimer.current);
    setTouched(true);
    swipeStart.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse') return;
    const s = swipeStart.current;
    swipeStart.current = null;
    if (s) {
      const dx = e.clientX - s.x;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(e.clientY - s.y)) (dx < 0 ? next : prev)();
    }
    window.clearTimeout(touchTimer.current);
    touchTimer.current = window.setTimeout(() => setTouched(false), TOUCH_RESUME_MS);
  };

  const fade = 'transition-opacity duration-500 ease-out motion-reduce:transition-none';
  const pad = (n: number) => String(n).padStart(2, '0');
  const btn =
    'inline-flex items-center justify-center w-9 h-9 border border-white/15 bg-black text-gray-300 hover:text-white hover:border-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 transition-colors';

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={g.region}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
      }}
      className="max-w-4xl mx-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-4 focus-visible:ring-offset-zinc-950"
    >
      <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-[1px] bg-red-600" />
          <span className="text-xs font-mono text-red-600 uppercase tracking-widest whitespace-nowrap">{g.label}</span>
        </div>
        <span className="pl-12 sm:pl-0 text-[10px] font-mono text-gray-600 uppercase tracking-widest whitespace-nowrap">{g.note}</span>
      </div>

      {/* Fixed-ratio frame: slides are stacked and cross-fade, so the height never changes. */}
      <div
        className="relative w-full aspect-[3/5] sm:aspect-[16/10] bg-zinc-900 border border-red-600/60 overflow-hidden touch-pan-y"
        aria-live={rotating ? 'off' : 'polite'}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          swipeStart.current = null;
        }}
      >
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
        <div className="absolute -top-px -left-px w-5 h-5 border-t-2 border-l-2 border-red-600 z-10 pointer-events-none" />
        <div className="absolute -bottom-px -right-px w-5 h-5 border-b-2 border-r-2 border-red-600 z-10 pointer-events-none" />
        {SLIDES.map((s, i) => {
          const active = i === index;
          return (
            <div
              key={s.file}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} ${g.of} ${total}`}
              aria-hidden={!active}
              inert={!active}
              className={`absolute inset-0 ${fade} ${active ? 'opacity-100' : 'opacity-0'}`}
            >
              <picture>
                {s.desktop && (
                  <source media="(min-width: 640px)" srcSet={`/erp/${s.file}-desktop.webp`} width={1280} height={800} />
                )}
                <img
                  src={`/erp/${s.file}-mobile.webp`}
                  width={720}
                  height={1558}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  alt={g.slides[i].alt}
                  className="absolute inset-0 w-full h-full object-contain select-none"
                />
              </picture>
            </div>
          );
        })}
      </div>

      {/* Caption: every caption sits in the same grid cell, so the row keeps the tallest height. */}
      <div className="flex items-start gap-3 mt-4">
        <span className="shrink-0 font-mono text-xs text-red-600 tracking-widest pt-px" aria-hidden="true">
          {pad(index + 1)} / {pad(total)}
        </span>
        <div className="grid flex-1 min-w-0">
          {SLIDES.map((s, i) => (
            <p
              key={s.file}
              aria-hidden={i !== index}
              className={`col-start-1 row-start-1 font-mono text-xs text-gray-300 uppercase tracking-wider leading-relaxed ${fade} ${
                i === index ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {g.slides[i].caption}
            </p>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 mt-4">
        <div className="flex items-center flex-wrap">
          {SLIDES.map((s, i) => (
            <button
              key={s.file}
              type="button"
              onClick={() => go(i)}
              aria-label={`${g.goto} ${i + 1} ${g.of} ${total}`}
              aria-current={i === index ? 'true' : undefined}
              className="group p-2 -m-0.5 focus-visible:outline-none"
            >
              <span
                className={`block h-1.5 transition-all duration-300 motion-reduce:transition-none group-focus-visible:ring-2 group-focus-visible:ring-red-600 ${
                  i === index ? 'w-6 bg-red-600' : 'w-1.5 bg-white/25 group-hover:bg-white/60'
                }`}
              />
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2">
          {!reducedMotion && (
            <button
              type="button"
              onClick={() => setUserPaused((p) => !p)}
              aria-label={userPaused ? g.play : g.pause}
              className={btn}
            >
              {userPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            </button>
          )}
          <button type="button" onClick={prev} aria-label={g.prev} className={btn}>
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button type="button" onClick={next} aria-label={g.next} className={btn}>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;
