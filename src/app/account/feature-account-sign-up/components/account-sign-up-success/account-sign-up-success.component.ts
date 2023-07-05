import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'fx-account-sign-up-success',
  standalone: true,
  templateUrl: './account-sign-up-success.component.html',
  styleUrls: ['./account-sign-up-success.component.scss'],
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountSignUpSuccessComponent {}
