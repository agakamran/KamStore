import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import * as actions from './../../store/auth.actions';
import { Observable } from 'rxjs';
import { getError } from '../../store/auth.selectors';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/reducers';
//import { NotificationService } from 'src/app/helpers/notification.service';
import { Router } from '@angular/router';
//import { NotificationService } from 'src/app/helpers/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  error$: Observable<string | null>;

  constructor(private store: Store<AppState>,private router:Router ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
    this.error$ = this.store
      .pipe(
        select(getError),
        map( (error: any) => {
          if (error && (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password')) {
            return 'Invalid login or password';
          } else {
            return null;
          }
        })
      );
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  onLogin() {
    if (this.loginForm.valid) {
     // console.warn(this.loginForm.value)
      this.store.dispatch(new actions.LoginRequested(this.loginForm.value));
       
       this.router.navigateByUrl('exem/exem');
    }
  }

  // onGoogleLogin(authProvider: string) {
  //   this.store.dispatch(new actions.SocialLogin({ authProvider }));
  // }

  // onFacebookLogin(authProvider: string) {
  //   this.store.dispatch(new actions.SocialLogin({ authProvider }));
  // }

  // onTwitterLogin(authProvider: string) {
  //   this.store.dispatch(new actions.SocialLogin({ authProvider }));
  // }

}
