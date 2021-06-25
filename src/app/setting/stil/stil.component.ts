import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/helpers/notification.service';
import { SettingsService } from 'src/app/services/settings.service';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { _stil } from 'src/app/models/_settings';
import { Lang } from 'src/app/models/_carts';

@Component({
  selector: 'app-stil',
  templateUrl: './stil.component.html',
  styleUrls: ['./stil.component.scss']
})
export class StilComponent implements OnInit {
  stilForm: FormGroup; 
  liststil:_stil[] = []; 
  filteredstil: _stil[];
  stil:_stil=new _stil(); 
  _lang:Lang[]=[{lid: '1', lname: 'Az'},{lid: '2', lname: 'En'},{lid: '3', lname: 'Ru'} ];  _lan='';
  _stil: _stil[];  _pid:'';
  
  constructor( private _caSer: SettingsService,
     private notificationService: NotificationService) {
     this.stil.stilId="";
   }

   ngOnInit(): void {
    this.stilForm = new FormGroup({  
     // firma_id: new FormControl('', [Validators.required,Validators.maxLength(36)]),   
     stilname: new FormControl('', [Validators.required,Validators.maxLength(50)]),
  
        
    });  
      //this._caSer._getfirma().subscribe( p=>{ this._page=p;console.log(p)});  
      this._caSer._getitemstil().subscribe(list=>
        { 
           this.liststil=list; 
           this.filteredstil = this.liststil; 
           console.log(this.liststil)                        
        }, error => console.error(error + 'Siz sistemə daxil olmalısınız!')); 
    }

get stilname() { return this.stilForm.get('stilname'); }

langu(lan:any){  this._lan=lan; }
  _addstil() {
    this.stil.stilId='';   
    this.stil.stilname='';    
  }
  _cline(){ 
    this.stilForm = new FormGroup({         
      stilId: new FormControl(''),
      stilname: new FormControl(''),    
      });     
   }
   _editstil(ca:_stil){ 
    //console.log('12111')   
    // console.log(ca)  
       this.stil.stilId=ca.stilId;
       this.stil.stilname=ca.stilname;//this._page.find(x=>x.pid==ca.pId).pagename;
      // this.fir.firma_telefon=ca.firma_telefon; 
      // this.fir.firma_unvan=ca.firma_unvan;
      // this.fir.voen=ca.voen,
      // this.fir.firma_email=this._storage.getemail();
      // this.fir.userId=this._storage.getId();      
     }
 onadd()
  { 
    if(this.stilForm.valid)  
    {
       //console.log('333')
      // console.log(this.firForm.value)
       var p={
        stilId:this.stil.stilId  ,
        stilname:this.stilForm.value.stilname,      
      }
      //  console.log(p)
       this._caSer._positemstil(p).subscribe();  
       //this._yenile(); 
       this._addstil(); 
       this._cline();   
       this.notificationService.success('::Submitted successfully');             
    }   
  } 
  ondel()
  {
        this.notificationService.warn('!Deleted successfully');     
        this._caSer._delitemstil(this.stil).subscribe();  
       // this._yenile();
  } 


}
