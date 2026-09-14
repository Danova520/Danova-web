"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { WA_LINK } from "@/lib/constants";
import { chatKnowledgeBase, chatStrings, matchKnowledgeBase } from "@/lib/chatKnowledgeBase";

const CHAT_WA_LINK = `${WA_LINK}?text=Hola%2C%20tengo%20una%20pregunta%20sobre%20DANOVA`;

// Secciones que, al entrar en pantalla, hacen que la mascota senale con un
// pequeno globo de texto. Cada id de seccion mapea a su clave de traduccion.
const MASCOT_SECTIONS = {
  problema: "mascot.problema",
  servicios: "mascot.servicios",
  paquetes: "mascot.paquetes",
  resultados: "mascot.resultados",
  testimonios: "mascot.testimonios",
  proceso: "mascot.proceso",
  contacto: "mascot.contacto",
};

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function ChatWidget() {
  const { lang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [asked, setAsked] = useState(new Set());
  const [inputValue, setInputValue] = useState("");
  const messagesRef = useRef(null);
  const inputRef = useRef(null);

  const strings = chatStrings[lang] || chatStrings.es;

  function scrollToBottom() {
    requestAnimationFrame(() => {
      if (messagesRef.current) {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
      }
    });
  }

  function waLinkHTML() {
    return `<a href="${CHAT_WA_LINK}" target="_blank" rel="noopener">${strings.waCta} →</a>`;
  }

  function addMessage(text, who, isHTML) {
    setMessages((prev) => [...prev, { id: Date.now() + Math.random(), text, who, isHTML: !!isHTML }]);
    scrollToBottom();
  }

  function botReply(text, isHTML) {
    setTyping(true);
    scrollToBottom();
    setTimeout(() => {
      setTyping(false);
      addMessage(text, "bot", isHTML);
    }, 500 + Math.random() * 400);
  }

  function resetChat() {
    setMessages([]);
    setAsked(new Set());
    setTimeout(() => {
      addMessage(strings.greeting, "bot");
    }, 0);
  }

  function handleQuestion(key, label) {
    addMessage(label, "user");
    setAsked((prev) => new Set(prev).add(key));
    const item = chatKnowledgeBase.find((i) => i.key === key);
    const answer = item.a[lang] || item.a.es;
    const needsWa = key === "contacto";
    botReply(answer + (needsWa ? " " + waLinkHTML() : ""), needsWa);
  }

  function handleFreeText() {
    const value = inputValue.trim();
    if (!value) return;
    addMessage(value, "user");
    setInputValue("");
    const match = matchKnowledgeBase(value);
    if (match) {
      setAsked((prev) => new Set(prev).add(match.key));
      const answer = match.a[lang] || match.a.es;
      const needsWa = match.key === "contacto";
      botReply(answer + (needsWa ? " " + waLinkHTML() : ""), needsWa);
    } else {
      botReply(strings.fallback + " " + waLinkHTML(), true);
    }
  }

  function openChat() {
    setOpen(true);
    if (messages.length === 0) resetChat();
    setTimeout(() => inputRef.current?.focus(), 200);
  }

  function closeChat() {
    setOpen(false);
  }

  // Reinicia la conversación visible cuando cambia el idioma, igual que el script original.
  const isFirstLangRender = useRef(true);
  useEffect(() => {
    if (isFirstLangRender.current) {
      isFirstLangRender.current = false;
      return;
    }
    if (messages.length > 0) resetChat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  // --- Mascota del chat launcher: parpadeo y saludo ocasionales, con timing aleatorio. ---
  const [blinking, setBlinking] = useState(false);
  const [waving, setWaving] = useState(false);
  const [mascotTipId, setMascotTipId] = useState(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let blinkTimeout;
    let blinkOffTimeout;
    function scheduleBlink() {
      const delay = 4000 + Math.random() * 2000; // 4-6s
      blinkTimeout = setTimeout(() => {
        setBlinking(true);
        blinkOffTimeout = setTimeout(() => setBlinking(false), 220);
        scheduleBlink();
      }, delay);
    }
    scheduleBlink();
    return () => {
      clearTimeout(blinkTimeout);
      clearTimeout(blinkOffTimeout);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let waveTimeout;
    let waveOffTimeout;
    function scheduleWave() {
      const delay = 15000 + Math.random() * 5000; // 15-20s
      waveTimeout = setTimeout(() => {
        setWaving(true);
        waveOffTimeout = setTimeout(() => setWaving(false), 900);
        scheduleWave();
      }, delay);
    }
    scheduleWave();
    return () => {
      clearTimeout(waveTimeout);
      clearTimeout(waveOffTimeout);
    };
  }, []);

  // Señala secciones clave con un globo de texto cuando entran en pantalla,
  // pero solo la primera vez por visita (no se repite si el usuario vuelve
  // a pasar por la misma sección haciendo scroll arriba y abajo).
  const seenSectionsRef = useRef(new Set());
  useEffect(() => {
    let hideTimeout;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (seenSectionsRef.current.has(entry.target.id)) return;
            seenSectionsRef.current.add(entry.target.id);
            setMascotTipId(entry.target.id);
            clearTimeout(hideTimeout);
            hideTimeout = setTimeout(() => setMascotTipId(null), 4000);
          }
        });
      },
      { threshold: 0.4 }
    );
    Object.keys(MASCOT_SECTIONS).forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => {
      observer.disconnect();
      clearTimeout(hideTimeout);
    };
  }, []);

  const pending = chatKnowledgeBase.filter((item) => !asked.has(item.key));
  const quickList = pending.length ? pending : chatKnowledgeBase;
  const showRestart = !pending.length && asked.size > 0;

  return (
    <>
      <button
        className={`chat-launcher ${blinking ? "blinking" : ""} ${waving ? "waving" : ""}`}
        id="chatLauncher"
        type="button"
        aria-label="Abrir chat de ayuda"
        aria-expanded={open}
        onClick={() => (open ? closeChat() : openChat())}
      >
        <svg className="mascot-svg" viewBox="0 0 64 74" aria-hidden="true">
          <defs>
            {/* Metal dorado: luz arriba-izquierda, sombra abajo-derecha -- da volumen sin ser 3D real. */}
            <linearGradient id="mascotGradMetal" x1="0%" y1="0%" x2="35%" y2="100%">
              <stop offset="0%" stopColor="#D6B36E" />
              <stop offset="45%" stopColor="#C6A15B" />
              <stop offset="100%" stopColor="#8E7642" />
            </linearGradient>
            {/* Visor: acento teal, como una luz encendida */}
            <radialGradient id="mascotGradVisor" cx="35%" cy="35%" r="75%">
              <stop offset="0%" stopColor="#5C8B7C" />
              <stop offset="55%" stopColor="#3C5C55" />
              <stop offset="100%" stopColor="#213B35" />
            </radialGradient>
            {/* Articulaciones (hombros, cuello, cintura): remaches oscuros con un pequeno brillo */}
            <radialGradient id="mascotGradJoint" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#8E7642" />
              <stop offset="60%" stopColor="#3A2F22" />
              <stop offset="100%" stopColor="#15120E" />
            </radialGradient>
          </defs>

          {/* Antena */}
          <line x1="32" y1="10" x2="32" y2="4" stroke="url(#mascotGradMetal)" strokeWidth="1.6" strokeLinecap="round" />
          <rect
            className="mascot-antenna-dot"
            x="30.5" y="1.5" width="3" height="3"
            transform="rotate(45 32 3)"
            fill="url(#mascotGradMetal)"
          />

          {/* Cabeza: octogono con volumen metalico */}
          <polygon
            points="22,10 42,10 50,18 50,30 42,38 22,38 14,30 14,18"
            fill="url(#mascotGradMetal)" stroke="#8E7642" strokeWidth="1.2"
          />

          {/* Visor (ojos): ranura con brillo teal, parpadea */}
          <rect className="mascot-eye" x="20" y="20" width="24" height="8" rx="2" fill="url(#mascotGradVisor)" stroke="#213B35" strokeWidth="1" />
          <ellipse cx="26" cy="22.5" rx="2.2" ry="1.1" fill="#EAF2EE" opacity="0.5" />

          {/* Cuello: articulacion */}
          <circle cx="32" cy="42" r="4" fill="url(#mascotGradJoint)" stroke="#100D09" strokeWidth="0.8" />

          {/* Cuerpo: hexagono con volumen metalico */}
          <polygon
            points="18,46 46,46 50,54 46,64 18,64 14,54"
            fill="url(#mascotGradMetal)" stroke="#8E7642" strokeWidth="1.2"
          />
          {/* Linea de panel, detalle de superficie mecanica */}
          <path d="M22 50 L42 50" stroke="#100D09" strokeWidth="1" strokeLinecap="round" opacity="0.5" fill="none" />

          {/* Hombros: articulaciones */}
          <circle cx="14" cy="49" r="3.5" fill="url(#mascotGradJoint)" stroke="#100D09" strokeWidth="0.7" />
          <circle cx="50" cy="49" r="3.5" fill="url(#mascotGradJoint)" stroke="#100D09" strokeWidth="0.7" />

          {/* Brazo izquierdo, fijo, quebrado en angulo */}
          <path d="M14 49 6 51 4 60" stroke="url(#mascotGradMetal)" strokeWidth="3.4" strokeLinecap="round" fill="none" />
          {/* Brazo derecho, saluda */}
          <path className="mascot-arm-wave" d="M50 49 58 51 60 60" stroke="url(#mascotGradMetal)" strokeWidth="3.4" strokeLinecap="round" fill="none" />

          {/* Cintura / cadera: articulaciones */}
          <circle cx="24" cy="64" r="3" fill="url(#mascotGradJoint)" stroke="#100D09" strokeWidth="0.6" />
          <circle cx="40" cy="64" r="3" fill="url(#mascotGradJoint)" stroke="#100D09" strokeWidth="0.6" />

          {/* Piernas */}
          <path d="M24 64 21 71" stroke="url(#mascotGradMetal)" strokeWidth="3.4" strokeLinecap="round" fill="none" />
          <path d="M40 64 43 71" stroke="url(#mascotGradMetal)" strokeWidth="3.4" strokeLinecap="round" fill="none" />
        </svg>
      </button>

      {mascotTipId && MASCOT_SECTIONS[mascotTipId] && !open && (
        <div className="mascot-tooltip" aria-hidden="true">
          <div className="mascot-tooltip-bubble">{t(MASCOT_SECTIONS[mascotTipId])}</div>
        </div>
      )}

      <div className={`chat-panel ${open ? "open" : ""}`} id="chatPanel" role="dialog" aria-label="Chat de ayuda DANOVA">
        <div className="chat-header">
          <div className="chat-title">
            <div className="chat-avatar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="5" r="2" fill="currentColor" stroke="none" />
              </svg>
            </div>
            <div>
              <div className="chat-name">{strings.name}</div>
              <div className="chat-status">{strings.status}</div>
            </div>
          </div>
          <button className="chat-close" id="chatClose" type="button" aria-label="Cerrar chat" onClick={closeChat}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="chat-messages" id="chatMessages" ref={messagesRef}>
          {messages.map((m) =>
            m.isHTML ? (
              <div key={m.id} className={`chat-msg ${m.who}`} dangerouslySetInnerHTML={{ __html: m.text }} />
            ) : (
              <div key={m.id} className={`chat-msg ${m.who}`}>
                {m.text}
              </div>
            )
          )}
          {typing && (
            <div className="chat-typing">
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
        </div>

        <div className="chat-quick" id="chatQuick">
          {showRestart && (
            <button
              className="chat-chip"
              type="button"
              onClick={() => setAsked(new Set())}
            >
              {strings.restart}
            </button>
          )}
          {quickList.map((item) => (
            <button
              key={item.key}
              className="chat-chip"
              type="button"
              onClick={() => handleQuestion(item.key, item.q[lang] || item.q.es)}
            >
              {item.q[lang] || item.q.es}
            </button>
          ))}
        </div>

        <div className="chat-input-row">
          <input
            type="text"
            id="chatInput"
            placeholder={strings.placeholder}
            autoComplete="off"
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleFreeText();
            }}
          />
          <button className="chat-send" id="chatSend" type="button" aria-label="Enviar" onClick={handleFreeText}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 12h16M14 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
