import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isLoading: Observable<boolean> = this.authService.isLoader$;

  constructor(public authService: AuthService) {
  }

  ngOnInit() {
    console.log(this.isLoading);
  }

}
