import { Component, Input, OnInit } from '@angular/core';
import { product } from 'src/app/models/_settings';
import { User } from 'src/app/models/_users';

import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
//https://www.next.com.az/en/style/st687677/792501#792501
private products: product[] = [];
private categories: string[] = [];
@Input() user: User;
listitem:product[] = []; 
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
    }
    , error => console.error(error + 'Siz sistemə daxil olmalısınız!')
      );
    } 

}
