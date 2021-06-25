import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError,  flatMap,  map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { from, Observable, of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ChangePassword, ForgotPassword, IndexViewModel, IRegister, ITwoFactor, ResetPassword, User } from '../models/_users';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { NotificationService } from '../helpers/notification.service';
import { getToken, getUser } from '../auth/store/auth.selectors';


//const EXPIRES_KEY = 'expires-token';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  _jwtService=new JwtHelperService();
  private pathAPI =''
  auth: Observable<User>;
  //currentUser:Observable<any>;
  constructor(private http: HttpClient ,private store:Store<AppState>,private notif: NotificationService) {
     this.pathAPI=environment.apiUrl+'Account/'; }
  
  signInWithEmailAndPassword(data:{email:string ,password:string}):Observable<User> {
    //console.warn(data)
    const body=JSON.stringify(data);
    return from(this.http.post<any>(this.pathAPI + 'login', body)
      .pipe( catchError((err) => {  console.error(err);  throw err; }  )));    
  }
  createUserWithEmailAndPassword(data:{email: string, password: string ,confirmPassword:string}) :Observable<IRegister>{
    const body=JSON.stringify(data);
    return from(this.http.post<any>(this.pathAPI + 'Register', body)
    .pipe( catchError((err) => {  console.error(err);  throw err; }  )));
  } 
  public getrole():string[] |any {
   var roles:any;
    this.store.select(getToken).subscribe(k=>{ 
      if(k!=null)
      {
        roles=this._jwtService.decodeToken(k)["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      }
    })
    return roles; 
  }
  checkUserRole(uid: string ) {  
   let t=false;
   this.store.select(getToken).subscribe(k=>{       
    if(k!=null&& uid!='')
    {     
      if(this._jwtService.decodeToken(k)["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] .includes('Administrator')){
        t=true
    }
      return of(t);
    }
   })    
   return of(t);
  }
  
  getAuthState()  {
    var user:any=null; 
    this.store.select(getUser).subscribe(k=>{
       user=k;
    })          
    return of(user)
   // return this.afAuth.authState;
  }
  logout(uid: string)//uid: string
  {
     this.updateOnlineStatus(uid, false);
    window.localStorage.removeItem('authData');    
    return from(this.http.get( this.pathAPI +'Logout'));
  } 
  updateOnlineStatus(uid: string, status: boolean) {
    if (status==true && uid!='') {
     return of( { isOnline: true })
      //this.db.database.ref().child('users/' + uid).onDisconnect().update( { isOnline: false });
    }
    // return from(this.db.object('users/' + uid).update({ isOnline: status }));
    return from(of({ isOnline: status }));
  }
  socialLogin(//authProvider: string
    ) {
   /* let provider: any;
    if (authProvider === 'google') {
      provider = new firebase.auth.GoogleAuthProvider();
    }

    if (authProvider === 'facebook') {
      provider = new firebase.auth.FacebookAuthProvider();
    }

    if (authProvider === 'twitter') {
      provider = new firebase.auth.TwitterAuthProvider();
    }
    return from(this.afAuth.auth.signInWithPopup(provider));*/
  }  
  
//  saveUser(user: User) {
//     const users = this.db.object('users/' + user.uid);
//     return users.set(user);
//     }
  
  
  
  updateProfile(displayName: string, photoUrl: string,phoneNumber:string,isEmailConfirmed:boolean,_storpercent:number  ) { 
    //var xx={displayName:displayName,photoUrl:photoUrl,phoneNumber:phoneNumber,isEmailConfirmed}
  // console.log("####"+_storpercent)  
    return this.store.select(getUser).pipe(
      map(p=>{ 
          var user=p; 
          if (user!=null) {
            const updatedUser: any = {             
              displayName: displayName ,
              email: user.email , 
              photoUrl: photoUrl,
              phoneNumber: phoneNumber,           
              isEmailConfirmed: isEmailConfirmed,
              percent:_storpercent
          };
         
          return updatedUser;
        } else {
          // return user;
        }}),
      flatMap((updatedUser : IndexViewModel) => {
         this.notif.success('::Submitted'); 
         console.log(updatedUser)
        return from(this.http.post(this.pathAPI +'profil',updatedUser))
          .pipe( catchError((err) =>
           {
             this.notif.error('::Submitted'+err);
             console.error(err);  throw err; 
           }));
        }
      )
    ) 
     
   

    //  return <any>from(userProfile.updateProfile( { displayName: displayName, photoURL: photoUrl }));
      // this._mana._indexP(this.user)
      //   .then(result => {
      //     let resul= result as IndexViewModel; 
      //     if(resul.statusMessage){             
      //        this.notif.success('::Submitted'+resul.statusMessage);                                       
      //     }
      //    else{
      //      this.notif.error('::Submitted'+resul.statusMessage);     
      //      console.log('olmadi');  
      //    }        
      // }); 
     
    // }
  }
  getCurrentUser() {
    this.store.select(getUser).subscribe(p=>{
     // this.currentUser=p;
      return p;
    })  
  }

  //--------------------------------------------
  //-----------------------------------------------------
  public _getconfirm(id:string){
    let params = new HttpParams().set('id', id );       
    return this.http.get<IndexViewModel[]>(this.pathAPI + '_getConfirmation', { params: params }).toPromise()          
        .catch((err) => {
          console.error(err);
          throw err;
        });
  } 
  _confirmemail(userId:string,code:string):Promise<any> 
  {
    let params = new HttpParams().set('userId', userId );  
    params=params.append('code', code );    
    return this.http.get(this.pathAPI + 'ConfirmEmail', { params: params }).toPromise()
    .catch((err) => {
      console.error(err);
      throw err;
    });
  } 
  _setPassword(_log:ResetPassword)
  {
   // console.log(this.user)
      return this.http.post(this.pathAPI +'ResetPassword',_log).toPromise()
      .then(response => {
          let result = response as unknown as ResetPassword;
          return result;
      }).catch((err) => {
        console.error(err);
        throw err;
      });        
  }
  public  ForgotPassword(_log:ForgotPassword): Promise<any> {
    const bod= { email: _log.email }
    return this.http.post(this.pathAPI +'ForgotPassword',bod).toPromise()
        .then(response => {            
            return response;
        }).catch((err) => {
          console.error(err);
          throw err;
        });
   }
 public _ChangePassP(_log:ChangePassword)
 {
  const body=JSON.stringify(_log);
  console.log(this.pathAPI +'ChangePassword',body)
     return this.http.post(this.pathAPI +'ChangePassword',body).toPromise()
     .then(response => {
         let result = response as ChangePassword;
         return result;
     }).catch((err) => {
      console.error(err);
      throw err;
    });        
 }
   _TwoFactor()
 {
     return this.http.get(this.pathAPI +'Manage/'+'TwoFactorAuthentication').toPromise()
     .then(response => {
         let result = response as ITwoFactor;
         return result;
     }).catch((err) => {
      console.error(err);
      throw err;
    });        
 }
 _indexG(): Promise<any> {  
  return this.http.get(this.pathAPI +'profil').toPromise()
  .then(response => {
      let result = response as unknown as IndexViewModel;
      return result;
  }).catch((err) => {
    console.error(err);
    throw err;
  });            
}
_indexP(_log:IndexViewModel){    
return this.http.post(this.pathAPI +'profil',_log).toPromise()
 .then(response => {
     let result = response as unknown as IndexViewModel;
     return result;
 }).catch((err) => {
  console.error(err);
  throw err;
});            
} 
}
