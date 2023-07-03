import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AsyncPipe, NgIf } from '@angular/common';
import { map, Observable } from 'rxjs';
import { SignUpFormGroup } from '../../interfaces/account-sign-up-form.interface';
import {
  authPasswordValidator,
  PASSWORD_MIN_LENGTH,
  PASSWORD_UPPER_LOWER_CASE_PATTERN,
} from '@core/auth/*';

@Component({
  selector: 'fx-account-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, AsyncPipe],
  templateUrl: './account-sign-up.component.html',
  styleUrls: ['./account-sign-up.component.scss'],
})
export class AccountSignUpComponent {
  signUpForm: FormGroup<SignUpFormGroup> = this.initializeSignUpForm();
  fullName$: Observable<string> = this.listenToFullNameChanges();

  constructor(private formBuilder: FormBuilder) {}

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

    // Todo: submit sign up form
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
