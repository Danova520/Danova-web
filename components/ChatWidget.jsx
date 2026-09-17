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
        <svg className="mascot-svg" viewBox="0 0 84 84" aria-hidden="true">
          <defs>
            {/* Casco de la nave: negro/gris muy oscuro (--ink/--bg), con un
                matiz calido tenue en la zona de luz para dar volumen. */}
            <linearGradient id="mascotGradHull" x1="10%" y1="0%" x2="60%" y2="100%">
              <stop offset="0%" stopColor="#3A2F22" />
              <stop offset="40%" stopColor="#1B1611" />
              <stop offset="100%" stopColor="#15120E" />
            </linearGradient>
            {/* Cabina: acento teal, como una luz encendida -- equivalente a los "ojos" */}
            <radialGradient id="mascotGradCabin" cx="35%" cy="30%" r="75%">
              <stop offset="0%" stopColor="#5C8B7C" />
              <stop offset="55%" stopColor="#3C5C55" />
              <stop offset="100%" stopColor="#213B35" />
            </radialGradient>
            {/* Estela del propulsor: brillo calido que se atenua hacia fuera */}
            <radialGradient id="mascotGradThruster" cx="50%" cy="0%" r="90%">
              <stop offset="0%" stopColor="#F0DBA6" />
              <stop offset="55%" stopColor="#C6A15B" />
              <stop offset="100%" stopColor="#C6A15B" stopOpacity="0" />
            </radialGradient>
            {/* Resplandor suave detras del conjunto, para dar sensacion de volumen "premium" */}
            <radialGradient id="mascotGradGlow" cx="50%" cy="50%" r="55%">
              <stop offset="0%" stopColor="#D6B36E" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#D6B36E" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Resplandor de fondo */}
          <ellipse cx="42" cy="42" rx="28" ry="26" fill="url(#mascotGradGlow)" />

          {/* Anillo orbital punteado, mismo lenguaje visual que el logo (OrbitMark) */}
          <circle className="mascot-ring" cx="42" cy="42" r="32" fill="none" stroke="#C6A15B" strokeWidth="1.1" strokeDasharray="2 5" />
          {/* Estrella distante, igual que el punto del logo */}
          <circle className="mascot-star" cx="42" cy="10" r="2.4" fill="#C6A15B" />

          {/* Particulas que orbitan mas rapido (solo pensativo, "procesando") */}
          <g className="mascot-particles">
            <circle cx="70" cy="46" r="1.8" fill="#C6A15B" />
            <circle cx="14" cy="38" r="1.6" fill="#C6A15B" />
            <circle cx="50" cy="12" r="1.3" fill="#C6A15B" />
          </g>

          {/* La nave: casco redondeado tipo mascota, no militar */}
          <g className="mascot-ship">
            {/* Casco */}
            <path
              d="M42 20 C49 25 52 33 49 42 C48 47 46 50 42 52 C38 50 36 47 35 42 C32 33 35 25 42 20 Z"
              fill="url(#mascotGradHull)" stroke="#C6A15B" strokeWidth="1.1"
            />
            {/* Estela del propulsor, en la cola */}
            <path className="mascot-thruster" d="M37 53 Q42 64 47 53 Q42 59 37 53 Z" fill="url(#mascotGradThruster)" />
            {/* Aletas, detalle dorado */}
            <path d="M35 44 34 53 39 48Z" fill="#C6A15B" />
            <path d="M49 44 50 53 45 48Z" fill="#C6A15B" />
            {/* Anillo del propulsor */}
            <ellipse cx="42" cy="52.5" rx="6" ry="2" fill="#C6A15B" />
            {/* Cabina/ventana: se ilumina segun el estado, como los "ojos" */}
            <circle className="mascot-cabin" cx="42" cy="31" r="5" fill="url(#mascotGradCabin)" stroke="#C6A15B" strokeWidth="0.9" />
            <ellipse cx="40.3" cy="29" rx="1.3" ry="1" fill="#EAF2EE" opacity="0.5" />
            {/* Pulso que sale de la cabina al "explicar" */}
            <circle className="mascot-explain-burst" cx="42" cy="31" r="5" fill="none" stroke="#C6A15B" strokeWidth="1.5" />
          </g>
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
