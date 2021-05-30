import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { item_categoriy, gender } from 'src/app/models/_settings';
import { Lang } from 'src/app/models/_carts';
import { SettingsService } from 'src/app/services/settings.service';
import { NotificationService } from 'src/app/helpers/notification.service';
import { Router } from '@angular/router';
import { flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-categoriya',
  templateUrl: './categoriya.component.html',
  styleUrls: ['./categoriya.component.scss']
})
export class CategoriyaComponent implements OnInit {
  pageTitle='';  
  _lang:Lang[]=[{lid: '1', lname: 'Az'},{lid: '2', lname: 'En'},{lid: '3', lname: 'Ru'} ];  _lan='';
  catForm: FormGroup; 
  listcat:item_categoriy[] = []; 
  //jsonlistcat:item_categoriy[] = [];
  filteredcat: item_categoriy[]; 
  cat:item_categoriy=new item_categoriy();
  _catt: any[]; _cat:any; catname: string;
  _gender: gender[];_gen:any; gendername: string;
  constructor(private _caSer: SettingsService, private notificationService: NotificationService, private router:Router) {
    this.cat.item_categoriy_Id="";
   }
   ngOnInit(): void {
    this.catForm = new FormGroup({ 
      item_categoriy_Id: new FormControl('', [Validators.maxLength(36)]), 
     parid: new FormControl('',[Validators.maxLength(36)]),
     gender_Id: new FormControl('', [Validators.required,Validators.maxLength(36)]),
     item_categoriy_name: new FormControl('', [Validators.required,Validators.maxLength(50)]),       
    });  
   
      this._caSer._getgender()
      .pipe(
        flatMap(p=>{
          this._gender=p          
        // return this._caSer._jsonCate()
       // }),
      //  flatMap(p=>{ 
       //    this.jsonlistcat=p  
          return this._caSer._getcategoriy()  
      })).subscribe(list=>
        { 
           this.listcat=list; 
           this.filteredcat = this.listcat; 
           this._catt=this.listcat;
           this._catt = this._catt.filter(f=>f.parid===null)

          // this._category();
          //console.log('mmm')   
         //  console.log(this._catt)                        
        }, error => console.error(error + 'Siz sistemə daxil olmalısınız!')); 
    }
   // get gender_name() { return this.catForm.get('gender_name'); }
    get item_categoriy_Id() { return this.catForm.get('item_categoriy_Id'); }
    get item_categoriy_name() { return this.catForm.get('item_categoriy_name'); }
    get parid() { return this.catForm.get('parid'); }
    langu(lan:any){  this._lan=lan; }
    selgen(sel:any){ this._gen=sel;}
    selcat(sel:any){ this._cat=sel;}
    _yenile(){this.router.navigate(["/setting/categoriya"]); }
    _cline(){ 
      this.catForm = new FormGroup({  
        item_categoriy_Id: new FormControl(''), 
        item_categoriy_name: new FormControl(''),
        gender_Id: new FormControl(''), 
        gender_name: new FormControl(''),  
        parid: new FormControl(''),   
        });       
     }
    _editcat(ca:item_categoriy){ 
      //  console.log(ca) 
      
        this.cat.item_categoriy_Id=ca.item_categoriy_Id;
        this.cat.item_categoriy_name=ca.item_categoriy_name; 
        if(ca.gender_Id!=null){
          this.gendername=this._gender.find(x=>x.gender_Id==ca.gender_Id)!.gender_name;
        }         

        if(ca.parid===null){this.catname=''} 
        else {
          this.catname=this._catt.find(x=>x.item_categoriy_Id==ca.parid)!.item_categoriy_name;          
        }        
        this.cat.gender_Id=ca.gender_Id;       
      }
    _addcat()
    {
    this.cat.gender_Id='';
    this.cat.item_categoriy_Id='';
    this.cat.parid='';
    this.cat.item_categoriy_name='';  
   }  
 onadd()
  { 
    if(this.catForm.valid)  
    {
     
       var kn;
       if(this._cat===undefined){kn=''}
       else{kn=this._catt.find(x=>x.item_categoriy_name==this._cat ).item_categoriy_Id}
       let genderId='';
       if(this.catForm.value.gender_Id!=null){
        this._gender.find(x=>x.gender_name==this.catForm.value.gender_Id )!.gender_Id
       }
       var p={       
        item_categoriy_Id:this.cat.item_categoriy_Id  ,
        item_categoriy_name:this.catForm.value.item_categoriy_name,
        gender_Id:genderId ,  
        parid:kn,       
      }
    
       this._caSer._poscategoriy(p).subscribe();        
       this._addcat(); 
       this._cline();  
       this._yenile(); 
       this.notificationService.success('::Submitted successfully');                
                     
    }   
  } 
  ondel()
  {
   // console.log(this.cat)
        this._caSer._delcategoriy(this.cat).subscribe();
        this._yenile();    
        this.notificationService.warn('!Deleted successfully'); 
      
  } 
   /*_category()
   {
    if(this.listcat.length===0)
    {
      for (let item of this.jsonlistcat) 
      {
        console.log(this._catt.find(x=>x.item_categoriy_name==item.parid )?.item_categoriy_Id)
        var kn;
       // if(item.parid===''){kn=''}
       // else{kn=this._catt.find(x=>x.item_categoriy_name==item.parid )?.item_categoriy_Id}
        var p={       
          item_categoriy_Id:''  ,
          item_categoriy_name:item.item_categoriy_name,
          gender_Id:this._gender.find(x=>x.gender_name==item.gender_Id ).gender_Id ,  
          parid:item.parid,       
        }
        //console.log(p) 
         this._caSer._poscategoriy(p).subscribe(); 
      }     
     }
     else
     {
      for (let it of this.listcat)
      {
          var kn;
         // console.log(it.parid)
          if(it.parid===''){kn=''}
          else{kn=this._catt.find(x=>x.item_categoriy_name==it.parid && x.gender_Id==it.gender_Id)?.item_categoriy_Id}
          var ps={       
            item_categoriy_Id:it.item_categoriy_Id  ,
            item_categoriy_name:it.item_categoriy_name,
            gender_Id:this._gender.find(x=>x.gender_Id==it.gender_Id )?.gender_Id ,  
            parid:kn,       
          }
          //console.log(ps) 
        // this._caSer._poscategoriy(ps).subscribe();  
        }
     }
   }*/
}
