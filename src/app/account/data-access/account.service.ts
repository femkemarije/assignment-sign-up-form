import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { AuthApiService } from '@core/auth/data-access';
import { AuthUser } from '@core/auth/types';

@Injectable({ providedIn: 'root' })
export class AccountService {
  public constructor(private authApiService: AuthApiService) {}

  signUpUser(
    firstName: string,
    lastName: string,
    email: string
  ): Observable<AuthUser> {
    const lastNameLength: number = lastName.length;

    return this.authApiService.getAuthUserThumbnailUrl(lastNameLength).pipe(
      switchMap((thumbnailUrl: string) =>
        this.authApiService.submitAuthUser({
          firstName,
          lastName,
          email,
          thumbnailUrl,
        })
      )
    );
  }
}
