import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as AuthActions from './auth.actions';
import { AuthResponseData } from '../auth.service';
import { of } from 'rxjs';
import {Router} from '@angular/router';

@Injectable()
export class AuthEffects {

  apiKey = '';

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authDate: AuthActions.LoginStart) => {
      return this.http.post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`,
        {
          email: authDate.payload.email,
          password: authDate.payload.password,
          returnSecureToken: true
        }
      ).pipe(
        map(resData => {
          const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
          return new AuthActions.Login({
              email: resData.email,
              userId: resData.localId,
              token: resData.idToken,
              expirationDate,
            }
          );
        }),
        catchError(error => {
          return of();
        }),
      );
    }),
  );

  @Effect({ dispatch: false })
  authSuccess = this.actions$.pipe(
    ofType(AuthActions.LOGIN),
    tap(() => this.router.navigate(['/'])),
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
  ) {}


}
