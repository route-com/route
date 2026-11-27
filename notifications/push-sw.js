const scope = new URL(self.registration.scope);
const independentCompanion = /\/notifications\/$/.test(scope.pathname);

self.addEventListener('push', event => {
  let payload;
  try { payload = event.data?.json(); } catch { payload = null; }
  const kind = payload?.kind === 'call' ? 'call' : 'message';
  const type = payload?.callKind === 'video' ? '视频' : payload?.callKind === 'voice' ? '语音' : '';
  const body = kind === 'call' ? `你有一通${type}来电` : '你收到一条新消息';
  const id = typeof payload?.eventId === 'string' ? payload.eventId : '';
  event.waitUntil(self.registration.showNotification('行迹', {
    body,
    icon: independentCompanion ? new URL('notification-icon.png', scope).href : undefined,
    tag: id ? `xingji-${kind}-${id.slice(0, 64)}` : `xingji-${kind}`,
    data: { kind },
  }));
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil((async () => {
    const windows = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    if (independentCompanion) {
      const destination = new URL('index.html?open=notifications', scope);
      if (event.notification.data?.kind === 'call') destination.searchParams.set('alert', 'call');
      const companion = windows.find(item => item.url.startsWith(scope.href));
      if (companion) {
        const client = await companion.navigate(destination.href).catch(() => null);
        if (client) { await client.focus(); return; }
      }
      await self.clients.openWindow(destination.href);
      return;
    }
    const client = windows.find(item => new URL(item.url).origin === scope.origin && !new URL(item.url).pathname.startsWith('/notifications/'));
    if (client) {
      await client.focus();
      client.postMessage({ type: 'XINGJI_OPEN_MESSAGES' });
    } else await self.clients.openWindow('/?open=messages');
  })());
});
