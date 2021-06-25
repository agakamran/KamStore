//import { IRole } from './_role';

//import { IRole, Role } from './_role';
/*export class User { 
    email: string='';
    password?: string;
    photoUrl?: string='';
    token?: string; 
    mesage?:string;
    requiresTwoFactor?:boolean;
    status?: number ;
}*/
export interface User {
    uid: string;
    displayName: string;
    email: string;    
    providerId: string;
    isEmailConfirmed?:boolean;
    phoneNumber?:string;
    photoUrl?: string;
    storpercent?:number;
    isNewUser?: boolean;
    isAdmin?: boolean;
    isOnline?: boolean;
    token?:string;
  }
export interface IRegister {   
    email: string;
    password: string;
    confirmPassword: string ;
}
export class ForgotPassword{
    email: string;
   // link:string;
}
export class ResetPassword{
    email: string;
    password: string;
    confirmPassword: string ; 
    code:string;    
}
export class ChangePassword{
    OldPassword: string;
    NewPassword:string;
    confirmPassword: string ;
    statusMessage:string;
}
export class contact{
    
    cId:string;    
    yourname:string;
    userId:string;
    subject:string;     
    message:string;
    tarix :string;
   isdelete:boolean;
}
export class IndexViewModel
{
    username:string;
    isEmailConfirmed:boolean;
    email:string;
    phoneNumber:string;
    photoUrl?: string;
    percent:number;
    statusMessage:string;
}
export interface RequestResult {    
    access_token: string,  
    role: string,
    email: string,   
    mesage:string,
    requiresTwoFactor:boolean,
    status: number
}
export interface ILoginWith2fa{
        twoFactorCode:string;
        rememberMachine:boolean;
        rememberMe:boolean;
    }
    export interface ILoginWithRecoveryCode{
    recoveryCode:string;
    }
//----manager
export interface ITwoFactor{
      hasAuthenticator :boolean;
      recoveryCodesLeft: number;
      is2faEnabled:boolean
}
export interface IEnableAuthenticator{
    code:string;    
    sharedKey:string;    
    authenticatorUri:string;
}