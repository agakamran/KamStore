import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers/index';
import { getUser } from 'src/app/auth/store/auth.selectors';
import * as fromAuth from 'src/app/auth/store/auth.actions';
import { User } from 'src/app/models/_users';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user$: Observable<User | null>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.user$ = this.store.select(getUser);
  }

  updateProfile(userData: any) {
   
    this.store.dispatch(new fromAuth.UpdateProfile(userData));
  }

  logoutUser(user: User) {
    this.store.dispatch(new fromAuth.LogoutRequested({ user }));
  }

}
