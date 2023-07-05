import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'fx-account-sign-up-failure',
  standalone: true,
  templateUrl: './account-sign-up-failure.component.html',
  styleUrls: ['./account-sign-up-failure.component.scss'],
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountSignUpFailureComponent {}
