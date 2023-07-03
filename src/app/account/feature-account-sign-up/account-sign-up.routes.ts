import { Routes } from '@angular/router';
import { AccountSignUpComponent } from './components/account-sign-up/account-sign-up.component';

export const ACCOUNT_SIGN_UP_ROUTES: Routes = [
  {
    path: '',
    component: AccountSignUpComponent,
    children: [
      {
        path: 'success',
        component: AccountSignUpComponent, // TODO
      },
    ],
  },
];
