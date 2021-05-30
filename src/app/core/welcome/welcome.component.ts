import { Component, OnInit } from '@angular/core';
//import { NotificationService } from 'src/app/helpers/notification.service';
import { itemdetail } from 'src/app/models/_settings';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  //https://www.next.com.az/en/style/st687677/792501#792501
  listitem:itemdetail[] = []; 
  
  constructor(private _caSer: SettingsService //, private noti: NotificationService 
    ) { }
  ngOnInit() {
    this._getit();
  }
  _getit(){
    
    this._caSer._getitemdetail('').subscribe(list=>
    {   
          if(list!=[]){
            this.listitem=list;
            //console.warn(this.listitem[0])
           //  this.mdbTable.setDataSource(this.listitem);
          //this.previous = this.mdbTable.getDataSource();
          }                         
      }, error => console.error(error + 'Siz sistemə daxil olmalısınız!'));
    } 
}
