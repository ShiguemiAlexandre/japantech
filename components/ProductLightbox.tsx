import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

/**
 * Full-screen viewer for the jAPPa ERP screenshots (opened from ProductCarousel).
 * Modal dialog: focus moves in, Tab is trapped, focus is returned by the caller on close.
 * Esc closes, ←/→ navigate, swipe on touch, and a click outside the image closes it.
 * Large images (`-large.webp`) are only requested while the dialog is open: the desktop print on
 * wide landscape screens and the phone print on narrow/portrait ones. The neighbours are
 * preloaded after the current image is shown.
 */
type Labels = { dialog: string; close: string; prev: string; next: string; note: string };

const LARGE_MEDIA = '(min-width: 640px) and (orientation: landscape)';
const largeSrc = (file: string, desktop: boolean) => `/erp/${file}-${desktop ? 'desktop' : 'mobile'}-large.webp`;

const ProductLightbox: React.FC<{
  files: readonly string[];
  items: { caption: string; alt: string }[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
  labels: Labels;
}> = ({ files, items, index, onIndex, onClose, labels }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const total = files.length;
  // Chosen in JS rather than with <picture>: React sets `src` before the <img> is attached, so a
  // <picture> fallback would download the phone print too. Only rendered client-side.
  const [desktop, setDesktop] = useState(() => window.matchMedia(LARGE_MEDIA).matches);
  useEffect(() => {
    const mq = window.matchMedia(LARGE_MEDIA);
    const update = () => setDesktop(mq.matches);
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  const go = (i: number) => onIndex(((i % total) + total) % total);

  // Lock body scroll (compensating the scrollbar width) and focus the close button.
  useEffect(() => {
    const { overflow, paddingRight } = document.body.style;
    const sb = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (sb > 0) document.body.style.paddingRight = `${sb}px`;
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, []);

  // Esc / arrows / focus trap.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        go(index + (e.key === 'ArrowRight' ? 1 : -1));
      } else if (e.key === 'Tab') {
        const f = dialogRef.current?.querySelectorAll<HTMLElement>('button');
        if (!f || !f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        const inside = dialogRef.current!.contains(document.activeElement);
        if (e.shiftKey && (document.activeElement === first || !inside)) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && (document.activeElement === last || !inside)) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  });

  // Preload the neighbours in the size this screen will use.
  useEffect(() => {
    for (const d of [1, -1]) new Image().src = largeSrc(files[(index + d + total) % total], desktop);
  }, [index, files, total, desktop]);

  const swiped = useRef(false);
  const onPointerDown = (e: React.PointerEvent) => {
    swiped.current = false;
    if (e.pointerType !== 'mouse') swipeStart.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const s = swipeStart.current;
    swipeStart.current = null;
    if (!s) return;
    const dx = e.clientX - s.x;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(e.clientY - s.y)) {
      swiped.current = true;
      go(index + (dx < 0 ? 1 : -1));
    }
  };
  // A click outside the visible picture closes (including the letterbox of the object-contain
  // <img>); clicks on the picture itself or on a control do not, and neither does a swipe.
  const onBackdropClick = (e: React.MouseEvent) => {
    if (swiped.current) return;
    const el = e.target as HTMLElement;
    if (el === e.currentTarget) return onClose();
    if (el instanceof HTMLImageElement && el.naturalWidth) {
      const r = el.getBoundingClientRect();
      const k = Math.min(r.width / el.naturalWidth, r.height / el.naturalHeight);
      const w = el.naturalWidth * k;
      const h = el.naturalHeight * k;
      const x = e.clientX - (r.left + (r.width - w) / 2);
      const y = e.clientY - (r.top + (r.height - h) / 2);
      if (x < 0 || y < 0 || x > w || y > h) onClose();
    }
  };

  const pad = (n: number) => String(n).padStart(2, '0');
  const btn =
    'inline-flex items-center justify-center w-11 h-11 border border-white/20 bg-black/70 text-gray-200 hover:text-white hover:border-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 transition-colors';
  const item = items[index];

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={labels.dialog}
      className="fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between gap-4 px-4 sm:px-6 h-16 shrink-0">
        <span className="font-mono text-xs text-red-600 tracking-widest" aria-hidden="true">
          {pad(index + 1)} / {pad(total)}
        </span>
        <button ref={closeRef} type="button" onClick={onClose} aria-label={labels.close} className={btn}>
          <X className="w-5 h-5" />
        </button>
      </div>

      <div
        className="relative flex-1 min-h-0 px-2 sm:px-20 touch-pan-y"
        onClick={onBackdropClick}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <img
          src={largeSrc(files[index], desktop)}
          width={desktop ? 1600 : 780}
          height={desktop ? 1000 : 1688}
          decoding="async"
          draggable={false}
          alt={item.alt}
          className="absolute inset-y-0 left-1/2 -translate-x-1/2 h-full w-[calc(100%-1rem)] sm:w-[calc(100%-10rem)] object-contain select-none"
        />
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label={labels.prev}
          className={`${btn} absolute left-2 sm:left-5 top-1/2 -translate-y-1/2`}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label={labels.next}
          className={`${btn} absolute right-2 sm:right-5 top-1/2 -translate-y-1/2`}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="shrink-0 px-4 sm:px-6 py-4 text-center" aria-live="polite">
        <p className="font-mono text-xs sm:text-sm text-gray-200 uppercase tracking-wider">{item.caption}</p>
        <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mt-1">{labels.note}</p>
      </div>
    </div>,
    document.body,
  );
};

export default ProductLightbox;
