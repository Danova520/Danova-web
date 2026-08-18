"use client";

import dynamic from "next/dynamic";

// Ninguno de los dos pinta nada en el primer render (el chat empieza cerrado,
// el cursor no dibuja hasta que se mueve el raton) -- se cargan en un chunk
// aparte para no sumar al JS critico de la carga inicial.
const ChatWidget = dynamic(() => import("@/components/ChatWidget").then((m) => m.ChatWidget), {
  ssr: false,
});
const CustomCursor = dynamic(() => import("@/components/CustomCursor").then((m) => m.CustomCursor), {
  ssr: false,
});

export function DeferredWidgets() {
  return (
    <>
      <ChatWidget />
      <CustomCursor />
    </>
  );
}
