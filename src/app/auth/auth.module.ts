import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, StoreModule } from '@ngrx/store';
import * as fromAuth from './store/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/auth.effects';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { RouterModule } from '@angular/router';
import { MDBmaterialModule } from '../mdbmaterial/mdbmaterial.module';
//import { LoginInitAuth } from './store/auth.actions';
import { AppState } from '../reducers';
import * as actions from '././store/auth.actions';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,    
    MDBmaterialModule,   
    RouterModule,    
    StoreModule.forFeature('auth', fromAuth.authReducer),
    EffectsModule.forFeature([AuthEffects]),    
  ],
  declarations: [RegisterComponent, LoginComponent],
  exports: [RegisterComponent],
  providers: [AuthService
  ]
})
export class AuthModule { 
  constructor(store$: Store<AppState>) {
    store$.dispatch(new actions.LoginInitAuth());
  }
}
