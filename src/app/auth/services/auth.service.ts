import { Injectable } from '@angular/core';
import { CredentialsDto } from '../dto/credentials.dto';
import { LoginResponseDto } from '../dto/login-response.dto';
import { HttpClient } from '@angular/common/http';
import { API } from '../../../config/api.config';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { ConnectedUserDto } from '../dto/connected-user.dto.ts';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #user$ = new BehaviorSubject<ConnectedUserDto | null>(null);
  user$ = this.#user$.asObservable();
  isLoggedIn$ = this.user$.pipe(map((user) => !!user));
  IsLoggedOut$ = this.user$.pipe(map((user) => !user));
  constructor(private http: HttpClient) {
    const user = localStorage.getItem('connectedUser');
    this.#user$.next(user ? JSON.parse(user) : null);
    // if (user) {
    //   this.#user$.next(JSON.parse(user));
    // } else {
    //   this.#user$.next(null);
    // }
  }
  login(credentials: CredentialsDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(API.login, credentials).pipe(
      tap((loginResponse) => {
        /**
         * nzid user lel flux
         */
        const connectedUser: ConnectedUserDto = {
          id: loginResponse.userId,
          email: credentials.email,
        };
        this.#user$.next(connectedUser);
        localStorage.setItem('connectedUser', JSON.stringify(connectedUser));
        localStorage.setItem('token', loginResponse.id);
      })
    );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('connectedUser');
    this.#user$.next(null);
  }
}
