import { Component, OnInit, Input, Output,
   EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { User } from 'src/app/models/_users';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileUserComponent implements OnInit {
  @Input() user: User;
  @Output() logout = new EventEmitter<any>();
  _photoUrl=""
  constructor() { }
 
  
  ngOnInit() {
    //let ad=environment.apiUrl.replace('/api/','/');
    this._photoUrl=environment.apiUrl.replace('/api/','/')+this.user.photoUrl;
  }

  onLogout() {
    this.logout.emit(this.user);
  }

}
