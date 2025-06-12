import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const banners = [
  {
    src: '/images/gh_banner.jpg',
    url: 'https://github.com',
  },
  {
    src: '/images/aws_banner.jpg',
    url: 'https://laravel.com',
  },
  {
    src: '/images/ovh_banner.jpg',
    url: 'https://react.dev',
  },
];

export default function BannerCarousel() {
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prev) => (prev + 1) % banners.length);
  };

  const prev = () => {
    setIndex((prev) =>
      (prev - 1 + banners.length) % banners.length
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-4xl mx-auto mb-10 rounded-xl overflow-hidden">
      <a href={banners[index].url} target="_blank" rel="noopener noreferrer">
        <img
          src={banners[index].src}
          alt={`banniere-${index}`}
          className="w-full h-64 object-cover rounded-xl shadow hover:opacity-90 transition"
        />
      </a>

      <button
        onClick={prev}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 p-2 rounded-full"
      >
        <ChevronLeft className="text-white" />
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 p-2 rounded-full"
      >
        <ChevronRight className="text-white" />
      </button>
    </div>
  );
}
