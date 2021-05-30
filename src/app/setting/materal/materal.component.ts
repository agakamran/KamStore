import { Component, OnInit } from '@angular/core';
import { item_materal } from 'src/app/models/_settings';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Lang } from 'src/app/models/_carts';
import { SettingsService } from 'src/app/services/settings.service';
import { NotificationService } from 'src/app/helpers/notification.service';

@Component({
  selector: 'app-materal',
  templateUrl: './materal.component.html',
  styleUrls: ['./materal.component.scss']
})
export class MateralComponent implements OnInit {
  matForm: FormGroup; 
  listmat:item_materal[] = []; 
  filteredmat: item_materal[];
  mat:item_materal=new item_materal(); 
  _lang:Lang[]=[{lid: '1', lname: 'Az'},{lid: '2', lname: 'En'},{lid: '3', lname: 'Ru'} ];  _lan='';
  _mat: item_materal[];  _pid:'';
  
  constructor( private _caSer: SettingsService,
     private notificationService: NotificationService) {
     this.mat.item_materal_Id="";
   }

   ngOnInit(): void {
    this.matForm = new FormGroup({  
     // firma_id: new FormControl('', [Validators.required,Validators.maxLength(36)]),   
     item_materal_name: new FormControl('', [Validators.required,Validators.maxLength(50)]),
  
        
    });  
      //this._caSer._getfirma().subscribe( p=>{ this._page=p;console.log(p)});  
      this._caSer._getitemmateral().subscribe(list=>
        { 
           this.listmat=list; 
           this.filteredmat = this.listmat; 
           console.log(this.listmat)                        
        }, error => console.error(error + 'Siz sistemə daxil olmalısınız!')); 
    }

get item_materal_name() { return this.matForm.get('item_materal_name'); }

langu(lan:any){  this._lan=lan; }
  _addmat()
  {
    this.mat.item_materal_Id='';   
    this.mat.item_materal_name=''; 
   
  }
  _cline(){ 
    this.matForm = new FormGroup({  
       
      item_materal_Id: new FormControl(''),
      item_materal_name: new FormControl(''),
    
      });
     
   }
   _editmat(ca:item_materal){ 
    //console.log('12111')   
     console.log(ca)  
       this.mat.item_materal_Id=ca.item_materal_Id;
       this.mat.item_materal_name=ca.item_materal_name;//this._page.find(x=>x.pid==ca.pId).pagename;
      // this.fir.firma_telefon=ca.firma_telefon; 
      // this.fir.firma_unvan=ca.firma_unvan;
      // this.fir.voen=ca.voen,
      // this.fir.firma_email=this._storage.getemail();
      // this.fir.userId=this._storage.getId();      
     }
 onadd()
  { 
    if(this.matForm.valid)  
    {
       //console.log('333')
      // console.log(this.firForm.value)
       var p={
        item_materal_Id:this.mat.item_materal_Id  ,
        item_materal_name:this.matForm.value.item_materal_name,
       
      
      }
      //  console.log(p)
       this._caSer._positemmateral(p).subscribe();  
       //this._yenile(); 
       this._addmat(); 
       this._cline();   
       this.notificationService.success('::Submitted successfully');                
                     
    }   
  } 
  ondel()
  {
        this.notificationService.warn('!Deleted successfully');     
        this._caSer._delitemmateral(this.mat).subscribe();  
       // this._yenile();
  } 

}
