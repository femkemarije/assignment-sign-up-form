import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AsyncPipe, NgIf } from '@angular/common';
import { BehaviorSubject, finalize, map, Observable } from 'rxjs';
import { SignUpFormGroup } from '../../interfaces/account-sign-up-form.interface';
import { ActivatedRoute, Router } from '@angular/router';
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_UPPER_LOWER_CASE_PATTERN,
} from '@core/auth/constants';
import { authPasswordValidator } from '@core/auth/validators';
import { AccountService } from '@account/data-access';

@Component({
  selector: 'fx-account-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, AsyncPipe],
  templateUrl: './account-sign-up.component.html',
  styleUrls: ['./account-sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountSignUpComponent {
  signUpForm: FormGroup<SignUpFormGroup> = this.initializeSignUpForm();
  fullName$: Observable<string> = this.listenToFullNameChanges();

  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService
  ) {}

  get firstName(): FormControl<string> {
    return this.signUpForm.controls.firstName;
  }

  get lastName(): FormControl<string> {
    return this.signUpForm.controls.lastName;
  }

  get email(): FormControl<string> {
    return this.signUpForm.controls.email;
  }

  get password(): FormControl<string> {
    return this.signUpForm.controls.password;
  }

  submitForm(): void {
    if (this.signUpForm.invalid) {
      return;
    }

    this.loading$.next(true);

    this.accountService
      .signUpUser(this.firstName.value, this.lastName.value, this.email.value)
      .pipe(finalize(() => this.loading$.next(false)))
      .subscribe({
        next: () => this.navigateTo('./success'),
        error: () => this.navigateTo('./failure'),
      });
  }

  private navigateTo(path: string): void {
    this.router.navigate([path], {
      relativeTo: this.activatedRoute,
    });
  }

  private initializeSignUpForm(): FormGroup<SignUpFormGroup> {
    return this.formBuilder.nonNullable.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(PASSWORD_MIN_LENGTH),
            Validators.pattern(PASSWORD_UPPER_LOWER_CASE_PATTERN),
          ],
        ],
      },
      { validators: [authPasswordValidator()] }
    );
  }

  private listenToFullNameChanges(): Observable<string> {
    return this.signUpForm.valueChanges.pipe(
      map(({ firstName, lastName }) => this.mapToFullName(firstName, lastName))
    );
  }

  private mapToFullName(firstName = '', lastName = ''): string {
    return firstName + (firstName && lastName ? ' ' : '') + lastName;
  }
}
