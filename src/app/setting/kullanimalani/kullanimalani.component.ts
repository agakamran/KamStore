import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/helpers/notification.service';
import { SettingsService } from 'src/app/services/settings.service';
import { kullanimAlani } from 'src/app/models/_settings';
import { Lang } from 'src/app/models/_carts';

@Component({
  selector: 'app-kullanimalani',
  templateUrl: './kullanimalani.component.html',
  styleUrls: ['./kullanimalani.component.scss']
})
export class KullanimalaniComponent implements OnInit {
  kulForm: FormGroup; 
  listkul:kullanimAlani[] = []; 
  filteredkul: kullanimAlani[];
  kul:kullanimAlani=new kullanimAlani(); 
  _lang:Lang[]=[{lid: '1', lname: 'Az'},{lid: '2', lname: 'En'},{lid: '3', lname: 'Ru'} ];  _lan='';
  _kul: kullanimAlani[];  _pid:'';
  
  constructor( private _caSer: SettingsService,
     private notificationService: NotificationService) {
     this.kul.kulalanId="";
   }

   ngOnInit(): void {
    this.kulForm = new FormGroup({  
     // firma_id: new FormControl('', [Validators.required,Validators.maxLength(36)]),   
     kullanim_name: new FormControl('', [Validators.required,Validators.maxLength(50)]),
  
        
    });  
      //this._caSer._getfirma().subscribe( p=>{ this._page=p;console.log(p)});  
      this._caSer._getkullanimAlani().subscribe(list=>
        { 
           this.listkul=list; 
           this.filteredkul = this.listkul; 
           console.log(this.listkul)                        
        }, error => console.error(error + 'Siz sistemə daxil olmalısınız!')); 
    }

get kullanim_name() { return this.kulForm.get('kullanim_name'); }

langu(lan:any){  this._lan=lan; }
  _addkul() {
    this.kul.kulalanId='';   
    this.kul.kullanimname='';    
  }
  _cline(){ 
    this.kulForm = new FormGroup({         
      kulalan_Id: new FormControl(''),
      kullanim_name: new FormControl(''),    
      });     
   }
   _editkul(ca:kullanimAlani){ 
    //console.log('12111')   
    // console.log(ca)  
       this.kul.kulalanId=ca.kulalanId;
       this.kul.kullanimname=ca.kullanimname;//this._page.find(x=>x.pid==ca.pId).pagename;
      // this.fir.firma_telefon=ca.firma_telefon; 
      // this.fir.firma_unvan=ca.firma_unvan;
      // this.fir.voen=ca.voen,
      // this.fir.firma_email=this._storage.getemail();
      // this.fir.userId=this._storage.getId();      
     }
 onadd()
  { 
    if(this.kulForm.valid)  
    {
       //console.log('333')
      // console.log(this.firForm.value)
       var p={
        kulalanId:this.kul.kulalanId  ,
        kullanimname:this.kulForm.value.kullanimname,      
      }
      //  console.log(p)
       this._caSer._poskullanimAlani(p).subscribe();  
       //this._yenile(); 
       this._addkul(); 
       this._cline();   
       this.notificationService.success('::Submitted successfully');             
    }   
  } 
  ondel()
  {
        this.notificationService.warn('!Deleted successfully');     
        this._caSer._delkullanimAlani(this.kul).subscribe();  
       // this._yenile();
  } 


}
