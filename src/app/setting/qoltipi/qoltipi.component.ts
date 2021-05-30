import { Component, OnInit } from '@angular/core';
import { qoltipi,  gender } from 'src/app/models/_settings';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/helpers/notification.service';
import { SettingsService } from 'src/app/services/settings.service';
import { Lang } from 'src/app/models/_carts';

@Component({
  selector: 'app-qoltipi',
  templateUrl: './qoltipi.component.html',
  styleUrls: ['./qoltipi.component.scss']
})
export class QoltipiComponent implements OnInit {
  qolForm: FormGroup; 
  listqol:qoltipi[] = []; 
  filteredqol: qoltipi[];
  qol:qoltipi=new qoltipi(); 
  _lang:Lang[]=[{lid: '1', lname: 'Az'},{lid: '2', lname: 'En'},{lid: '3', lname: 'Ru'} ];  _lan='';
  _qol: qoltipi[];  _pid:'';
 // _cate: item_categoriy[];_cat; catname: string;
 _gender: gender[];_gen:string; gender:string;
  constructor( private _caSer: SettingsService,
     private notificationService: NotificationService) {
     this.qol.qol_Id="";
   }   
   ngOnInit(): void {
    this.qolForm = new FormGroup({  
     // qol_Id: new FormControl(''),   
     qoltipi_name: new FormControl('', [Validators.required,Validators.maxLength(50)]),   
     gender_Id: new FormControl('', [Validators.required,Validators.maxLength(50)]),   
    });  
      this._caSer._getgender().subscribe( p=>{ this._gender=p;//console.log(p)
       // this._cate=this._cate.filter(g=>g.parid==='')
      });  
      this._caSer._getqoltipi().subscribe(list=>
        { 
           this.listqol=list; 
           this.filteredqol = this.listqol; 
           console.log(this.listqol)                        
        }, error => console.error(error + 'Siz sistemə daxil olmalısınız!')); 
    }
get qoltipi_name() { return this.qolForm.get('qoltipi_name'); }
get gender_Id() { return this.qolForm.get('gender_Id'); }

langu(lan:any){  this._lan=lan; }
selgen(sel:any){ this._gen=sel;}
  _addqol() {
    this.qol.qol_Id='';   
    this.qol.qoltipi_name='';  
    this.qol.gender_Id='';  
  }
  _cline(){ 
    this.qolForm = new FormGroup({         
      qol_Id: new FormControl(''),
      qoltipi_name: new FormControl(''),   
      });     
   }
   _editqol(ca:qoltipi){ 
   // console.log('12111')   
    // console.log(ca)  
       this.qol.qol_Id=ca.qol_Id;
       this.qol.qoltipi_name=ca.qoltipi_name; 
       if(ca.gender_Id!=''){
         this.gender=this._gender.find(x=>x.gender_Id==ca.gender_Id)!.gender_name; 
       }     
        
       this.qol.gender_Id=ca.gender_Id;
      // console.log( this.catname)        
     }
 onadd()
  { 
    if(this.qolForm.valid)  
    {
      let genderId=''
       if(this.qolForm.value.gender_Id!=null){
        this._gender.find(x=>x.gender_name==this.qolForm.value.gender_Id )!.gender_Id
       }
       var p={
        qol_Id:this.qol.qol_Id  ,
        qoltipi_name:this.qolForm.value.qoltipi_name, 
        gender_Id: genderId     
      }
       // console.log(p)
       this._caSer._posqoltipi(p).subscribe();       
       this._addqol(); 
       this._cline();   
       this.notificationService.success('::Submitted successfully');             
    }   
  } 
  ondel()
  {
        this.notificationService.warn('!Deleted successfully');     
        this._caSer._delqoltipi(this.qol).subscribe();  
       // this._yenile();
  } 
}
