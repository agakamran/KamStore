import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { _categoriy, gender } from 'src/app/models/_settings';
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
  listcat:_categoriy[] = []; 
  //jsonlistcat:item_categoriy[] = [];
  filteredcat: _categoriy[]; 
  cat:_categoriy=new _categoriy();
  _catt: any[]; _cat:any; _catname: string;
  _gender: gender[];_gen:any; gendername: string;
  constructor(private _caSer: SettingsService, private notificationService: NotificationService, private router:Router) {
    this.cat.catId="";
   }
   ngOnInit(): void {
    this.catForm = new FormGroup({ 
      catId: new FormControl('', [Validators.maxLength(36)]), 
     parid: new FormControl('',[Validators.maxLength(36)]),
     genId: new FormControl('', [Validators.required,Validators.maxLength(36)]),
     catname: new FormControl('', [Validators.required,Validators.maxLength(50)]),       
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
   // get genname() { return this.catForm.get('genname'); }
    get catId() { return this.catForm.get('catId'); }
    get catname() { return this.catForm.get('catname'); }
    get parid() { return this.catForm.get('parid'); }
    langu(lan:any){  this._lan=lan; }
    selgen(sel:any){ this._gen=sel;}
    selcat(sel:any){ this._cat=sel;}
    _yenile(){this.router.navigate(["/setting/categoriya"]); }
    _cline(){ 
      this.catForm = new FormGroup({  
        catId: new FormControl(''), 
        catname: new FormControl(''),
        genId: new FormControl(''), 
        genname: new FormControl(''),  
        parid: new FormControl(''),   
        });       
     }
    _editcat(ca:_categoriy){ 
      //  console.log(ca) 
      
        this.cat.catId=ca.catId;
        this.cat.catname=ca.catname; 
        if(ca.genId!=null){
          this.gendername=this._gender.find(x=>x.genId==ca.genId)!.genname;
        }         

        if(ca.parid===null){this._catname=''} 
        else {
          this._catname=this._catt.find(x=>x.catId==ca.parid)!.catname;          
        }        
        this.cat.genId=ca.genId;       
      }
    _addcat()
    {
    this.cat.genId='';
    this.cat.catId='';
    this.cat.parid='';
    this.cat.catname='';  
   }  
 onadd()
  { 
    if(this.catForm.valid)  
    {
     
       var kn;
       if(this._cat===undefined){kn=''}
       else{kn=this._catt.find(x=>x.catname==this._cat ).catId}
       let genderId='';
       if(this.catForm.value.genId!=null){
        this._gender.find(x=>x.genname==this.catForm.value.genId )!.genId
       }
       var p={       
        catId:this.cat.catId  ,
        catname:this.catForm.value.catname,
        genId:genderId ,  
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
        console.log(this._catt.find(x=>x.catname==item.parid )?.catId)
        var kn;
       // if(item.parid===''){kn=''}
       // else{kn=this._catt.find(x=>x.catname==item.parid )?.catId}
        var p={       
          catId:''  ,
          catname:item.catname,
          genId:this._gender.find(x=>x.genname==item.genId ).genId ,  
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
          else{kn=this._catt.find(x=>x.catname==it.parid && x.genId==it.genId)?.catId}
          var ps={       
            catId:it.catId  ,
            catname:it.catname,
            genId:this._gender.find(x=>x.genId==it.genId )?.genId ,  
            parid:kn,       
          }
          //console.log(ps) 
        // this._caSer._poscategoriy(ps).subscribe();  
        }
     }
   }*/
}
