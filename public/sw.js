// Service worker mínimo. No implementa cache/offline (la app depende de datos en
// vivo de Supabase, así que "offline completo" no tendría sentido acá) — su único
// propósito es cumplir el requisito técnico del navegador para poder instalar la
// app en el celular ("Agregar a pantalla de inicio").
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", () => {
  // No-op intencional: dejamos pasar todas las requests directo a la red.
});
