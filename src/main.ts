import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { APP_ROUTES } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { environment } from './environments/environment';
import { BASE_API_URL } from '@core/auth/constants';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(APP_ROUTES),
    provideHttpClient(),
    [{ provide: BASE_API_URL, useValue: environment.baseApiUrl }],
  ],
});
