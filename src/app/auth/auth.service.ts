import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresId: string;
  localId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiKey = '';

  isLoader$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`,
      {
        email,
        password,
        returnSecureToken: true
      }
    );
  }


}
