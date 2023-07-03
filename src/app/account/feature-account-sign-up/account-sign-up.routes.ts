import { Routes } from '@angular/router';
import { AccountSignUpComponent } from './components/account-sign-up/account-sign-up.component';
import { AccountSignUpSuccessComponent } from './components/account-sign-up-success/account-sign-up-success.component';
import { AccountSignUpFailureComponent } from './components/account-sign-up-failure/account-sign-up-failure.component';

export const ACCOUNT_SIGN_UP_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AccountSignUpComponent,
      },
      {
        path: 'success',
        component: AccountSignUpSuccessComponent,
      },
      {
        path: 'failure',
        component: AccountSignUpFailureComponent,
      },
    ],
  },
];
