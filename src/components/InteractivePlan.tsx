"use client";

import { useState, useRef, useEffect, useLayoutEffect } from "react";

type Hotspot = {
  id: string;
  x: number; // percentage (0-100)
  y: number; // percentage (0-100)
  label?: string;
  description?: string;
};

// Calcular el área visible real de la imagen con object-contain
function getImageVisibleRect(img: HTMLImageElement, container: HTMLDivElement) {
  const containerRect = container.getBoundingClientRect();
  const imgNaturalRatio = img.naturalWidth / img.naturalHeight;
  const containerRatio = containerRect.width / containerRect.height;

  let visibleWidth: number;
  let visibleHeight: number;
  let offsetX: number;
  let offsetY: number;

  if (containerRatio > imgNaturalRatio) {
    // Contenedor más ancho: letterbox a los lados
    visibleHeight = containerRect.height;
    visibleWidth = visibleHeight * imgNaturalRatio;
    offsetX = (containerRect.width - visibleWidth) / 2;
    offsetY = 0;
  } else {
    // Contenedor más alto: letterbox arriba/abajo
    visibleWidth = containerRect.width;
    visibleHeight = visibleWidth / imgNaturalRatio;
    offsetX = 0;
    offsetY = (containerRect.height - visibleHeight) / 2;
  }

  return {
    left: offsetX,
    top: offsetY,
    width: visibleWidth,
    height: visibleHeight,
  };
}

