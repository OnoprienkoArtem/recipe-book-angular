import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';
import { LoggingService } from './logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isLoading: Observable<boolean> = this.authService.isLoader$;

  constructor(
    public authService: AuthService,
    private store: Store<fromApp.AppState>,
    private loggingService: LoggingService,
  ) {}

  ngOnInit() {
    this.store.dispatch(new AuthActions.AutoLogin());

    this.loggingService.printLog('Hello from AppComponent');
  }
}
