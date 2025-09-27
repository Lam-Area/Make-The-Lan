// resources/js/Components/BannerCarousel.jsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const banners = [
  { src: '/images/gh_banner.jpg',  url: 'https://github.com'   },
  { src: '/images/htb_banner.jpg', url: 'https://www.hackthebox.com/'  },
  { src: '/images/ovh_banner.jpg', url: 'https://www.ovhcloud.com/de/'  },
];

export default function BannerCarousel() {
  // Duplique en tête/queue pour boucler sans flash
  const slides = useMemo(() => {
    if (!banners.length) return [];
    const first = banners[0], last = banners[banners.length - 1];
    return [last, ...banners, first];
  }, []);

  const [index, setIndex] = useState(1);       // commence sur le 1er “vrai” slide
  const [anim, setAnim] = useState(true);      // active la transition CSS
  const [paused, setPaused] = useState(false); // pause au survol
  const animatingRef = useRef(false);
  const autoplayMs = 5000;

  const realIdx = banners.length
    ? (index - 1 + banners.length) % banners.length
    : 0;

  const goTo = (i) => {
    if (animatingRef.current) return;
    animatingRef.current = true;
    setAnim(true);
    setIndex(i);
  };

  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  // Autoplay
  useEffect(() => {
    if (paused || !banners.length) return;
    const t = setInterval(next, autoplayMs);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, index, banners.length]);

  // Bouclage “invisible” en fin/début de track
  const onTransitionEnd = () => {
    animatingRef.current = false;
    if (index === slides.length - 1) {
      // fin -> saute sans transition au 1
      setAnim(false);
      setIndex(1);
      requestAnimationFrame(() => {
        // réactive la transition pour le prochain mouvement
        setAnim(true);
      });
    } else if (index === 0) {
      // début -> saute sans transition au dernier réel
      setAnim(false);
      setIndex(slides.length - 2);
      requestAnimationFrame(() => setAnim(true));
    }
  };

  // Aller à un point précis (depuis les bullets)
  const gotoDot = (i) => goTo(i + 1); // +1 car offset (slide 0 = clone fin)

  return (
    <div
      className="relative w-full mx-auto mb-10 overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Track */}
      <div
        className={`flex h-64 sm:h-72 lg:h-80 select-none ${anim ? 'transition-transform duration-700 ease-[cubic-bezier(.22,.61,.36,1)]' : ''}`}
        style={{ transform: `translateX(-${index * 100}%)` }}
        onTransitionEnd={onTransitionEnd}
      >
        {slides.map((s, i) => (
          <a
            key={`${s.src}-${i}`}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative block h-full w-full flex-none basis-full"
            aria-label={`Bannière ${i}`}
          >
            <img
              src={s.src}
              alt=""
              className="h-full w-full object-cover"
              loading={i === index ? 'eager' : 'lazy'}
              draggable="false"
            />
            {/* voile et bords dégradés pour un rendu plus “hero” */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/30 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black/30 to-transparent" />
          </a>
        ))}
      </div>

      {/* Flèches */}
      <button
        onClick={prev}
        aria-label="Slide précédent"
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/35 p-2 ring-1 ring-white/15 backdrop-blur hover:bg-black/50"
      >
        <ChevronLeft className="h-5 w-5 text-white" />
      </button>
      <button
        onClick={next}
        aria-label="Slide suivant"
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/35 p-2 ring-1 ring-white/15 backdrop-blur hover:bg-black/50"
      >
        <ChevronRight className="h-5 w-5 text-white" />
      </button>

      {/* Bullets */}
      <div className="pointer-events-none absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => gotoDot(i)}
            className={`pointer-events-auto h-2 w-2 rounded-full transition ${
              realIdx === i ? 'bg-emerald-400 scale-110' : 'bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Aller au slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
