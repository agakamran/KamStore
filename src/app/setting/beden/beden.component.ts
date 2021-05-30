import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/helpers/notification.service';
import { SettingsService } from 'src/app/services/settings.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { beden, gender, item_categoriy } from 'src/app/models/_settings';
import { Lang } from 'src/app/models/_carts';
import { flatMap } from 'rxjs/operators';
@Component({
  selector: 'app-beden',
  templateUrl: './beden.component.html',
  styleUrls: ['./beden.component.scss']
})
export class BedenComponent implements OnInit {
  pageTitle='';  _Qa='';_ki='';
  bedenForm: FormGroup; 
  listbeden:beden[] = []; 
  _listbeden:beden[] = [];
  filteredbeden: beden[];  
  bed:beden=new beden();
  bedQad_Gey:beden[]; bedQad_ayaq:beden[]; bedQad_pant:beden[];  bedQad_kot:beden[];
  bedkishi_Gey:beden[]; bedkishi_ayaq:beden[]; bedkishi_pant:beden[];
  _lang:Lang[]=[{lid: '1', lname: 'Az'},{lid: '2', lname: 'En'},{lid: '3', lname: 'Ru'} ];  _lan='';
  _gender: gender[];_gen:string; gender:string;
  _page: item_categoriy[];_cate:any; catname: string; _pid:'';
  
  constructor( private _caSer: SettingsService,
    private notificationService: NotificationService) {
    this.bed.beden_Id="";
  }

