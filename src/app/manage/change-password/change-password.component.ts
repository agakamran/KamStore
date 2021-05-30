import { Component, OnInit } from '@angular/core';
import { ChangePassword } from 'src/app/models/_users';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { NotificationService } from 'src/app/helpers/notification.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  pageTitle='ChangePassword';  
  model: ChangePassword=new ChangePassword();
  chengForm: FormGroup; 
  constructor(private _mana: AuthService,private notif: NotificationService) { }

  
   hide = true; 
  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
  console.log(group)
  let pass = group.controls.password.value;
  let confirmPass = group.controls.confirmPass.value;

  return pass === confirmPass ? null : { notSame: true }     
}
get OldPassword() { return this.chengForm.get('OldPassword'); }
get NewPassword() { return this.chengForm.get('NewPassword'); }
get confirmPassword() { return this.chengForm.get('confirmPassword'); }
    ngOnInit() {
      this.chengForm = new FormGroup({     
        OldPassword: new FormControl('', [Validators.required]),
        NewPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
        confirmPassword: new FormControl('', [Validators.required,Validators.minLength(6)]),
       // statusMessage: new FormControl('',)       
       });       
      }
  onSubmit()
    {  
    
     console.log(this.chengForm.value) 
      if(this.chengForm.valid)
      {
        this._mana._ChangePassP(this.chengForm.value)
              .then(result => {
              let resul= result as ChangePassword; 
                this.notif.success('::Submitted'+resul.statusMessage);
              
            if(resul.statusMessage){             
                                                    
              }
              else{
                this.notif.error('::Submitted'+resul.statusMessage);              
                }                 
          });
        }
    }

}