export default function InteractivePlan({
  image = "/images/Plano%20de%20Ventas%20BDLP-Modelo.webp",
  hotspots = [],
}: {
  image?: string;
  hotspots?: Hotspot[];
}) {
  const [active, setActive] = useState<null | string>(null);
  const [scale, setScale] = useState(5.0);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const lastDistanceRef = useRef(0);
  const [localHotspots, setLocalHotspots] = useState<Hotspot[]>(hotspots || []);
  const [imageRect, setImageRect] = useState<{ left: number; top: number; width: number; height: number } | null>(null);

  const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

  // Wheel zoom
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const MAX_SCALE = 8;
    const handler = (e: WheelEvent) => {
      e.preventDefault();
      const delta = -e.deltaY * 0.0018;
      setScale((s) => clamp(+((s + delta).toFixed(3)), 1.0, MAX_SCALE));
    };

    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler as any);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    const el = containerRef.current;
    if (!el) return;
    (e.target as Element).setPointerCapture(e.pointerId);
    draggingRef.current = true;
    lastPosRef.current.x = e.clientX;
    lastPosRef.current.y = e.clientY;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - lastPosRef.current.x;
    const dy = e.clientY - lastPosRef.current.y;
    lastPosRef.current.x = e.clientX;
    lastPosRef.current.y = e.clientY;
    setTranslate((t) => ({ x: t.x + dx, y: t.y + dy }));
  };

  const onPointerUp = (e: React.PointerEvent) => {
    try { (e.target as Element).releasePointerCapture(e.pointerId); } catch {}
    draggingRef.current = false;
  };

  // Pinch zoom para móviles
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const MAX_SCALE = 8;
    const MIN_SCALE = 1.0;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        lastDistanceRef.current = Math.sqrt(dx * dx + dy * dy);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (lastDistanceRef.current > 0) {
          const delta = (distance - lastDistanceRef.current) * 0.01;
          setScale((s) => clamp(s + delta, MIN_SCALE, MAX_SCALE));
        }
        
        lastDistanceRef.current = distance;
      }
    };

    el.addEventListener('touchstart', handleTouchStart, { passive: false });
    el.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    return () => {
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  // Shift+click para agregar hotspot
  const onClick = (e: React.MouseEvent) => {
    if (!contentRef.current || !imgRef.current || !imageRect) return;
    if (e.shiftKey) {
      const container = containerRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const clickX = e.clientX - containerRect.left;
      const clickY = e.clientY - containerRect.top;

      // Convertir a coordenadas relativas a la imagen visible
      const relX = ((clickX - imageRect.left) / imageRect.width) * 100;
      const relY = ((clickY - imageRect.top) / imageRect.height) * 100;

      const id = `pt-${Date.now()}`;
      const newHot: Hotspot = { id, x: +relX.toFixed(2), y: +relY.toFixed(2), label: id, description: "Nueva" };
      setLocalHotspots((s) => [...s, newHot]);
      fetch('/api/plan-hotspots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newHot),
      }).catch((err) => {
        // eslint-disable-next-line no-console
        console.error('SAVE_ERR', err);
      });
      return;
    }
    setActive(null);
  };

  // Cargar hotspots del servidor
  useEffect(() => {
    let mounted = true;
    fetch('/api/plan-hotspots')
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        if (Array.isArray(data)) {
          setLocalHotspots((cur) => {
            const map = new Map(cur.map((h) => [h.id, h]));
            data.forEach((d: any) => map.set(d.id, d));
            return Array.from(map.values());
          });
        }
      })
      .catch(() => {});
    return () => { mounted = false; };
  }, []);

  // Calcular el área visible de la imagen
  useLayoutEffect(() => {
    const compute = () => {
      const container = containerRef.current;
      const img = imgRef.current;
      if (!container || !img || !img.naturalWidth) return;

      const rect = getImageVisibleRect(img, container);
      setImageRect(rect);
    };

    compute();

    const img = imgRef.current;
    if (img && !img.complete) {
      img.addEventListener('load', compute);
    }

    const ro = new ResizeObserver(compute);
    if (containerRef.current) ro.observe(containerRef.current);

    window.addEventListener('resize', compute);

    return () => {
      if (img) img.removeEventListener('load', compute);
      ro.disconnect();
      window.removeEventListener('resize', compute);
    };
  }, [scale, translate]);

  return (
    <div
      ref={containerRef}
      className="interactive-plan w-full rounded-lg overflow-hidden relative bg-white"
      style={{
        height: "70vh",
        maxHeight: "800px",
        minHeight: "400px",
        touchAction: "none",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onClick={onClick}
    >
      {/* Contenedor transformado que incluye imagen Y hotspots juntos */}
      <div
        ref={contentRef}
        className="w-full h-full relative"
        style={{
          transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
          transformOrigin: "center center",
          transition: draggingRef.current ? "none" : "transform 0.12s ease-out",
        }}
      >
        <img ref={imgRef} src={image} alt="Plano interactivo" className="w-full h-full object-contain" />
        
        {/* Hotspots posicionados sobre el área visible de la imagen */}
        {imageRect && localHotspots.map((h) => {
          const left = imageRect.left + (h.x / 100) * imageRect.width;
          const top = imageRect.top + ((h.y - 1) / 100) * imageRect.height;
          
          return (
            <div
              key={h.id}
              className="absolute"
              style={{
                left: `${left}px`,
                top: `${top}px`,
                transform: 'translate(-50%, -50%)',
              }}
            >
            <button
              className="plan-hotspot"
              onClick={(ev) => {
                ev.stopPropagation();
                setActive((cur) => (cur === h.id ? null : h.id));
              }}
              aria-label={h.label ?? "Hotspot"}
            />
            {active === h.id && (
              <div
                className="plan-tooltip"
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '-75px',
                  transform: 'translateX(-50%)',
                  zIndex: 1000,
                }}
              >
                <strong className="block text-sm font-semibold mb-1" style={{
                  whiteSpace: 'normal',
                  lineHeight: '1.3',
                  maxWidth: '140px',
                }}>{h.label}</strong>
                <span className="text-xs block">{h.description}</span>
                <div className="mt-2">
                  <a
                    className="text-xs text-blue-600 underline"
                    href="/admin/plan-hotspots"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Editar
                  </a>
                </div>
              </div>
            )}
          </div>
        );
        })}
      </div>

      {/* Controles de UI fijos (no se transforman) */}
      <div className="absolute right-3 top-3 bg-white/80 text-sm text-gray-700 px-3 py-1 rounded pointer-events-none z-10">
        Zoom: {Math.round(scale * 100)}%
      </div>
      
      {/* Controles de zoom para móviles */}
      <div className="absolute bottom-3 right-3 flex flex-col gap-2 z-10">
        <button
          className="bg-white/90 hover:bg-white text-gray-700 w-10 h-10 rounded-full shadow-lg flex items-center justify-center font-bold text-xl"
          onClick={(e) => {
            e.stopPropagation();
            setScale((s) => clamp(s + 0.3, 1.0, 8));
          }}
          aria-label="Aumentar zoom"
        >
          +
        </button>
        <button
          className="bg-white/90 hover:bg-white text-gray-700 w-10 h-10 rounded-full shadow-lg flex items-center justify-center font-bold text-xl"
          onClick={(e) => {
            e.stopPropagation();
            setScale((s) => clamp(s - 0.3, 1.0, 8));
          }}
          aria-label="Reducir zoom"
        >
          −
        </button>
        <button
          className="bg-white/90 hover:bg-white text-gray-700 w-10 h-10 rounded-full shadow-lg flex items-center justify-center text-xs"
          onClick={(e) => {
            e.stopPropagation();
            setScale(5.0);
            setTranslate({ x: 0, y: 0 });
          }}
          aria-label="Restablecer vista"
        >
          ⟲
        </button>
      </div>
    </div>
  );
}