  ngOnInit(): void {
    this.bedenForm = new FormGroup({       
      beden_Id: new FormControl(''),
      beden: new FormControl(''), 
      trEu: new FormControl(''),
      uk: new FormControl(''),
      us: new FormControl(''),
      it: new FormControl(''),
      koks: new FormControl(''),
      bel:new FormControl(''),
      ayakUz: new FormControl(''),
      ichBacakBoyu: new FormControl(''),
      yaka: new FormControl(''),
      kot: new FormControl(''),  
      kanvas: new FormControl(''),
      uzunluk: new FormControl(''),      
      catname: new FormControl('', [Validators.required,Validators.maxLength(50)]),
      gender_Id: new FormControl('', [Validators.required,Validators.maxLength(50)])        
    });  
   

        this._caSer._getgender()
        .pipe( flatMap(p=>{
            this._gender=p  
            //console.log(p) 
            return this._caSer._getcategoriy()         
          // return this._caSer._jsonCate()
          }),
          flatMap(p=>{ 
            this._page=p;
           // console.log(p)         
            return this._caSer._getbeden()  
        })      
        ).subscribe(list=>
          { 
            this.listbeden=list;  
            console.log(list)         
            this.filteredbeden = this.listbeden; 
            this._listbeden=this.listbeden;
            this._Qa=this._gender.find(x=>x.gender_name==='KADIN')!.gender_Id;
            this._ki=this._gender.find(x=>x.gender_name==='ERKEK')!.gender_Id;  
                                
          }, error => console.error(error + 'Siz sistemə daxil olmalısınız!')); 

}
get beden_Id() {return this.bedenForm.get('beden_Id');};
get beden() {return this.bedenForm.get('beden');};
get trEu() {return this.bedenForm.get('trEu');}; 
get uk() {return this.bedenForm.get('uk');};
get us() {return this.bedenForm.get('us');};
get it () {return this.bedenForm.get('it');};
get koks () {return this.bedenForm.get('koks');};
get bel() {return this.bedenForm.get('bel');};
get ayakUz() {return this.bedenForm.get('ayakUz');};
get ichBacakBoyu() {return this.bedenForm.get('ichBacakBoyu');};
get yaka() {return this.bedenForm.get('yaka');};  
get kot() {return this.bedenForm.get('kot');};
get kanvas () {return this.bedenForm.get('kanvas');};  
get uzunluk() {return this.bedenForm.get('uzunluk');};   
get item_categoriy_Id() {return this.bedenForm.get('item_categoriy_Id');}; 
get gender_Id() {return this.bedenForm.get('gender_Id');};
langu(lan:any){  this._lan=lan; }
selcate(sel:any){ this._cate=sel;}
selgen(sel:any){ this._gen=sel;}
_bedsize()
{
  //console.log( this._Qa)
  //console.log(this.bedQad_Gey)
  this._listbeden=this.listbeden;
  this.bedQad_Gey=this._listbeden.filter(x=>x.beden!=null && x.uk!=null && x.us!=null && x.it!=null&& x.koks!=null&& x.bel!=null && x.gender_Id===this._Qa)
  this._listbeden=this.listbeden;
  this.bedQad_ayaq=this._listbeden.filter(x=>x.trEu!=null && x.uk!=null&&x.us!=null&&x.ayakUz!=null&& x.gender_Id===this._Qa)
  
  this._listbeden=this.listbeden;
  this.bedQad_pant=this._listbeden.filter(x=>x.trEu!=null&& x.beden!=null&&x.bel!=null&& x.uk===null&& x.gender_Id===this._Qa)
  this._listbeden=this.listbeden;
  this.bedQad_kot=this._listbeden.filter(x=>x.trEu!=null&&x.bel!=null&& x.ichBacakBoyu!=null&& x.gender_Id===this._Qa)
  this._listbeden=this.listbeden;
  this.bedkishi_Gey=this._listbeden.filter(x=>x.beden!=null&& x.trEu!=null && x.uk!=null&&x.koks!=null&& x.yaka!=null&& x.gender_Id===this._ki)//x.gender_name==='Qadın'           
  this._listbeden=this.listbeden;
  this.bedkishi_ayaq=this._listbeden.filter(x=>x.trEu!=null && x.uk!=null&&x.us!=null&&x.ayakUz!=null&& x.gender_Id===this._ki)
  //console.log(this.bedkishi_ayaq)
  this._listbeden=this.listbeden;
  this.bedkishi_pant=this._listbeden.filter(x=>x.kot!=null&&x.bel!=null&& x.gender_Id===this._ki)
  //console.log(this.bedkishi_Gey)  
}
  _addbed()
  {      
    this.bed.beden_Id='';
    this.bed.beden='';
    this.bed.trEu='';
    this.bed.uk='';
    this.bed.us='';
    this.bed.it=''; 
    this.bed.koks='';
    this.bed.bel='';
    this.bed.ayakUz='';
    this.bed.ichBacakBoyu='';
    this.bed.yaka='';
    this.bed.kot='';
    //this.bed.kanvas='';
    this.bed.uzunluk=''; 
    this.bed.item_categoriy_Id='';
    this.bed.gender_Id=''; 
    
  }
  _cline(){ 
    this.bedenForm = new FormGroup({  
      beden:new FormControl(''),
      trEu: new FormControl(''),
      uk: new FormControl(''),
      us: new FormControl(''),
      it: new FormControl(''),
      koks: new FormControl(''),
      bel:new FormControl(''),
      ayakUz: new FormControl(''),
      ichBacakBoyu: new FormControl(''),
      yaka: new FormControl(''),
      kot: new FormControl(''),  
      kanvas: new FormControl(''),
      uzunluk: new FormControl(''),
      item_categoriy_Id: new FormControl(''),
      gender_Id: new FormControl('')       
      });  
         
   }
   _editbed(ca:beden){ 
      // console.log('12111')   
      // console.log(ca)  
       this.bed.beden_Id=ca.beden_Id;
       this.bed.beden=ca.beden;
       this.bed.trEu=ca.trEu;
       this.bed.uk=ca.uk; 
       this.bed.us=ca.us;
       this.bed.it=ca.it;
       this.bed.koks=ca.koks;
       this.bed.bel=ca.bel;
       this.bed.ayakUz=ca.ayakUz;
       this.bed.ichBacakBoyu=ca.ichBacakBoyu;
       this.bed.yaka=ca.yaka;
       this.bed.kot=ca.kot;
      // this.bed.kanvas=ca.kanvas;
       this.bed.uzunluk=ca.uzunluk;
       if(ca.gender_Id!=''){
         this.gender=this._gender.find(x=>x.gender_Id==ca.gender_Id)!.gender_name;
       }       
       this.bed.gender_Id=ca.gender_Id;
       if(ca.item_categoriy_Id!=''){
         this.catname=this._page.find(x=>x.item_categoriy_Id==ca.item_categoriy_Id)!.item_categoriy_name; 
       }
       
       this.bed.item_categoriy_Id=ca.item_categoriy_Id;
       if(ca.gender_Id!=null){
         this.gender=this._gender.find(x=>x.gender_Id==ca.gender_Id)!.gender_name;
       }
       
      //this.bed.gender_Id=ca.gender_Id;
     }
 onadd()
  { 
    if(this.bedenForm.valid)  
    {
       console.log('333')
      // console.log(this.bed.gender_Id)
      // console.log(this.gender)
      // console.log(this.bedenForm.value)
      let itemcatid=''
      if(this.catname!=''){
       itemcatid=this._page.find(x=>x.item_categoriy_name==this.catname )!.item_categoriy_Id
      }
        var p={
        beden_Id:this.bed.beden_Id  ,
        beden:this.bed.beden,
        trEu:this.bedenForm.value.trEu,
        uk:this.bedenForm.value.uk,
        us:this.bedenForm.value.us,
        it:this.bedenForm.value.it,
        koks:this.bedenForm.value.koks,
        bel:this.bedenForm.value.bel,
        ayakUz:this.bedenForm.value.ayakUz,
        ichBacakBoyu:this.bedenForm.value.ichBacakBoyu,
        yaka:this.bedenForm.value.yaka,
        kot:this.bedenForm.value.kot,
        kanvas:this.bedenForm.value.kanvas,
        uzunluk:this.bedenForm.value.uzunluk,
        item_categoriy_Id:itemcatid,
        gender_Id:this._gender.find(x=>x.gender_name==this.gender)!.gender_Id  
         
      }
     // console.log('222222222')
       console.log(p)
      // console.log('33')
       this._caSer._posbeden(p).subscribe();  
       //this._yenile(); 
       this._addbed(); 
       this._cline();   
       this.notificationService.success('::Submitted successfully');                
                     
    }   
  } 
  ondel()
  {
        this.notificationService.warn('!Deleted successfully');     
        this._caSer._delbeden(this.bed).subscribe();  
       // this._yenile();
  } 

}
