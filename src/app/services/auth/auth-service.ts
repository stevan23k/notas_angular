import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface user {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlApi(parametro: any) {
    if (parametro == null) {
      return environment.API_URL + '/auth';
    }
    return environment.API_URL + `/auth/${parametro}`;
  }
  constructor(private http: HttpClient) {}

  login(user: user): Observable<HttpResponse<user>> {
    return this.http.post<user>(this.urlApi('login'), user, {
      observe: 'response',
      withCredentials: true,
    });
  }

  register(user: user): Observable<HttpResponse<user>> {
    return this.http.post<user>(this.urlApi('register'), user, {
      observe: 'response',
      withCredentials: true,
    });
  }

  User(): Observable<HttpResponse<{ nombre: string }>> {
    return this.http.get<{ nombre: string; isAuth: boolean }>(this.urlApi('check'), {
      observe: 'response',
      withCredentials: true,
    });
  }

  isAuth(): Observable<HttpResponse<{ isAuth: boolean }>> {
    return this.http.get<{ isAuth: boolean }>(this.urlApi('check'), {
      observe: 'response',
      withCredentials: true,
    });
  }

  logout(): Observable<HttpResponse<any>> {
    return this.http.post<any>(
      this.urlApi('logout'),
      {},
      {
        observe: 'response',
        withCredentials: true,
      },
    );
  }
}
