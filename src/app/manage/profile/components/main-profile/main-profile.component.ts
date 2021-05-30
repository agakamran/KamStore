import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
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
  @Input() user: User;
  @Output() profileUpdate = new EventEmitter<any>();
  ProfileForm: FormGroup;
  _photoUrl=""
  _phoneNumber=""
  constructor(private _upl:UploadFilesService) { }
 
  ngOnInit() { 

    this.ProfileForm = new FormGroup({
      displayName: new FormControl(this.user.displayName),
      photoUrl: new FormControl(this.user.photoUrl),
      email: new FormControl(this.user.email),
      phoneNumber: new FormControl(this.user.phoneNumber),  
      isEmailConfirmed: new FormControl(this.user.isEmailConfirmed)      
    });  
    //alert(this.user.photoUrl)
    this._photoUrl=this.user.photoUrl;
    this._phoneNumber=this.user.phoneNumber;  
  }
 // get photoUrl() { return this.ProfileForm.get('photoUrl'); }
 // get phoneNumber() { return this.ProfileForm.get('phoneNumber'); }
  onProfileUpdate() { 
   // alert('Images/profile/'+this.selectedFiles.name)
   // console.log(this.ProfileForm.value) 
    this._photoUrl='Images/profile/'+this.selectedFiles.name;
    this._upl.uploadAvatar(this.selectedFiles).subscribe(); 
    
    //console.log(this.user.photoUrl)
    this.profileUpdate.emit(this.ProfileForm.value);    
  }
  Url:string;
  selectedFiles: File ;
  _selectFiles(event: any){
    this.selectedFiles = event.target.files[0] as File;  
    this._photoUrl='Images/profile/'+this.selectedFiles.name;
   
  }
}
