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
     this.qol.qolId="";
   }   
   ngOnInit(): void {
    this.qolForm = new FormGroup({  
     // qol_Id: new FormControl(''),   
     qoltipiname: new FormControl('', [Validators.required,Validators.maxLength(50)]),   
     genId: new FormControl('', [Validators.required,Validators.maxLength(50)]),   
    });  
      this._caSer._getgender().subscribe( p=>{ this._gender=p;  //console.log(p)
       // this._cate=this._cate.filter(g=>g.parid==='')
      });  
      this._caSer._getqoltipi().subscribe(list=>
        { 
           this.listqol=list; 
           this.filteredqol = this.listqol; 
          // console.log(this.listqol)                        
        }, error => console.error(error + 'Siz sistemə daxil olmalısınız!')); 
    }
get qoltipiname() { return this.qolForm.get('qoltipiname'); }
get genId() { return this.qolForm.get('genId'); }

langu(lan:any){  this._lan=lan; }
selgen(sel:any){ this._gen=sel;}
  _addqol() {
    this.qol.qolId='';   
    this.qol.qoltipiname='';  
    this.qol.genId='';  
  }
  _cline(){ 
    this.qolForm = new FormGroup({         
      qolId: new FormControl(''),
      qoltipiname: new FormControl(''),   
      });     
   }
   _editqol(ca:qoltipi){ 
   // console.log('12111')   
    // console.log(ca)  
       this.qol.qolId=ca.qolId;
       this.qol.qoltipiname=ca.qoltipiname; 
       if(ca.genId!=''){
         this.gender=this._gender.find(x=>x.genId==ca.genId)!.genname; 
       }     
        
       this.qol.genId=ca.genId;
      // console.log( this.catname)        
     }
 onadd()
  { 
    if(this.qolForm.valid)  
    {
      let genderId=''
       if(this.qolForm.value.genId!=null){
        this._gender.find(x=>x.genname==this.qolForm.value.genId )!.genname
       }
       var p={
        qolId:this.qol.qolId  ,
        qoltipiname:this.qolForm.value.qoltipiname, 
        genId: genderId     
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
