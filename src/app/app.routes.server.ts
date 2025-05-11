// src/app/app.routes.server.ts
import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
    { path: '', renderMode: RenderMode.Server },
    // 🔴 خلي صفحات cart و wishlist تـتعرض من الـ Client فقط
    { path: 'cart', renderMode: RenderMode.Client },
    { path: 'wishlist', renderMode: RenderMode.Client },
  
    // 🟡 باقي الصفحات SSR
    { path: '**', renderMode: RenderMode.Server }
];
