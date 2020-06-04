import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as AuthActions from './auth.actions';
import { AuthResponseData } from '../auth.service';
import {of, throwError} from 'rxjs';
import { Router } from '@angular/router';

const handleAuthentication = (email: string, userId: string, token: string, expiresIn: number) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  return new AuthActions.AuthenticateSuccess({
      email,
      userId,
      token,
      expirationDate,
    }
  );
};

const handleError = (errorRes: any) => {
  let errorMessage = 'An unknown error occurred!';

  if (!errorRes.error || !errorRes.error.error) {
    return of(new AuthActions.AuthenticateFail(errorMessage));
  }

  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This email exists already.';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'This email does not exist.';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'This password is not correct.';
      break;
  }

  return of(new AuthActions.AuthenticateFail(errorMessage));
};

@Injectable()
export class AuthEffects {

  apiKey = '';

  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((signupAction: AuthActions.SignupStart) => {
      return this.http.post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`,
        {
          email: signupAction.payload.email,
          password: signupAction.payload.password,
          returnSecureToken: true,
        }
      ).pipe(
        map(resData => {
          return handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }),
        catchError(errorRes => {
          return handleError(errorRes);
        }),
      );
    })
  );

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
          return handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }),
        catchError(errorRes => {
          return handleError(errorRes);
        }),
      );
    }),
  );

  @Effect({ dispatch: false })
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS, AuthActions.LOGOUT),
    tap(() => this.router.navigate(['/'])),
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
  ) {}


}
