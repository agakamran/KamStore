import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { getemail, getId } from 'src/app/auth/store/auth.selectors';
import { NotificationService } from 'src/app/helpers/notification.service';
//import { StorageService } from 'src/app/helpers/storage.service';
import { Lang } from 'src/app/models/_carts';
import { firma } from 'src/app/models/_settings';
import { AppState } from 'src/app/reducers';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-firma',
  templateUrl: './firma.component.html',
  styleUrls: ['./firma.component.scss']
})
export class FirmaComponent implements OnInit {
  pageTitle=''; _Id:any;_email:any;
  firForm: FormGroup; 
  listfir:firma[] = []; 
  filteredfir: firma[];
  fir:firma=new firma(); 
  _lang:Lang[]=[{lid: '1', lname: 'Az'},{lid: '2', lname: 'En'},{lid: '3', lname: 'Ru'} ];  _lan='';
  _page: firma[];  _pid:'';
  
  constructor(private store: Store<AppState>, private _caSer: SettingsService,
     private notificationService: NotificationService) {
     this.fir.firma_Id="";
     this.store.select(getemail).subscribe(k=>{ this._email=k; })
     this.store.select(getId).subscribe(k=>{   this._Id=k;   })
   }

   ngOnInit(): void {
    this.firForm = new FormGroup({  
      firma_id: new FormControl('', [Validators.maxLength(36)]),   
      firma_name: new FormControl('', [Validators.required,Validators.maxLength(36)]),
      firma_telefon: new FormControl('', [Validators.required,Validators.maxLength(50)]),
      firma_unvan: new FormControl('', [Validators.maxLength(50)]),  
      firma_email: new FormControl('', [Validators.required,Validators.maxLength(50)]),
      voen: new FormControl(0, [Validators.required])
        
    });  
      //this._caSer._getfirma().subscribe( p=>{ this._page=p;console.log(p)});  
      this._caSer._getfirma().subscribe(list=>
        { 
           this.listfir=list; 
         //  console.log(this.listfir)
           this.listfir=this.listfir.filter(k=>k.userId===this._Id)
         //  console.log(this.listfir)
         //  console.log(this._storage.getId())
           this.filteredfir = this.listfir; 
          // console.log(this.listfir)                        
        }, error => console.error(error + 'Siz sistemə daxil olmalısınız!')); 
    }

get firma_name() { return this.firForm.get('firma_name'); }
get firma_telefon() { return this.firForm.get('firma_telefon'); }
get firma_unvan() { return this.firForm.get('firma_unvan'); }
get firma_email() { return this.firForm.get('firma_email'); }
get voen() { return this.firForm.get('voen'); }
langu(lan:any){  this._lan=lan; }
//selPage(sel){ this._pid=sel;}
//selrol(sel){ this._rol=sel;}
  _addfir()
  {
    this.fir.firma_name='';
    this.fir.firma_telefon='';
    this.fir.firma_unvan='';
    this.fir.firma_email='';
    this.fir.firma_Id=''; 
    this.fir.voen=0;   
  }
  _cline(){ 
    this.firForm = new FormGroup({  
       
      firma_Id: new FormControl(''),
      firma_name: new FormControl(''),
      firma_telefon: new FormControl(''),
      firma_unvan: new FormControl(''),      
      firma_email: new FormControl(''),
      userId: new FormControl(''),
      voen: new FormControl(0)
      });
     
   }
   _editfir(ca:firma){ 
    //console.log('12111')   
    // console.log(ca)  
       this.fir.firma_Id=ca.firma_Id;
       this.fir.firma_name=ca.firma_name;//this._page.find(x=>x.pid==ca.pId).pagename;
       this.fir.firma_telefon=ca.firma_telefon; 
       this.fir.firma_unvan=ca.firma_unvan;
       this.fir.voen=ca.voen,
       this.fir.firma_email=this._email;
       this.fir.userId=this._Id;      
     }
 onadd()
  { 
    if(this.firForm.valid)  
    {
      // console.log('333')
       //console.log(this.firForm.value)
       var p={
        firma_Id:this.fir.firma_Id  ,
        firma_name:this.firForm.value.firma_name,
        firma_telefon:this.firForm.value.firma_telefon,
        firma_unvan:this.firForm.value.firma_unvan,
        voen:this.firForm.value.voen,
        firma_email:this._email,
        userId:this._Id
      
      }
      //  console.log(p)
       this._caSer._posfirma(p).subscribe();  
       //this._yenile(); 
       this._addfir(); 
       this._cline();   
       this.notificationService.success('::Submitted successfully');                
                     
    }   
  } 
  ondel()
  {
        this.notificationService.warn('!Deleted successfully');     
        this._caSer._delfirma(this.fir).subscribe();  
       // this._yenile();
  } 
}
