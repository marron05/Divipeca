import React from 'react';
import { Play } from 'lucide-react';

const YOUTUBE_VIDEO_ID = 'qkCkLu42cvA';

const YOUTUBE_EMBED_SRC = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?controls=1&autoplay=0&rel=0&playsinline=1`;

export const VideoSection: React.FC = () => {
  return (
    <section
      id="video"
      className="py-20 sm:py-24 bg-white border-t border-neutral-200/80 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-10 sm:mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#1B5E20] mb-2.5 flex items-center gap-2">
            <Play className="w-3.5 h-3.5" />
            <span>Operación DIVIPECA · Recorrido audiovisual</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 mb-3 text-balance">
            Video institucional
          </h2>

          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
            Conozca nuestras instalaciones de almacenamiento, flota propia y operación logística regional.
          </p>
        </div>

        {/* Responsive 16:9 Video Frame */}
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-2 sm:p-3 shadow-xs">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-neutral-950">
            <iframe
              src={YOUTUBE_EMBED_SRC}
              title="Video institucional DIVIPECA"
              className="absolute inset-0 w-full h-full border-0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
