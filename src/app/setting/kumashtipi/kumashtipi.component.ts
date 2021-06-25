import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/helpers/notification.service';
import { SettingsService } from 'src/app/services/settings.service';
import { kumashtipi } from 'src/app/models/_settings';
import { Lang } from 'src/app/models/_carts';

@Component({
  selector: 'app-kumashtipi',
  templateUrl: './kumashtipi.component.html',
  styleUrls: ['./kumashtipi.component.scss']
})
export class KumashtipiComponent implements OnInit {
  kumForm: FormGroup; 
  listkum:kumashtipi[] = []; 
  filteredkum: kumashtipi[];
  kum:kumashtipi=new kumashtipi(); 
  _lang:Lang[]=[{lid: '1', lname: 'Az'},{lid: '2', lname: 'En'},{lid: '3', lname: 'Ru'} ];  _lan='';
  _kum: kumashtipi[];  _pid:'';
  
  constructor( private _caSer: SettingsService,
     private notificationService: NotificationService) {
     this.kum.kumashId="";
   }

   ngOnInit(): void {
    this.kumForm = new FormGroup({  
     // firma_id: new FormControl('', [Validators.required,Validators.maxLength(36)]),   
     kumashname: new FormControl('', [Validators.required,Validators.maxLength(50)]),
  
        
    });  
      //this._caSer._getfirma().subscribe( p=>{ this._page=p;console.log(p)});  
      this._caSer._getkumashtipi().subscribe(list=>
        { 
           this.listkum=list; 
           this.filteredkum = this.listkum; 
           console.log(this.listkum)                        
        }, error => console.error(error + 'Siz sistemə daxil olmalısınız!')); 
    }

get kumashname() { return this.kumForm.get('kumashname'); }

langu(lan:any){  this._lan=lan; }
  _addkum() {
    this.kum.kumashId='';   
    this.kum.kumashname='';    
  }
  _cline(){ 
    this.kumForm = new FormGroup({         
      kumashId: new FormControl(''),
      kumashname: new FormControl(''),    
      });     
   }
   _editkum(ca:kumashtipi){ 
    //console.log('12111')   
    // console.log(ca)  
       this.kum.kumashId=ca.kumashId;
       this.kum.kumashname=ca.kumashname;//this._page.find(x=>x.pid==ca.pId).pagename;
      // this.fir.firma_telefon=ca.firma_telefon; 
      // this.fir.firma_unvan=ca.firma_unvan;
      // this.fir.voen=ca.voen,
      // this.fir.firma_email=this._storage.getemail();
      // this.fir.userId=this._storage.getId();      
     }
 onadd()
  { 
    if(this.kumForm.valid)  
    {
       //console.log('333')
      // console.log(this.firForm.value)
       var p={
        kumashId:this.kum.kumashId  ,
        kumashname:this.kumForm.value.kumashname,      
      }
      //  console.log(p)
       this._caSer._poskumashtipi(p).subscribe();  
       //this._yenile(); 
       this._addkum(); 
       this._cline();   
       this.notificationService.success('::Submitted successfully');             
    }   
  } 
  ondel()
  {
        this.notificationService.warn('!Deleted successfully');     
        this._caSer._delkumashtipi(this.kum).subscribe();  
       // this._yenile();
  } 

}
