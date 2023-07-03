import { ActivatedRoute, Router } from '@angular/router';
import { AuthUser } from '@core/auth/types';
import { FormBuilder } from '@angular/forms';
import { AccountSignUpComponent } from './account-sign-up.component';
import { of, throwError } from 'rxjs';
import { AccountService } from '@account/data-access';

describe(AccountSignUpComponent.name, () => {
  let component: AccountSignUpComponent;
  let router: { navigate: jest.Mock };
  let accountService: { signUpUser: jest.Mock };
  let signUpUserSpy: jest.SpyInstance;

  const authUser: AuthUser = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'John@doe.com',
    thumbnailUrl: 'thumbnail.url',
  };

  const password = 'ValidPassword';

  beforeEach(() => {
    router = { navigate: jest.fn() };
    accountService = {
      signUpUser: jest.fn(() => of(authUser)),
    };

    component = new AccountSignUpComponent(
      new FormBuilder(),
      router as unknown as Router,
      {} as unknown as ActivatedRoute,
      accountService as unknown as AccountService
    );

    signUpUserSpy = jest.spyOn(accountService, 'signUpUser');
  });

  describe('validation', () => {
    it('should NOT submit form, when firstName is missing', () => {
      component.signUpForm.patchValue({
        lastName: authUser.lastName,
        email: authUser.email,
        password,
      });
      component.submitForm();

      expect(signUpUserSpy).not.toBeCalled();
    });

    it('should NOT submit form, when lastName is missing', () => {
      component.signUpForm.patchValue({
        firstName: authUser.firstName,
        email: authUser.email,
        password,
      });
      component.submitForm();

      expect(signUpUserSpy).not.toBeCalled();
    });

    it('should NOT submit form, when email is missing', () => {
      component.signUpForm.patchValue({
        firstName: authUser.firstName,
        lastName: authUser.lastName,
        password,
      });
      component.submitForm();

      expect(signUpUserSpy).not.toBeCalled();
    });

    it('should NOT submit form, when password is missing', () => {
      component.signUpForm.patchValue({
        firstName: authUser.firstName,
        lastName: authUser.lastName,
        email: authUser.email,
      });
      component.submitForm();

      expect(signUpUserSpy).not.toBeCalled();
    });

    it('should NOT submit form, when email is invalid', () => {
      component.signUpForm.patchValue({
        firstName: authUser.firstName,
        lastName: authUser.lastName,
        password,
        email: 'invalidEmail',
      });
      component.submitForm();

      expect(signUpUserSpy).not.toBeCalled();
    });

    it('should NOT submit form, when password contains firstName', () => {
      component.signUpForm.patchValue({
        firstName: authUser.firstName,
        lastName: authUser.lastName,
        email: authUser.email,
        password: `Welcome${authUser.firstName}01!`,
      });
      component.submitForm();

      expect(signUpUserSpy).not.toBeCalled();
    });

    it('should NOT submit form, when password contains lastName', () => {
      component.signUpForm.patchValue({
        firstName: authUser.firstName,
        lastName: authUser.lastName,
        email: authUser.email,
        password: `Welcome${authUser.lastName}01!`,
      });
      component.submitForm();

      expect(signUpUserSpy).not.toBeCalled();
    });

    it('should NOT submit form, when password is to short', () => {
      component.signUpForm.patchValue({
        firstName: authUser.firstName,
        lastName: authUser.lastName,
        email: authUser.email,
        password: `Welcome`,
      });
      component.submitForm();

      expect(signUpUserSpy).not.toBeCalled();
    });

    it('should NOT submit form, when password only has lowercase characters', () => {
      component.signUpForm.patchValue({
        firstName: authUser.firstName,
        lastName: authUser.lastName,
        email: authUser.email,
        password: `onlylowercasepassword`,
      });
      component.submitForm();

      expect(signUpUserSpy).not.toBeCalled();
    });

    it('should NOT submit form, when password only has uppercase characters', () => {
      component.signUpForm.patchValue({
        firstName: authUser.firstName,
        lastName: authUser.lastName,
        email: authUser.email,
        password: `ONLYUPPERCASECHARACTERS`,
      });
      component.submitForm();

      expect(signUpUserSpy).not.toBeCalled();
    });

    it('should submit form, when form is valid', () => {
      component.signUpForm.patchValue({
        firstName: authUser.firstName,
        lastName: authUser.lastName,
        email: authUser.email,
        password,
      });
      component.submitForm();

      expect(signUpUserSpy).toBeCalledWith(
        authUser.firstName,
        authUser.lastName,
        authUser.email
      );
    });
  });

  describe('submitForm', () => {
    it('should navigate to success page on success', () => {
      const routerSpy = jest.spyOn(router, 'navigate');

      component.signUpForm.patchValue({
        firstName: authUser.firstName,
        lastName: authUser.lastName,
        email: authUser.email,
        password,
      });

      component.submitForm();

      expect(routerSpy).toBeCalledWith(['./success'], { relativeTo: {} });
    });

    it('should navigate to failure page on error', () => {
      const routerSpy = jest.spyOn(router, 'navigate');

      component.signUpForm.patchValue({
        firstName: authUser.firstName,
        lastName: authUser.lastName,
        email: authUser.email,
        password,
      });

      signUpUserSpy.mockReturnValue(throwError(new Error('error')));

      component.submitForm();

      expect(routerSpy).toBeCalledWith(['./failure'], { relativeTo: {} });
    });
  });
});
