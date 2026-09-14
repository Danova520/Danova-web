"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { WA_LINK } from "@/lib/constants";
import { chatKnowledgeBase, chatStrings, matchKnowledgeBase } from "@/lib/chatKnowledgeBase";

const CHAT_WA_LINK = `${WA_LINK}?text=Hola%2C%20tengo%20una%20pregunta%20sobre%20DANOVA`;

// Secciones que, al entrar en pantalla, hacen que la mascota senale con un
// pequeno globo de texto. Cada id de seccion mapea a su clave de traduccion.
const MASCOT_SECTIONS = {
  resultados: "mascot.resultados",
  testimonios: "mascot.testimonios",
  proceso: "mascot.proceso",
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

  // Señala secciones clave con un globo de texto cuando entran en pantalla.
  useEffect(() => {
    let hideTimeout;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
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
        <svg className="mascot-svg" viewBox="0 0 36 40" fill="none" aria-hidden="true">
          {/* Antena */}
          <line x1="18" y1="6" x2="18" y2="2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <rect
            className="mascot-antenna-dot"
            x="16.9" y="0.5" width="2.2" height="2.2"
            transform="rotate(45 18 1.6)"
            fill="currentColor" stroke="none"
          />

          {/* Cabeza: octogono, angular en vez de redondeado */}
          <polygon points="12,6 24,6 28,10 28,16 24,20 12,20 8,16 8,10" stroke="currentColor" strokeWidth="1.5" />

          {/* Visor (ojos), una sola ranura en vez de dos puntos redondos; parpadea */}
          <rect className="mascot-eye" x="12.5" y="11.5" width="11" height="3.6" stroke="currentColor" strokeWidth="1.3" />

          {/* Cuello */}
          <rect x="15" y="20" width="6" height="2.5" stroke="currentColor" strokeWidth="1.3" />

          {/* Cuerpo: rectangulo con base angular */}
          <polygon points="9,22.5 27,22.5 27,30 23.5,34 12.5,34 9,30" stroke="currentColor" strokeWidth="1.5" />

          {/* Brazo izquierdo, fijo, quebrado en angulo */}
          <path d="M9 25.5 4 25.5 3 30.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
          {/* Brazo derecho, saluda */}
          <path className="mascot-arm-wave" d="M27 25.5 32 25.5 33 30.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />

          {/* Piernas / base, en angulo */}
          <path d="M13.5 34 12.5 39 9.5 39" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
          <path d="M22.5 34 23.5 39 26.5 39" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
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
