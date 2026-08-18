"use client";

import { useRef, useState, useCallback } from "react";
import { MoveHorizontal } from "lucide-react";

/**
 * Драг-слайдер до/после. Работает мышью и тачем. Файлы — /public/detailing/
 * <before/after>.jpg, промпты в DESIGN.md. Пока файлов нет — слайдер всё
 * равно работает, просто видны пустые (тёмные) слои вместо фото.
 */
export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel,
  afterLabel,
}: {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel: string;
  afterLabel: string;
}) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  return (
    <div
      ref={ref}
      className="relative aspect-[16/10] md:aspect-[16/8] w-full select-none overflow-hidden rounded-sm card-depth border border-line cursor-ew-resize bg-asphalt-2"
      onMouseDown={(e) => {
        dragging.current = true;
        updateFromClientX(e.clientX);
      }}
      onMouseMove={(e) => {
        if (dragging.current) updateFromClientX(e.clientX);
      }}
      onMouseUp={() => (dragging.current = false)}
      onMouseLeave={() => (dragging.current = false)}
      onTouchStart={(e) => updateFromClientX(e.touches[0].clientX)}
      onTouchMove={(e) => updateFromClientX(e.touches[0].clientX)}
    >
      {/* After — на всю ширину, снизу */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${afterSrc})` }}
      />
      <span className="absolute bottom-3 right-3 font-mono text-[10px] tracking-wide bg-asphalt/80 text-cream px-2 py-1 rounded-sm pointer-events-none">
        {afterLabel}
      </span>

      {/* Before — обрезается по позиции слайдера, сверху */}
      <div
        className="absolute inset-0 bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `url(${beforeSrc})`,
          clipPath: `inset(0 ${100 - pos}% 0 0)`,
        }}
      />
      <span className="absolute bottom-3 left-3 font-mono text-[10px] tracking-wide bg-asphalt/80 text-cream px-2 py-1 rounded-sm pointer-events-none">
        {beforeLabel}
      </span>

      {/* Разделительная линия + ручка */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-signal pointer-events-none"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-sm bg-signal flex items-center justify-center shadow-lg">
          <MoveHorizontal size={18} className="text-cream" />
        </div>
      </div>
    </div>
  );
}