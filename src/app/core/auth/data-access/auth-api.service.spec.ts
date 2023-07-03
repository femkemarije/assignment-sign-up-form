import { of } from 'rxjs';
import { AuthApiService } from './auth-api.service';
import { HttpClient } from '@angular/common/http';
import { AuthUser } from '../types/auth-user.interface';

describe(AuthApiService.name, () => {
  let service: AuthApiService;
  let httpService: {
    get: jest.Mock;
    post: jest.Mock;
  };

  let baseUrl: string;

  const authUser: AuthUser = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'John@doe.com',
    thumbnailUrl: 'thumbnail.url',
  };

  beforeEach(() => {
    httpService = {
      get: jest.fn(() => of(authUser)),
      post: jest.fn(() => of({ ...authUser, id: 1 })),
    };

    baseUrl = 'api.com';

    service = new AuthApiService(httpService as unknown as HttpClient, baseUrl);
  });

  describe('getAuthUserThumbnailUrl', () => {
    it('should get thumbnail url', done => {
      const getAuthUserThumbnailUrlSpy = jest.spyOn(httpService, 'get');

      service.getAuthUserThumbnailUrl(2).subscribe(url => {
        expect(getAuthUserThumbnailUrlSpy).toBeCalledWith('api.com/photos/2');
        expect(url).toBe('thumbnail.url');
        done();
      });
    });
  });

  describe('submitAuthUser', () => {
    it('should submit user', done => {
      const submitAuthUserS = jest.spyOn(httpService, 'post');

      service.submitAuthUser(authUser).subscribe(authUserResponse => {
        expect(submitAuthUserS).toBeCalledWith('api.com/users', {
          email: 'John@doe.com',
          firstName: 'John',
          lastName: 'Doe',
          thumbnailUrl: 'thumbnail.url',
        });
        expect(authUserResponse).toEqual({ ...authUser, id: 1 });
        done();
      });
    });
  });
});
