import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

/**
 * The jAPPa ERP tablet mockup, whose screen is a carousel: slide 1 is the drawn illustration
 * (passed in as `illustration`), followed by real screenshots with fictitious demo data.
 *
 * Layout: the tablet screen has a FIXED aspect ratio per breakpoint (3:4 on phones, 16:10 from
 * `sm`, 4:3 at `lg` where the column is narrow, 16:10 again from `xl`). All slides are stacked in
 * it and cross-fade; screenshots use object-fit: contain on a graphite background, and a
 * <picture> serves the phone print below `sm` and the desktop print above. Captions (plus the
 * demo-data note) are stacked in one grid cell, so nothing changes height when slides change.
 *
 * Accessibility: WAI-ARIA carousel pattern. Rotation pauses on hover, focus, touch, when
 * off-screen, with the pause button, and is off with prefers-reduced-motion. Arrow/Home/End keys
 * work on the region, and aria-live is "polite" whenever rotation is not running.
 */
const SCREENS = [
  '01-painel',
  '02-baixa-rapida',
  '03-cadastro-ia',
  '04-varias-fotos',
  '05-nota-fiscal',
  '06-historico',
  '07-produtos',
] as const;
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

const ProductCarousel: React.FC<{ illustration: React.ReactNode }> = ({ illustration }) => {
  const { t } = useLanguage();
  const g = t.product.gallery;
  // Slide 0 is the illustration, slides 1..N the screenshots.
  const captions = [g.intro, ...g.slides];
  const total = SCREENS.length + 1;

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

  const slideProps = (i: number) => ({
    role: 'group',
    'aria-roledescription': 'slide',
    'aria-label': `${i + 1} ${g.of} ${total}`,
    'aria-hidden': i !== index,
    inert: i !== index,
    className: `absolute inset-0 ${fade} ${i === index ? 'opacity-100' : 'opacity-0'}`,
  });

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
      className="relative w-full max-w-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-4 focus-visible:ring-offset-zinc-900"
    >
      {/* Tablet */}
      <div className="rounded-2xl border-4 border-zinc-800 bg-black shadow-2xl shadow-red-900/20">
        <div className="h-7 bg-zinc-950 border-b border-white/10 flex items-center justify-between px-4 rounded-t-xl" aria-hidden="true">
          <span className="font-jp text-xs text-red-600">伊藤</span>
          <span className="text-[9px] font-mono text-gray-500">{t.product.name.toUpperCase()}</span>
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
        </div>

        {/* Screen: fixed ratio per breakpoint, slides stacked and cross-fading */}
        <div
          className="relative w-full aspect-[3/4] sm:aspect-[16/10] lg:aspect-[4/3] xl:aspect-[16/10] bg-zinc-900 overflow-hidden rounded-b-xl touch-pan-y"
          aria-live={rotating ? 'off' : 'polite'}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => {
            swipeStart.current = null;
          }}
        >
          <div {...slideProps(0)}>
            <div role="img" aria-label={g.intro.alt} className="w-full h-full flex flex-col justify-center bg-black">
              {illustration}
            </div>
          </div>
          {SCREENS.map((file, k) => (
            <div key={file} {...slideProps(k + 1)}>
              <picture>
                <source media="(min-width: 640px)" srcSet={`/erp/${file}-desktop.webp`} width={1280} height={800} />
                <img
                  src={`/erp/${file}-mobile.webp`}
                  width={720}
                  height={1558}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  alt={g.slides[k].alt}
                  className="absolute inset-0 w-full h-full object-contain select-none"
                />
              </picture>
            </div>
          ))}
        </div>
      </div>

      {/* Caption + demo-data note (only on real screens), stacked so the row keeps one height */}
      <div className="flex items-start gap-3 mt-4">
        <span className="shrink-0 font-mono text-xs text-red-600 tracking-widest pt-px" aria-hidden="true">
          {pad(index + 1)} / {pad(total)}
        </span>
        <div className="grid flex-1 min-w-0">
          {captions.map((c, i) => (
            <div
              key={i}
              aria-hidden={i !== index}
              className={`col-start-1 row-start-1 ${fade} ${i === index ? 'opacity-100' : 'opacity-0'}`}
            >
              <p className="font-mono text-xs text-gray-300 uppercase tracking-wider leading-relaxed">{c.caption}</p>
              <p className={`font-mono text-[10px] text-gray-600 uppercase tracking-widest mt-1 ${i === 0 ? 'invisible' : ''}`}>
                {g.note}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 mt-3">
        <div className="flex items-center flex-wrap">
          {captions.map((_, i) => (
            <button
              key={i}
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
