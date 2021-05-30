import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './reducers';
import { Observable } from 'rxjs';
import { getUser, getIsLoggedIn, getIsLoading, getIsAdmin } from './auth/store/auth.selectors';

import * as fromAuth from './auth/store/auth.actions';
import { User } from './models/_users';
//import { StorageService } from './helpers/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app'; 
  user$: Observable<User | null>;
  isLoggedIn$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  isAdmin$: Observable<boolean>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
   
    this.user$ = this.store.select(getUser);    
    this.isLoggedIn$ = this.store.select(getIsLoggedIn);
    this.isLoading$ = this.store.select(getIsLoading);    
    this.isAdmin$ = this.store.select(getIsAdmin);
    /* this.user$.subscribe(p=>{
       if(p!=null){
          console.log(p!.uid)
          console.log(p!.email)
       }
     
     })*/
    //console.log(this.st.getToken())
    //console.log(this.st.getrole())
  }

  onLogout(user: User) {
    this.store.dispatch(new fromAuth.LogoutRequested( { user }));
  }

}