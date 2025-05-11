import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  const isBrowser = isPlatformBrowser(platformId);

  if (isBrowser) {
    const spinner = inject(NgxSpinnerService);
    spinner.show('ball-spinner');

    return next(req).pipe(
      finalize(() => {
        spinner.hide('ball-spinner');
      })
    );
  }
  // On the server: just pass through without spinner
  return next(req);
};