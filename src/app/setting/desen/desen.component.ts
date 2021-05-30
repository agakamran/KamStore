import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
import { NotificationService } from 'src/app/helpers/notification.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Lang } from 'src/app/models/_carts';
import { item_desen } from 'src/app/models/_settings';

@Component({
  selector: 'app-desen',
  templateUrl: './desen.component.html',
  styleUrls: ['./desen.component.scss']
})
export class DesenComponent implements OnInit {
  desForm: FormGroup; 
  listdes:item_desen[] = []; 
  filtereddes: item_desen[];
  des:item_desen=new item_desen(); 
  _lang:Lang[]=[{lid: '1', lname: 'Az'},{lid: '2', lname: 'En'},{lid: '3', lname: 'Ru'} ];  _lan='';
  _des: item_desen[];  _pid:'';
  
  constructor(private _caSer: SettingsService,
     private notificationService: NotificationService) {
     this.des.item_desen_Id="";
   }

   ngOnInit(): void {
    this.desForm = new FormGroup({  
     // firma_id: new FormControl('', [Validators.required,Validators.maxLength(36)]),   
     item_desen_name: new FormControl('', [Validators.required,Validators.maxLength(50)]),
  
        
    });  
      //this._caSer._getfirma().subscribe( p=>{ this._page=p;console.log(p)});  
      this._caSer._getitemdesen().subscribe(list=>
        { 
           this.listdes=list; 
           this.filtereddes = this.listdes; 
           console.log(this.listdes)                        
        }, error => console.error(error + 'Siz sistemə daxil olmalısınız!')); 
    }

get item_desen_name() { return this.desForm.get('item_desen_name'); }

langu(lan:any){  this._lan=lan; }
  _adddes()
  {
    this.des.item_desen_Id='';   
    this.des.item_desen_name=''; 
   
  }
  _cline(){ 
    this.desForm = new FormGroup({  
       
      item_desen_Id: new FormControl(''),
      item_desen_name: new FormControl(''),
    
      });
     
   }
   _editdes(ca:item_desen){ 
    //console.log('12111')   
    // console.log(ca)  
       this.des.item_desen_Id=ca.item_desen_Id;
       this.des.item_desen_name=ca.item_desen_name;//this._page.find(x=>x.pid==ca.pId).pagename;
      // this.fir.firma_telefon=ca.firma_telefon; 
      // this.fir.firma_unvan=ca.firma_unvan;
      // this.fir.voen=ca.voen,
      // this.fir.firma_email=this._storage.getemail();
      // this.fir.userId=this._storage.getId();      
     }
 onadd()
  { 
    if(this.desForm.valid)  
    {
       //console.log('333')
      // console.log(this.firForm.value)
       var p={
        item_desen_Id:this.des.item_desen_Id  ,
        item_desen_name:this.desForm.value.item_desen_name,
        //firma_telefon:this.firForm.value.firma_telefon,
        //firma_unvan:this.firForm.value.firma_unvan,
        //voen:this.firForm.value.voen,
        //firma_email:this._storage.getemail(),
       // userId:this._storage.getId()
      
      }
      //  console.log(p)
       this._caSer._positemdesen(p).subscribe();  
       //this._yenile(); 
       this._adddes(); 
       this._cline();   
       this.notificationService.success('::Submitted successfully');                
                     
    }   
  } 
  ondel()
  {
        this.notificationService.warn('!Deleted successfully');     
        this._caSer._delitemdesen(this.des).subscribe();  
       // this._yenile();
  } 
}
