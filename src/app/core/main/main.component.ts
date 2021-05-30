import { Component, OnInit } from '@angular/core';
import { itemdetail } from 'src/app/models/_settings';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
//https://www.next.com.az/en/style/st687677/792501#792501
listitem:itemdetail[] = []; 
  constructor(private _caSer: SettingsService) { }

  ngOnInit() {
    this._getit();
  }
  _getit(){
    
    this._caSer._getitemdetail('').subscribe(list=>
    {   
          if(list!=[]){
            this.listitem=list;
           // console.warn(this.listitem[0])
           //  this.mdbTable.setDataSource(this.listitem);
          //this.previous = this.mdbTable.getDataSource();
          }                         
      }, error => console.error(error + 'Siz sistemə daxil olmalısınız!'));
    } 

}
