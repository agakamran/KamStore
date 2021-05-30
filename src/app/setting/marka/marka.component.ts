import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { item_marka } from 'src/app/models/_settings';
import { NotificationService } from 'src/app/helpers/notification.service';
import { SettingsService } from 'src/app/services/settings.service';
import { Lang } from 'src/app/models/_carts';

@Component({
  selector: 'app-marka',
  templateUrl: './marka.component.html',
  styleUrls: ['./marka.component.scss']
})
export class MarkaComponent implements OnInit {
  marForm: FormGroup; 
  listmar:item_marka[] = []; 
  filteredmar: item_marka[];
  mar:item_marka=new item_marka(); 
  _lang:Lang[]=[{lid: '1', lname: 'Az'},{lid: '2', lname: 'En'},{lid: '3', lname: 'Ru'} ];  _lan='';
  _mar: item_marka[];  _pid:'';
  
  constructor(private _caSer: SettingsService,
     private notificationService: NotificationService) {
     this.mar.item_marka_Id="";
   }

   ngOnInit(): void {
    this.marForm = new FormGroup({  
     // firma_id: new FormControl('', [Validators.required,Validators.maxLength(36)]),   
     item_marka_name: new FormControl('', [Validators.required,Validators.maxLength(50)]),
  
        
    });  
      //this._caSer._getfirma().subscribe( p=>{ this._page=p;console.log(p)});  
      this._caSer._getitemmarka().subscribe(list=>
        { 
           this.listmar=list; 
           this.filteredmar = this.listmar; 
           console.log(this.listmar)                        
        }, error => console.error(error + 'Siz sistemə daxil olmalısınız!')); 
    }

get item_marka_name() { return this.marForm.get('item_marka_name'); }

langu(lan:any){  this._lan=lan; }
  _addmar()
  {
    this.mar.item_marka_Id='';   
    this.mar.item_marka_name=''; 
   
  }
  _cline(){ 
    this.marForm = new FormGroup({  
       
      item_marka_Id: new FormControl(''),
      item_marka_name: new FormControl(''),
    
      });
     
   }
   _editmar(ca:item_marka){ 
    //console.log('12111')   
    // console.log(ca)  
       this.mar.item_marka_Id=ca.item_marka_Id;
       this.mar.item_marka_name=ca.item_marka_name;//this._page.find(x=>x.pid==ca.pId).pagename;
      // this.fir.firma_telefon=ca.firma_telefon; 
      // this.fir.firma_unvan=ca.firma_unvan;
      // this.fir.voen=ca.voen,
      // this.fir.firma_email=this._storage.getemail();
      // this.fir.userId=this._storage.getId();      
     }
 onadd()
  { 
    if(this.marForm.valid)  
    {
       //console.log('333')
      // console.log(this.firForm.value)
       var p={
        item_marka_Id:this.mar.item_marka_Id  ,
        item_marka_name:this.marForm.value.item_marka_name,
        //firma_telefon:this.firForm.value.firma_telefon,
        //firma_unvan:this.firForm.value.firma_unvan,
        //voen:this.firForm.value.voen,
        //firma_email:this._storage.getemail(),
       // userId:this._storage.getId()
      
      }
      //  console.log(p)
       this._caSer._positemmarka(p).subscribe();  
       //this._yenile(); 
       this._addmar(); 
       this._cline();   
       this.notificationService.success('::Submitted successfully');                
                     
    }   
  } 
  ondel()
  {
        this.notificationService.warn('!Deleted successfully');     
        this._caSer._delitemmarka(this.mar).subscribe();  
       // this._yenile();
  } 

}
