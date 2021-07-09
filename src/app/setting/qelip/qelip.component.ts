import { Component, OnInit } from '@angular/core';
import { qelip } from 'src/app/models/_settings';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/helpers/notification.service';
import { SettingsService } from 'src/app/services/settings.service';
import { Lang } from 'src/app/models/_carts';

@Component({
  selector: 'app-qelip',
  templateUrl: './qelip.component.html',
  styleUrls: ['./qelip.component.scss']
})
export class QelipComponent implements OnInit {
  qelForm: FormGroup; 
  listqel:qelip[] = []; 
  filteredqel: qelip[];
  qel:qelip=new qelip(); 
  _lang:Lang[]=[{lid: '1', lname: 'Az'},{lid: '2', lname: 'En'},{lid: '3', lname: 'Ru'} ];  _lan='';
  _qel: qelip[];  _pid:'';
  
  constructor( private _caSer: SettingsService,
     private notificationService: NotificationService) {
     this.qel.qelipId="";
   }

   ngOnInit(): void {
    this.qelForm = new FormGroup({  
     // firma_id: new FormControl('', [Validators.required,Validators.maxLength(36)]),   
     qelipname: new FormControl('', [Validators.required,Validators.maxLength(50)]),
  
        
    });  
      //this._caSer._getfirma().subscribe( p=>{ this._page=p;console.log(p)});  
      this._caSer._getqelip().subscribe(list=>
        { 
           this.listqel=list; 
           this.filteredqel = this.listqel; 
          // console.log(this.listqel)                        
        }, error => console.error(error + 'Siz sistemə daxil olmalısınız!')); 
    }

get qelipname() { return this.qelForm.get('qelipname'); }

langu(lan:any){  this._lan=lan; }
  _addqel() {
    this.qel.qelipId='';   
    this.qel.qelipname='';    
  }
  _cline(){ 
    this.qelForm = new FormGroup({         
      qelipId: new FormControl(''),
      qelipname: new FormControl(''),    
      });     
   }
   _editqel(ca:qelip){ 
    //console.log('12111')   
    // console.log(ca)  
       this.qel.qelipId=ca.qelipId;
       this.qel.qelipname=ca.qelipname;//this._page.find(x=>x.pid==ca.pId).pagename;
      // this.fir.firma_telefon=ca.firma_telefon; 
      // this.fir.firma_unvan=ca.firma_unvan;
      // this.fir.voen=ca.voen,
      // this.fir.firma_email=this._storage.getemail();
      // this.fir.userId=this._storage.getId();      
     }
 onadd()
  { 
    if(this.qelForm.valid)  
    {
       //console.log('333')
      // console.log(this.firForm.value)
       var p={
        qelipId:this.qel.qelipId  ,
        qelipname:this.qelForm.value.qelipname,      
      }
      //  console.log(p)
       this._caSer._posqelip(p).subscribe();  
       //this._yenile(); 
       this._addqel(); 
       this._cline();   
       this.notificationService.success('::Submitted successfully');             
    }   
  } 
  ondel()
  {
        this.notificationService.warn('!Deleted successfully');     
        this._caSer._delqelip(this.qel).subscribe();  
       // this._yenile();
  } 

}
