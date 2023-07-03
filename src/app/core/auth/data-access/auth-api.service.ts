import { Inject, Injectable } from '@angular/core';
import { BASE_API_URL } from '../constants/auth-url.token';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { AuthUserThumbnail } from '../types/auth-user-thumbnail.interface';
import { AuthUser } from '../types/auth-user.interface';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  public constructor(
    private http: HttpClient,
    @Inject(BASE_API_URL) private baseApiUrl: string
  ) {}

  getAuthUserThumbnailUrl(id: number): Observable<string> {
    return this.getAuthUserThumbnail(id).pipe(
      map((authThumbnail: AuthUserThumbnail) => authThumbnail.thumbnailUrl)
    );
  }

  submitAuthUser(authUser: AuthUser): Observable<AuthUser> {
    return this.http.post<AuthUser>(`${this.baseApiUrl}/users`, authUser);
  }

  private getAuthUserThumbnail(id: number): Observable<AuthUserThumbnail> {
    return this.http.get<AuthUserThumbnail>(`${this.baseApiUrl}/photos/${id}`);
  }
}
