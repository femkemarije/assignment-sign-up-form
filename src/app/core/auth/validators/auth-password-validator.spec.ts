import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { authPasswordValidator } from './auth-password-validator';

describe(authPasswordValidator.name, () => {
  let validator: (group: FormGroup) => ValidationErrors | null;
  let formGroup: FormGroup;

  beforeEach(() => {
    validator = authPasswordValidator();
    formGroup = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      password: new FormControl(''),
    });
  });

  it('should return null when password is empty', () => {
    expect(validator(formGroup)).toEqual(null);
  });

  it('should return null when first- and lastname are empty', () => {
    formGroup.patchValue({
      password: 'Welcome01!',
    });

    expect(validator(formGroup)).toEqual(null);
  });

  it('should return null when password does NOT contain first- or lastname', () => {
    formGroup.patchValue({
      firstName: 'John',
      lastName: 'Doe',
      password: 'Welcome01!',
    });

    expect(validator(formGroup)).toEqual(null);
  });

  it('should return error when password contains firstName', () => {
    formGroup.patchValue({
      firstName: 'John',
      lastName: 'Doe',
      password: 'WelcomeJohn01!',
    });

    expect(validator(formGroup)).toEqual({
      password: true,
    });
  });

  it('should return error when password contains lastName', () => {
    formGroup.patchValue({
      firstName: 'John',
      lastName: 'Doe',
      password: 'WelcomeDoe01!',
    });

    expect(validator(formGroup)).toEqual({
      password: true,
    });
  });
});
