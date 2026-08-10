/* =====================================================================================
   Le mie Richieste — Service Worker
   Volutamente minimale: a differenza di sw.js (app di gestione turni) non mette nulla
   in cache, serve solo a poter mostrare notifiche di sistema (reg.showNotification)
   anche con la pagina in background, e a gestire il tap su di esse.
   ===================================================================================== */

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Click sulla notifica di sistema (pannello del telefono): porta in primo piano una
// scheda dell'app già aperta, altrimenti ne apre una nuova.
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      for (const client of clients) {
        if ('focus' in client) return client.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow('./dipendenti.html');
    })
  );
});
