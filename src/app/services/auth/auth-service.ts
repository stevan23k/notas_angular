import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface user {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = 'http://localhost:3000/auth/login';
  private registerUrl = 'http://localhost:3000/auth/register';
  private userUrl = 'http://localhost:3000/auth/check';
  constructor(private http: HttpClient) {}

  login(user: user): Observable<HttpResponse<user>> {
    return this.http.post<user>(this.loginUrl, user, {
      observe: 'response',
      withCredentials: true,
    });
  }

  register(user: user): Observable<HttpResponse<user>> {
    return this.http.post<user>(this.registerUrl, user, {
      observe: 'response',
      withCredentials: true,
    });
  }

  User(): Observable<HttpResponse<{ nombre: string }>> {
    return this.http.get<{ nombre: string }>(this.userUrl, {
      observe: 'response',
      withCredentials: true,
    });
  }
}
