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
    setFarewell(true);
    setOpen(false);
    setTimeout(() => setFarewell(false), 900);
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
  // --- Expresiones ligadas al estado real del chat ---
  const [farewell, setFarewell] = useState(false);
  const [explaining, setExplaining] = useState(false);
  const prevTypingRef = useRef(false);

  // "Explica": justo cuando el bot termina de "escribir" y aparece su mensaje
  // (transicion typing true -> false), gesticula un momento y vuelve a su
  // estado normal.
  useEffect(() => {
    if (prevTypingRef.current && !typing) {
      setExplaining(true);
      const timer = setTimeout(() => setExplaining(false), 1800);
      prevTypingRef.current = typing;
      return () => clearTimeout(timer);
    }
    prevTypingRef.current = typing;
  }, [typing]);

  // Estado visual derivado del estado real del chat (no se guarda aparte,
  // se recalcula en cada render a partir de lo que ya existe).
  const mascotState = farewell
    ? "despedida"
    : !open
    ? "idle"
    : typing
    ? "pensativo"
    : explaining
    ? "explica"
    : inputValue.trim().length > 0
    ? "escucha"
    : "feliz";

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
        className={`chat-launcher state-${mascotState} ${blinking ? "blinking" : ""} ${waving ? "waving" : ""}`}
        id="chatLauncher"
        type="button"
        aria-label="Abrir chat de ayuda"
        aria-expanded={open}
        onClick={() => (open ? closeChat() : openChat())}
      >
        <svg className="mascot-svg" viewBox="0 0 72 84" aria-hidden="true">
          <defs>
            {/* Metal dorado: luz arriba-izquierda, sombra abajo-derecha -- da volumen sin ser 3D real. */}
            <linearGradient id="mascotGradMetal" x1="0%" y1="0%" x2="35%" y2="100%">
              <stop offset="0%" stopColor="#D6B36E" />
              <stop offset="45%" stopColor="#C6A15B" />
              <stop offset="100%" stopColor="#8E7642" />
            </linearGradient>
            {/* Ojos: acento teal, como una luz encendida */}
            <radialGradient id="mascotGradVisor" cx="35%" cy="30%" r="75%">
              <stop offset="0%" stopColor="#5C8B7C" />
              <stop offset="55%" stopColor="#3C5C55" />
              <stop offset="100%" stopColor="#213B35" />
            </radialGradient>
            {/* Articulaciones (hombros, cuello): remaches oscuros con un pequeno brillo */}
            <radialGradient id="mascotGradJoint" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#8E7642" />
              <stop offset="60%" stopColor="#3A2F22" />
              <stop offset="100%" stopColor="#15120E" />
            </radialGradient>
            {/* Resplandor suave detras de la cabeza, para dar sensacion de volumen "premium" */}
            <radialGradient id="mascotGradGlow" cx="50%" cy="45%" r="55%">
              <stop offset="0%" stopColor="#D6B36E" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#D6B36E" stopOpacity="0" />
            </radialGradient>
            {/* Cuerpo principal: negro/gris muy oscuro (--ink/--bg), con un
                matiz calido tenue en la zona de luz para dar volumen sin
                que el dorado domine el color del robot. */}
            <linearGradient id="mascotGradBody" x1="0%" y1="0%" x2="35%" y2="100%">
              <stop offset="0%" stopColor="#3A2F22" />
              <stop offset="40%" stopColor="#1B1611" />
              <stop offset="100%" stopColor="#15120E" />
            </linearGradient>
          </defs>

          {/* Resplandor de fondo */}
          <ellipse cx="36" cy="28" rx="24" ry="20" fill="url(#mascotGradGlow)" />

          {/* Antena */}
          <line x1="36" y1="10" x2="36" y2="4" stroke="url(#mascotGradMetal)" strokeWidth="1.8" strokeLinecap="round" />
          <circle className="mascot-antenna-dot" cx="36" cy="3" r="2" fill="url(#mascotGradMetal)" />

          {/* Cabeza: redondeada, no angular. Relleno negro con volumen; el
              dorado queda solo en el contorno, como un filo de luz. */}
          <rect x="14" y="8" width="44" height="40" rx="20" ry="20" fill="url(#mascotGradBody)" stroke="url(#mascotGradMetal)" strokeWidth="1.2" />

          {/* Ojos grandes (estado por defecto): parpadean, se abren mas al "escuchar",
              miran hacia arriba al "pensar" */}
          <ellipse className="mascot-eye-main" cx="27" cy="27" rx="5" ry="6" fill="url(#mascotGradVisor)" stroke="url(#mascotGradMetal)" strokeWidth="1" />
          <ellipse className="mascot-eye-main" cx="45" cy="27" rx="5" ry="6" fill="url(#mascotGradVisor)" stroke="url(#mascotGradMetal)" strokeWidth="1" />
          <ellipse cx="25.3" cy="24.5" rx="1.3" ry="1.6" fill="#EAF2EE" opacity="0.6" />
          <ellipse cx="43.3" cy="24.5" rx="1.3" ry="1.6" fill="#EAF2EE" opacity="0.6" />

          {/* Ojos entornados y sonrientes (solo despedida) */}
          <path className="mascot-eye-arc" d="M22 27 Q27 21 32 27" stroke="url(#mascotGradMetal)" strokeWidth="2.4" strokeLinecap="round" fill="none" />
          <path className="mascot-eye-arc" d="M40 27 Q45 21 50 27" stroke="url(#mascotGradMetal)" strokeWidth="2.4" strokeLinecap="round" fill="none" />

          {/* Boca: sonrisa que crece/encoge segun el estado */}
          <path className="mascot-mouth-line" d="M28 40 Q36 45 44 40" stroke="url(#mascotGradMetal)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          {/* Boca pensativa: raya pequena (solo pensativo) */}
          <rect className="mascot-mouth-dash" x="32" y="40.5" width="8" height="2.2" rx="1.1" fill="url(#mascotGradJoint)" />

          {/* Puntos de "pensando" (solo pensativo) */}
          <circle className="mascot-think-dot mascot-think-dot-1" cx="60" cy="16" r="2" fill="url(#mascotGradMetal)" />
          <circle className="mascot-think-dot mascot-think-dot-2" cx="55" cy="9" r="1.6" fill="url(#mascotGradMetal)" />
          <circle className="mascot-think-dot mascot-think-dot-3" cx="63" cy="6" r="1.2" fill="url(#mascotGradMetal)" />

          {/* Cuello: articulacion */}
          <rect x="30" y="48" width="12" height="6" rx="3" fill="url(#mascotGradJoint)" />

          {/* Cuerpo: compacto y redondeado, mismo tratamiento negro + filo dorado que la cabeza */}
          <rect x="18" y="52" width="36" height="28" rx="16" ry="16" fill="url(#mascotGradBody)" stroke="url(#mascotGradMetal)" strokeWidth="1.2" />
          {/* Lucecita de pecho: acento teal */}
          <circle cx="36" cy="64" r="3" fill="url(#mascotGradVisor)" opacity="0.9" />

          {/* Hombros: articulaciones */}
          <circle cx="18" cy="58" r="4" fill="url(#mascotGradJoint)" />
          <circle cx="54" cy="58" r="4" fill="url(#mascotGradJoint)" />

          {/* Brazo izquierdo: fijo salvo en la despedida (se levanta junto al derecho) */}
          <path className="mascot-arm-left" d="M18 58 10 62 8 72" stroke="url(#mascotGradMetal)" strokeWidth="4.2" strokeLinecap="round" fill="none" />
          {/* Brazo derecho: saluda, senala al explicar, se acerca a la cabeza al pensar */}
          <path className="mascot-arm-right" d="M54 58 62 62 64 72" stroke="url(#mascotGradMetal)" strokeWidth="4.2" strokeLinecap="round" fill="none" />

          {/* Base / pies, simple y redondeada */}
          <rect x="24" y="80" width="24" height="4" rx="2" fill="url(#mascotGradJoint)" />
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
