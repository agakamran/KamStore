import { Injectable } from '@angular/core';
import { Actions,  Effect,  ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import {defer, Observable, of } from 'rxjs';
import { map, switchMap, catchError, tap, take } from 'rxjs/operators';
import * as auth from './auth.actions';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/_users';
import { NotificationService } from 'src/app/helpers/notification.service';
import { GravatarService } from 'src/app/manage/shared/services/gravatar.service';
//import { environment } from 'src/environments/environment';
@Injectable()
export class AuthEffects {
  _jwtService=new JwtHelperService();
  Url: any;
  constructor( private router: Router,private actions$: Actions,private noti: NotificationService,
      private authService: AuthService, private gravatarService: GravatarService, ) {}
 
  @Effect()
  loginAction$ = this.actions$.pipe(
    ofType(auth.AuthActionTypes.LOGIN_REQUESTED),
    map((action: auth.LoginRequested) => action.payload),
    switchMap(payload => this.authService.signInWithEmailAndPassword(payload).pipe(
        map((res: any) => {  
          const user = {
            uid: res.uid,
            displayName: res.displayName,
            email: res.email,
            providerId: res.providerId,
            phoneNumber:res.phoneNumber,
            isEmailConfirmed:res.isEmailConfirmed,       
            photoUrl:res.photoUrl,
            storpercent:res.percent,
            token:res.token
          };
         // console.log(user)
          if(user!=undefined){
            this.noti.success('::Təbriklər');
          }          
          return new auth.LoginSuccess( { user });
        }),
        tap(() => this.router.navigateByUrl('')),
        catchError(error => of(new auth.AuthError({ error })))
      )
    )
  );
  @Effect()
  loginSuccess$ = this.actions$.pipe(
    ofType(auth.AuthActionTypes.LOGIN_SUCCESS),
    map( (action: auth.SaveUser) => action.payload),
    switchMap( (payload: any) => {
        return [             
          new auth.UpdateOnlineStatus({ uid: payload.user.uid, status: true }),
          new auth.CheckUserRole( {uid: payload.user.uid })
        ];
    })
  );
  @Effect({ dispatch: false })//bazadan aldigimizi saxlayiriq
  saveAuthDataToLocalStorage$ =this.actions$.pipe(
    ofType(auth.AuthActionTypes.LOGIN_SUCCESS),
    tap((p : auth.LoginSuccess) => {  
      localStorage.setItem('authData', JSON.stringify(p.payload.user));
    }));

  @Effect() 
    extractLoginData$ = this.actions$.pipe(
      ofType(auth.AuthActionTypes.LOGIN_INIT_AUTH, auth.AuthActionTypes.LOGIN_EXTRACT_AUTH),
      map(() => {
        const authDataString = localStorage.getItem('authData');

        if (!authDataString) {
          return new auth.LogoutCompleted();
        }          
        const _user: User = JSON.parse(authDataString);
        const exp = this._jwtService.decodeToken(_user.token)["exp"];        
        if ((exp * 1000 - 10 * 1000 - Date.now()) < 0) {
         return new auth.LogoutCompleted();
       }  

       const user = {
        uid: _user.uid,
        displayName: _user.displayName,
        email: _user.email,
        providerId: _user.providerId,
       // providerId: res.additionalUserInfo.providerId,
        photoUrl: _user.photoUrl,
        phoneNumber:_user.phoneNumber,
        isEmailConfirmed:_user.isEmailConfirmed,
        storpercent:_user.storpercent,
       // isNewUser: res.additionalUserInfo.isNewUser
        token:  _user.token
      };

        return new auth.LoginSuccess({ user });
      })
    );
   
  @Effect()
  registerAction$ = this.actions$.pipe(
    ofType(auth.AuthActionTypes.REGISTER_REQUESTED),
    map((action: auth.RegisterRequested) => action.payload),
    switchMap(payload =>
      this.authService.createUserWithEmailAndPassword(payload).pipe(
        map((res: any) => {
          const gravatarUrl = this.gravatarService.getUserGravatar(res.user.email);
          const user = {
            uid: res.user.uid,
            displayName: payload.email || res.user.displayName,
            email: res.user.email,
            providerId: res.additionalUserInfo.providerId,
            photoUrl: res.user.photoURL || gravatarUrl,
            isNewUser: res.additionalUserInfo.isNewUser,
            storpercent:res.user.storpercent,
            isAdmin: false,
            isOnline: true
          };
          return user;
        }),
        switchMap( (user: User) => {
          return [
            new auth.RegisterCompleted(),
            new auth.LoginSuccess({ user }),
           // new auth.UpdateProfile({ displayName: payload.email, photoUrl: user.photoUrl }),
            new auth.SaveUser( { user })
          ];
        }),
        tap(() => { this.router.navigateByUrl(''); }),
        catchError(error => of(new auth.AuthError({ error })))
      )
    )
  );
  @Effect()
  logoutAction$ = this.actions$.pipe(
    ofType(auth.AuthActionTypes.LOGOUT_REQUESTED),
    map( (action: auth.LogoutRequested) => action.payload),
   // switchMap(() => this.authService.logout()
    switchMap((payload: any) => this.authService.logout(payload.user.uid)
      .pipe(
        map(() => (new auth.LogoutCompleted())),
        tap(() => this.router.navigateByUrl('')),
        catchError(error => {
          return of(new auth.AuthError({ error }));
        }
        )
      )
    )
  );
  
  @Effect()
  getUser$ = this.actions$.pipe(
    ofType(auth.AuthActionTypes.GET_USER),
    switchMap(() => this.authService.getAuthState()
      .pipe(
        take(1),
        map((authData: any) => {
          if (authData) {            
            const user = {
              uid: authData.uid,
              displayName: authData.displayName,
              email: authData.email,
              providerId: authData.providerData[0].providerId,
              photoUrl: authData.photoURL,
              isEmailConfirmed:authData.isEmailConfirmed,
              storpercent:authData.storpercent
            };
            return new auth.LoginSuccess({ user });
          } else {
            return new auth.LoginFailed();
          }
        }),
        catchError(error => of(new auth.AuthError({ error })))
      )
    )
  );
  @Effect()
  checkUserRole$ = this.actions$.pipe(
    ofType(auth.AuthActionTypes.CHECK_USER_ROLE),
    map( (action: auth.CheckUserRole) => action.payload),
    switchMap( (payload: any) => this.authService.checkUserRole(payload.uid)
      .pipe(
        map( (isAdmin: boolean) => {
          return new auth.UpdateUserRole({ isAdmin });
        }),
        catchError( (error: any) => of(new auth.AuthError({ error })))
      )
    )
  );
  @Effect()
  init$: Observable<any> = defer(() => {
    return of(new auth.GetUser());
  });
  @Effect({ dispatch: false })
  updateOnlineStatus$ = this.actions$.pipe(
    ofType(auth.AuthActionTypes.UPDATE_ONLINE_STATUS),
    map( (action: auth.UpdateOnlineStatus) => action.payload),
    switchMap( (payload: any) => this.authService.updateOnlineStatus(payload.uid, payload.status))
  );
 
  

  // @Effect({ dispatch: false })
  // saveUser$ = this.actions$.pipe(
  //   ofType(auth.AuthActionTypes.SAVE_USER),
  //   map( (action: auth.SaveUser) => action.payload),
  //   switchMap( (payload: any) => this.authService.saveUser(payload.user))
  // );  

  @Effect()
  updateProfile$ = this.actions$.pipe(
    ofType(auth.AuthActionTypes.UPDATE_PROFILE),
    map((action: auth.UpdateProfile) => action.payload),
    switchMap((payload: any) =>
      this.authService.updateProfile(payload.displayName, payload.photoUrl,payload.phoneNumber,payload.isEmailConfirmed,payload.storpercent).pipe(
        map( () => {
          const currentUser: any = this.authService.getCurrentUser();
            const updatedUser: any = {
              uid: currentUser.uid || null,
              displayName: currentUser.displayName || null,
              email: currentUser.email || null,
              providerId: currentUser.providerData[0].providerId || null,
              phoneNumber: currentUser.phoneNumber || null,
              isEmailConfirmed: currentUser.isEmailConfirmed || false,
              photoUrl: currentUser.photoURL || null,
              storpercent: currentUser.storpercent || null
          };
          return new auth.UpdateProfileSuccess( { user: updatedUser });
        }),
        catchError( (error) => of(new auth.AuthError(error)))
      )
    )
  );
 

  // @Effect()
  // socialLogin$ = this.actions$.pipe(
  //   ofType(auth.AuthActionTypes.SOCIAL_LOGIN),
  //   map((action: auth.SocialLogin) => action.payload),
  //   switchMap(payload => this.authService.socialLogin(payload.authProvider)
  //     .pipe(
  //       map( (res: any) => {
  //         const user = {
  //           uid: res.user.uid,
  //           displayName: res.user.displayName,
  //           email: res.user.email,
  //           providerId: res.additionalUserInfo.providerId,
  //           photoUrl: res.user.photoURL,
  //           isNewUser: res.additionalUserInfo.isNewUser
  //         };
  //         return user;
  //       }),
  //       switchMap( (user: User) => {
  //         if (user.isNewUser) {
  //           return [
  //             new auth.LoginSuccess({ user }),
  //             new auth.SaveUser({ user }),
  //             new auth.CheckUserRole({ uid: user.uid })
  //           ];
  //         } else {
  //           return [new auth.LoginSuccess({ user }), new auth.CheckUserRole({ uid: user.uid})];
  //         }
  //       }),
  //       tap(() => this.router.navigateByUrl('')),
  //       catchError(error => {
  //         return of(new auth.AuthError({ error }));
  //       })
  //     )
  //   )
  // );

 

}
