"use client";

import { useEffect, useRef } from "react";

// Punto dorado que sigue al cursor, solo en escritorio (hover fino disponible).
// No se activa en móvil/touch: ahí no tiene sentido y se deja el comportamiento nativo.
export function CustomCursor() {
  const dotRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mq.matches) return;

    const dot = dotRef.current;
    document.documentElement.classList.add("custom-cursor-active");

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { ...target };
    let rafId;

    function tick() {
      current.x += (target.x - current.x) * 0.22;
      current.y += (target.y - current.y) * 0.22;
      dot.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      rafId = requestAnimationFrame(tick);
    }

    function handleMove(e) {
      target.x = e.clientX;
      target.y = e.clientY;
      dot.style.opacity = "1";
    }
    function handleLeave() {
      dot.style.opacity = "0";
    }

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="gold-cursor" ref={dotRef} aria-hidden="true">
      <span className="gold-cursor-dot"></span>
    </div>
  );
}
