import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { User } from  'src/app/models/_users';
import { UploadFilesService } from 'src/app/services/upload-files-service.service';
//import {} from '../../../../assets/images'
@Component({
  selector: 'app-main-profile',
  templateUrl: './main-profile.component.html',
  styleUrls: ['./main-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainProfileComponent implements OnInit {
  fir: Store[];
  @Input() user: User;
  @Output() profileUpdate = new EventEmitter<any>();
  ProfileForm: FormGroup;
  _photoUrl=""
  _phoneNumber=""
  _storpercent=0
  constructor(private _upl:UploadFilesService) { }
 
  ngOnInit() { 

    this.ProfileForm = new FormGroup({
      displayName: new FormControl(this.user.displayName),
      photoUrl: new FormControl(this.user.photoUrl),
      email: new FormControl(this.user.email),
      phoneNumber: new FormControl(this.user.phoneNumber),  
      storpercent: new FormControl(this.user.storpercent),
      isEmailConfirmed: new FormControl(this.user.isEmailConfirmed)      
    });  
 //  console.log(this.user.storpercent)
    this._photoUrl=this.user.photoUrl;
    this._phoneNumber=this.user.phoneNumber;  
    this._storpercent=this.user.storpercent;  
  }
  onProfileUpdate() { 
   
    if(this.selectedFiles.name!=undefined) {
       this._photoUrl='Images/profile/'+this.selectedFiles.name;
    this._upl.uploadAvatar(this.selectedFiles).subscribe(); 
    }  
    
    //console.log('####'+this.ProfileForm.value)
    this.profileUpdate.emit(this.ProfileForm.value);    
  }
  Url:string;
  selectedFiles: File ;
  _selectFiles(event: any){
    this.selectedFiles = event.target.files[0] as File;  
    this._photoUrl='Images/profile/'+this.selectedFiles.name;
   
  }
}
