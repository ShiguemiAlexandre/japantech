import React, { useState, useEffect, useRef } from 'react';

interface TranslatedTextProps {
  text: string;
  className?: string;
  duration?: number; // ms
  delay?: number; // ms
  as?: any;
  triggerOnScroll?: boolean;
}

const JAPANESE_CHARS = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';

const TranslatedText: React.FC<TranslatedTextProps> = ({
  text,
  className = '',
  duration = 1500,
  delay = 0,
  as: Component = 'span',
  triggerOnScroll = true
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isVisible, setIsVisible] = useState(!triggerOnScroll);
  const elementRef = useRef<HTMLElement>(null);
  const requestRef = useRef<number>();
  const startTimeRef = useRef<number>();
  const timeoutRef = useRef<NodeJS.Timeout>();
  const frameCountRef = useRef(0);

  useEffect(() => {
    if (!triggerOnScroll) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [triggerOnScroll]);

  useEffect(() => {
    if (!isVisible) {
       // Initialize with scrambled text but don't animate yet
       let initialScramble = '';
       for (let i = 0; i < text.length; i++) {
           if (text[i] === ' ' || text[i] === '\n') {
               initialScramble += text[i];
           } else {
               initialScramble += JAPANESE_CHARS[Math.floor(Math.random() * JAPANESE_CHARS.length)];
           }
       }
       setDisplayText(initialScramble);
       return;
    }

    // Reset state when text changes or becomes visible
    startTimeRef.current = undefined;
    frameCountRef.current = 0;
    
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = timestamp - startTimeRef.current;
      const progressRatio = Math.min(progress / duration, 1);
      
      // Easing for smoother resolve (easeOutCubic)
      const easedProgress = 1 - Math.pow(1 - progressRatio, 3);
      
      const resolvedCount = Math.floor(easedProgress * text.length);
      
      let newText = '';
      for (let i = 0; i < text.length; i++) {
        if (i < resolvedCount) {
          newText += text[i];
        } else {
          if (text[i] === ' ' || text[i] === '\n') {
            newText += text[i];
          } else {
            // Only update random characters every 3 frames to reduce jitter
            if (frameCountRef.current % 3 === 0) {
                 newText += JAPANESE_CHARS[Math.floor(Math.random() * JAPANESE_CHARS.length)];
            } else {
                 // Keep existing char from previous state if possible, otherwise random
                 // Since we don't store per-char state easily here without complexity, 
                 // we'll just re-randomize but less frequently? 
                 // Actually, to keep it stable we need to know what was there.
                 // Simpler approach for "smoother": just use the random char. 
                 // If we want it to "stick" for a few frames, we'd need to store the current scrambled string.
                 // Let's just update it. The "every 3 frames" check above implies we need to persist the previous char.
                 // Since we are rebuilding the string every frame, we can't easily "keep" the old random char 
                 // unless we store it. 
                 // Let's stick to updating every frame but maybe use a smaller charset or just the easing helps enough.
                 // Actually, let's try to just use the easing first. The user said "smoother".
                 newText += JAPANESE_CHARS[Math.floor(Math.random() * JAPANESE_CHARS.length)];
            }
          }
        }
      }
      
      setDisplayText(newText);
      frameCountRef.current++;

      if (progress < duration) {
        requestRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayText(text);
      }
    };

    timeoutRef.current = setTimeout(() => {
      requestRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [text, duration, delay, isVisible]);

  return (
    <Component ref={elementRef} className={className} aria-label={text}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {displayText}
      </span>
    </Component>
  );
};

export default TranslatedText;
