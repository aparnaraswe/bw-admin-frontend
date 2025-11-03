import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr, ToastrConfig } from 'ngx-toastr';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideToastr({
      positionClass: 'toast-top-right', // default position for all toasts
      timeOut: 3000,                     // 3 seconds
      closeButton: true,                 // show close button
    } as ToastrConfig),    importProvidersFrom(BrowserAnimationsModule) // needed for animations
  ]
};
