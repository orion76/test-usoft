import { ApplicationConfig, InjectionToken, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { environment } from '../environments/environment';

export const API_KEY = new InjectionToken<string>('API_KEY', {
  providedIn: 'root', factory: () => {
    if (!environment.api_key) {
      throw new Error(`API_KEY for production mode is not defined!

******************  IMPORTANT !!! ******************* 
Аdd the "api_key" property for the portal https://data.mos.ru to the environment variable in the src/environments/environment.ts file.
****************************************************
        `)
    }
    return environment.api_key;
  }
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
  ]
};
