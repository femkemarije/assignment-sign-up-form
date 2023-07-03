import { AccountService } from './account.service';
import { of } from 'rxjs';
import { AuthApiService } from '@core/auth/data-access';
import { AuthUser } from '@core/auth/types';

describe(AccountService.name, () => {
  let service: AccountService;
  let authApiService: {
    getAuthUserThumbnailUrl: jest.Mock;
    submitAuthUser: jest.Mock;
  };

  const thumbnailUrl = 'thumbnail.url';
  const authUser: AuthUser = {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'Jane@doe.com',
    thumbnailUrl,
  };

  beforeEach(() => {
    authApiService = {
      getAuthUserThumbnailUrl: jest.fn(() => of(thumbnailUrl)),
      submitAuthUser: jest.fn(() =>
        of({
          ...authUser,
          id: '2',
        })
      ),
    };

    service = new AccountService(authApiService as unknown as AuthApiService);
  });

  describe('signUpUser', () => {
    it('should sign up user', () => {
      const getAuthUserThumbnailUrlSpy = jest.spyOn(
        authApiService,
        'getAuthUserThumbnailUrl'
      );

      const submitAuthUserSpy = jest.spyOn(authApiService, 'submitAuthUser');

      service
        .signUpUser(authUser.firstName, authUser.lastName, authUser.email)
        .subscribe();
      expect(getAuthUserThumbnailUrlSpy).toBeCalledWith(3);
      expect(submitAuthUserSpy).toBeCalledWith(authUser);
    });
  });
});
