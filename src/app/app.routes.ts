import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('@home/feature-home/components/home/home.component').then(
        ({ HomeComponent }) => HomeComponent
      ),
  },
  {
    path: 'sign-up',
    loadChildren: () =>
      import('@account/feature-account-sign-up/account-sign-up.routes').then(
        m => m.ACCOUNT_SIGN_UP_ROUTES
      ),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
