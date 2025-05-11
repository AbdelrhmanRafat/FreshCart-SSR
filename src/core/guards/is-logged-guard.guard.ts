import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';
import { CookieService } from '../Services/cookie.service';

export const isLoggedGuardGuard: CanActivateFn = (route, state) => {
  const platformId = inject(PLATFORM_ID);
  const _Router = inject(Router);
  const _CookieService = inject(CookieService);

  if (isPlatformServer(platformId)) {
    // Allow SSR to proceed without blocking
    return true;
  }

  if (_CookieService.getCookie('token') != null) {
    _Router.navigate(['/Home']);
    return false;
  }

  return true;
};