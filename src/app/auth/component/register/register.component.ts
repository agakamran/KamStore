import { Component, OnInit } from '@angular/core';
import { FormGroup, //FormControl,
   Validators, FormBuilder } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import * as actions from './../../store/auth.actions';
import { getError } from '../../store/auth.selectors';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/reducers';
import { MustMatch } from 'src/app/services/MustMatch';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  error$: Observable<string | null>;
  submitted = false;
  constructor(private store: Store<AppState>,private formBuilder: FormBuilder) { }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    },
    {   
      validator: MustMatch('password', 'confirmPassword')
    });

    this.error$ = this.store
      .pipe(
        select(getError),
        map( (error: any) => {
          if (error) {
            if (error.code === 'auth/weak-password') {
              return error.message;
            } else if (error.code === 'auth/email-already-in-use') {
              return 'User with this email address already exist';
            }
          } else {
            return null;
          }
        })
      );
  }
 
 get f() { return this.registerForm.controls; }
  onRegister() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {   return;  }

    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;
    const confirmPassword = this.registerForm.value.confirmPassword;
    if (this.registerForm.valid) {
      this.store.dispatch(new actions.RegisterRequested({  email, password ,confirmPassword}));
    }
   // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }

}
