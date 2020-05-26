import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as AuthActions from './auth.actions';
import { AuthResponseData } from '../auth.service';
import { of } from 'rxjs';

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
        catchError(error => {
          of();
        }),
        map(resData => {
          of();
        }),
      );
    }),
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) {}


}
