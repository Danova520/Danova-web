"use client";

import { useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export function StoryDoor() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const animatingRef = useRef(false);

  function handleClick() {
    if (animatingRef.current) return;
    animatingRef.current = true;
    setOpen(true);

    setTimeout(() => {
      const target = document.getElementById("nosotros");
      if (target) {
        const headerOffset = 90;
        const top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 550);

    setTimeout(() => {
      setOpen(false);
      animatingRef.current = false;
    }, 2600);
  }

  return (
    <button
      className={`story-door ${open ? "open" : ""}`}
      id="storyDoor"
      type="button"
      aria-label="Abrir la historia de Dennis Alemán y Abel David Núñez"
      onClick={handleClick}
    >
      <span className="door-frame">
        <span className="door-glow"></span>
        <span className="door-panel door-panel-l"></span>
        <span className="door-panel door-panel-r"></span>
      </span>
      <span className="door-label">{t("door.label")}</span>
    </button>
  );
}
