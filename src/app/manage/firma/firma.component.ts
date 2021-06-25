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
      const _storpercent=''
     this.fir.storId="";
     this.store.select(getemail).subscribe(k=>{ this._email=k; })
     this.store.select(getId).subscribe(k=>{   this._Id=k;   })
   }
  ngOnInit(): void {
       this.firForm = new FormGroup({  
      storid: new FormControl('', [Validators.maxLength(36)]),   
      storname: new FormControl('', [Validators.required,Validators.maxLength(36)]),
      storphone: new FormControl('', [Validators.required,Validators.maxLength(50)]),
      storadress: new FormControl('', [Validators.maxLength(50)]),  
      storemail: new FormControl('', [Validators.required,Validators.maxLength(50)]),
      storvoen: new FormControl(0, [Validators.required])
     // storpercent: new FormControl(0, [Validators.required])
        
    });  
      //this._caSer._getfirma().subscribe( p=>{ this._page=p;console.log(p)});  
      this._caSer._getfirma().subscribe(list=>
        { 
           this.listfir=list; 
         //  console.log(this.listfir)
           this.listfir=this.listfir.filter(k=>k.userId===this._Id)
          // console.log(this.listfir)
         //  console.log(this._storage.getId())
           this.filteredfir = this.listfir; 
          // console.log(this.listfir)                        
        }, error => console.error(error + 'Siz sistemə daxil olmalısınız!')); 
  }

get storname() { return this.firForm.get('storname'); }
get storphone() { return this.firForm.get('storphone'); }
get storadress() { return this.firForm.get('storadress'); }
get storemail() { return this.firForm.get('storemail'); }
get storvoen() { return this.firForm.get('storvoen'); }
//get storpercent() { return this.firForm.get('storpercent'); }
langu(lan:any){  this._lan=lan; }
//selPage(sel){ this._pid=sel;}
//selrol(sel){ this._rol=sel;}
  _addfir()
  {
    this.fir.storname='';
    this.fir.storphone='';
    this.fir.storadress='';
    this.fir.storemail='';
    this.fir.storId=''; 
    this.fir.storvoen=0;   
   // this.fir.storpercent=0; 
  }
  _cline(){ 
    this.firForm = new FormGroup({  
       
      storId: new FormControl(''),
      storname: new FormControl(''),
      storphone: new FormControl(''),
      storadress: new FormControl(''),      
      storemail: new FormControl(''),
      userId: new FormControl(''),
      storvoen: new FormControl(0)
     // storpercent: new FormControl(0)
      });
     
   }
   _editfir(ca:firma){ 
    //console.log('12111')   
    // console.log(ca)  
       this.fir.storId=ca.storId;
       this.fir.storname=ca.storname;//this._page.find(x=>x.pid==ca.pId).pagename;
       this.fir.storphone=ca.storphone; 
       this.fir.storadress=ca.storadress;
       this.fir.storvoen=ca.storvoen;
       this.fir.storpercent=ca.storpercent,
       this.fir.storemail=this._email;
       this.fir.userId=this._Id;      
     }
 onadd()
  { 
    if(this.firForm.valid)  
    {
      // console.log('333')
       //console.log(this.firForm.value)
       var p={
        storId:this.fir.storId  ,
        storname:this.firForm.value.storname,
        storphone:this.firForm.value.storphone,
        storadress:this.firForm.value.storadress,
        storvoen:this.firForm.value.storvoen,
        storpercent:this.firForm.value.storpercent,
        storemail:this._email,
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
