import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { _color } from 'src/app/models/_settings';
import { Lang } from 'src/app/models/_carts';
import { NotificationService } from 'src/app/helpers/notification.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.scss']
})
export class ColorsComponent implements OnInit {
  colForm: FormGroup; 
  listcol:_color[] = [];
 // jsonlistcol:item_color[] = [];
  filteredcol: _color[];
  col:_color=new _color(); 
  _lang:Lang[]=[{lid: '1', lname: 'Az'},{lid: '2', lname: 'En'},{lid: '3', lname: 'Ru'} ];  _lan='';
  _col: _color[];  _pid:'';
  
  constructor( private _caSer: SettingsService,
     private notificationService: NotificationService) {
     this.col.colId="";
   }

   ngOnInit(): void {
    this.colForm = new FormGroup({  
     // firma_id: new FormControl('', [Validators.required,Validators.maxLength(36)]),   
       colname: new FormControl('', [Validators.required,Validators.maxLength(50)]),
       colurl: new FormControl('', [Validators.maxLength(50)]),
     // firma_unvan: new FormControl('', [Validators.required,Validators.maxLength(50)]),  
     // firma_email: new FormControl('', [Validators.required,Validators.maxLength(50)]),
    //  voen: new FormControl(0, [Validators.required])        
    });  
      //this._caSer._getfirma().subscribe( p=>{ this._page=p;console.log(p)});  

      //this._caSer._jsonCol().subscribe(p=>{
      //this.jsonlistcol=p
      // console.log(p)
       // this._Jsonaddcol(); 
      //})
     
      this._caSer._getcolor().subscribe(list=>
      {         
           this.listcol=list; 
           this.filteredcol = this.listcol; 
          // console.log(this.listcol)                        
      }, error => console.error(error + 'Siz sistemə daxil olmalısınız!')); 
       
}
get color() { return this.colForm.get('color'); }
//get firma_telefon() { return this.firForm.get('firma_telefon'); }
//get firma_unvan() { return this.firForm.get('firma_unvan'); }
//get firma_email() { return this.firForm.get('firma_email'); }
//get voen() { return this.firForm.get('voen'); }
langu(lan:any){  this._lan=lan; }
//selPage(sel){ this._pid=sel;}
//selrol(sel){ this._rol=sel;}
  _addcol()
  {
    this.col.colname='';   
    this.col.colId=''; 
    this.col.colurl='';   
  }
  _cline(){ 
    this.colForm = new FormGroup({  
       
      colId: new FormControl(''),
      colname: new FormControl(''),
      colurl: new FormControl(''),
      });
     
   }
   _editcol(ca:_color){ 
    //console.log('12111')   
    // console.log(ca)  
       this.col.colId=ca.colId;
       this.col.colname=ca.colname;//this._page.find(x=>x.pid==ca.pId).pagename;
       this.col.colurl=ca.colurl;      
     }
 onadd()
  { 
    if(this.colForm.valid)  
    {
       //console.log('333')
      // console.log(this.firForm.value)
       var p={
        colId:this.col.colId  ,
        colname:this.colForm.value.colname,
        colurl:this.colForm.value.colurl
        //firma_unvan:this.firForm.value.firma_unvan,
        //voen:this.firForm.value.voen,
        //firma_email:this._storage.getemail(),
       // userId:this._storage.getId()
      
      }
      //  console.log(p)
       this._caSer._poscolor(p).subscribe();  
       //this._yenile(); 
       this._addcol(); 
       this._cline();   
       this.notificationService.success('::Submitted successfully');                 
    }   
  } 
  ondel()
  {
        this.notificationService.warn('!Deleted successfully');     
        this._caSer._delcolor(this.col).subscribe();  
       // this._yenile();
  } 
 /* _Jsonaddcol()
  {
    //console.log(this.listcol)
    if(this.listcol.length===0)
    {
      for (let item of this.jsonlistcol) 
      {
        var p={
          item_color_Id:''  ,
          item_color:item.item_color,
          url_color:item.url_color     
        }
       // this._caSer._poscolor(p).subscribe();  
        console.log(item)
      }
    }
  }*/
}
