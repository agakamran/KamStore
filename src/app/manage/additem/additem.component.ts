import { formatDate } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
//import { MdbTableDirective } from 'angular-bootstrap-md';
import { forkJoin, Observable } from 'rxjs';
import { getemail, getId} from 'src/app/auth/store/auth.selectors';
//import { flatMap } from 'rxjs/operators';
import { NotificationService } from 'src/app/helpers/notification.service';
import { Lang } from 'src/app/models/_carts';
import { beden, firma, gender, itemdetail, items_photo, item_categoriy, item_color, item_desen, item_marka, item_materal, item_stil, kullanimAlani, kumashtipi, qelip, qoltipi, yaka } from 'src/app/models/_settings';

import { AppState } from 'src/app/reducers';
import { SettingsService } from 'src/app/services/settings.service';
//import { UploadFilesService } from 'src/app/services/upload-files-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.scss']
})
export class AdditemComponent implements OnInit {
  //#region
   _Id:any;_email:any;
  itemForm: FormGroup; 
  listitem:itemdetail[] = []; 
  filtereditem: itemdetail[];
  item:itemdetail=new itemdetail(); 
  //itemphto:items_photo=new items_photo();
  _lang:Lang[]=[{lid: '1', lname: 'Az'},{lid: '2', lname: 'En'},{lid: '3', lname: 'Ru'} ];  _lan='';
  _item: itemdetail[];  _pid:'';  
  //-----------------------
  _gender: gender[];_gen:any; gender:string;
  _cate: item_categoriy[];_cat:any; catname: string;
  _cate1: item_categoriy[];
  _firma: firma[];_fir:any; firname: string;
  _marka: item_marka[];_mar:any; marname: string;
  _beden: beden[];_bed:any; bedname: string;
  _beden1: beden[];
  _color: item_color[];_col:any; colname: string;
  _qelip: qelip[];_qel:any; qelname: string;
  _qelip1: qelip[];
  _mater: item_materal[];_mat:any; matname: string;
  _mater1: item_materal[];
  _yaka: yaka[];_yak:any; yakname: string;
  _yaka1: yaka[];
  _qoltipi: qoltipi[];_qol:any; qolname: string;
  _qoltipi1: qoltipi[];
  _stil: item_stil[];_sti:any; stilname: string;
  //_stil1: item_stil[];
  _desen: item_desen[];_des:any; desname: string;
  _desen1: item_desen[];
  _kumash: kumashtipi[];_kum:any; kumname: string;
  _kumash1: kumashtipi[];
  _kullan: kullanimAlani[];_kul:any; kulname: string;
  _shomi:boolean=false;_shomi1:boolean=false;
  //#endregion
  //#endregion
  searchText: string = '';
  previous: string;
  headElements = ['firma_name','item_name','item_price','beden','gender_name','item_color','item_categoriy_name',

  // 'item_delivery','item_desen_name','item_discount','item_hidden','item_marka_name','item_materal_name','item_quantity','item_sales_price','item_stil_name','kullanim_name',
  // 'kumash_name','qaime_date','qelip_name','qoltipi_name','trEu','yaka_name'
   ,'Actions'
  ];
 // @ViewChild(MdbTableDirective, {static: true}) mdbTable:MdbTableDirective;
  
  //-----------------------
  constructor(private _store: Store<AppState>, private _caSer: SettingsService,
               private notificationService: NotificationService){                  
               }   
  imgsrc:string='../../../assets/default-image.png'; 
 // @HostListener('input') oninput() {  this.searchItems(); }
 // searchItems() {
  //  const prev = this.mdbTable.getDataSource();
  //  if (!this.searchText) {
  //      this.mdbTable.setDataSource(this.previous);
  //      this.listitem = this.mdbTable.getDataSource();
  //  }
  //  if (this.searchText) {
  //      this.listitem = this.mdbTable.searchLocalDataByMultipleFields(this.searchText, [
  //        'beden','gender_name','firma_name',
  //      'item_categoriy_name','item_color'
      //  ,'item_delivery','item_desen_name',
      //  'item_discount','item_hidden','item_marka_name','item_materal_name','item_name',
      //  'item_price','item_quantity','item_sales_price','item_stil_name','kullanim_name',
      //  'kumash_name','qaime_date','qelip_name','qoltipi_name','trEu','yaka_name'
      //   ,'Actions'
     // ]);
      // this.mdbTable.setDataSource(prev);
  // }
   //}
   ngOnInit(): void {
    this._store.select(getemail).subscribe(k=>{ this._email=k; })
    this._store.select(getId).subscribe(k=>{   this._Id=k;   })
     //#region 
   // console.log(this._email)  
    this.itemForm = new FormGroup({
      item_Id: new FormControl('', [Validators.maxLength(36)]),  
      firma_Id: new FormControl('', [Validators.required,Validators.maxLength(36)]),   
      gender_Id: new FormControl('', [Validators.required,Validators.maxLength(36)]),   
      item_categoriy_Id: new FormControl('', [Validators.required,Validators.maxLength(36)]),   
      item_marka_Id: new FormControl('', [Validators.required,Validators.maxLength(36)]),   
               
      item_color_Id: new FormControl('', [Validators.required,Validators.maxLength(36)]),   
      kulalan_Id: new FormControl('', [Validators.required,Validators.maxLength(36)]),
      item_stil_Id: new FormControl('', [Validators.required,Validators.maxLength(36)]),

      beden_Id: new FormControl('', [Validators.maxLength(36)]),
      qelip_Id: new FormControl('', [Validators.maxLength(36)]),
      item_materal_Id: new FormControl('', [Validators.maxLength(36)]),   
      yaka_Id: new FormControl('', [Validators.maxLength(36)]),   
      qol_Id: new FormControl('', [Validators.maxLength(36)]),         
      item_desen_Id: new FormControl('', [Validators.maxLength(36)]),     
      kumash_Id: new FormControl('', [Validators.maxLength(36)]), 

      item_name: new FormControl('', [Validators.required,Validators.maxLength(36)]),  
      item_code: new FormControl('', [Validators.required,Validators.maxLength(36)]),     
      item_price: new FormControl('', [Validators.required,Validators.required]),
      item_sales_price: new FormControl('', [Validators.required,Validators.required]), 
      item_quantity: new FormControl('', [Validators.required,Validators.required]),
      item_discount: new FormControl('', [Validators.required,Validators.required]),
      item_hidden: new FormControl(false),
      item_delivery: new FormControl(false),
      _file: new FormControl('', [Validators.required]) 
     //#endregion      
    });
      this._getit();
      this._ref();
    }
    //#region 
    get item_Id() { return this.itemForm.get('item_Id'); }
    get firma_Id() { return this.itemForm.get('firma_Id'); }
    get gender_Id() { return this.itemForm.get('gender_Id'); }
    get item_categoriy_Id() { return this.itemForm.get('item_categoriy_Id'); }
    get item_marka_Id() { return this.itemForm.get('item_marka_Id'); }
    get beden_Id() { return this.itemForm.get('beden_Id'); }
    get item_color_Id() { return this.itemForm.get('item_color_Id'); }
    get qelip_Id() { return this.itemForm.get('qelip_Id'); }
    get item_materal_Id() { return this.itemForm.get('item_materal_Id'); }
    get yaka_Id() { return this.itemForm.get('yaka_Id'); }
    get qol_Id() { return this.itemForm.get('qol_Id'); }
    get item_stil_Id() { return this.itemForm.get('item_stil_Id'); }
    get item_desen_Id() { return this.itemForm.get('item_desen_Id'); }
    get kulalan_Id() { return this.itemForm.get('kulalan_Id'); }
    get kumash_Id() { return this.itemForm.get('kumash_Id'); }
    get item_name() { return this.itemForm.get('item_name'); }
    get item_code() { return this.itemForm.get('item_code'); }
    get item_price() { return this.itemForm.get('item_price'); }
    get item_sales_price() { return this.itemForm.get('item_sales_price'); }
    get item_quantity() { return this.itemForm.get('item_quantity'); }
    get item_discount() { return this.itemForm.get('item_discount'); }
    get item_hidden() { return this.itemForm.get('item_hidden'); }
    get item_delivery() { return this.itemForm.get('item_delivery'); }
    get qaime_date() { return this.itemForm.get('qaime_date'); }  
    //#endregion
_ref(){
   //#region 
        var Alldat = [
        this._caSer._getgender(),
        this._caSer._getcategoriy(),
         this._caSer._getfirma(),
         this._caSer._getitemmarka(),
         this._caSer._getbeden(),
         this._caSer._getcolor(),
         this._caSer._getqelip(),
         this._caSer._getitemmateral(),
         this._caSer._getyaka(),
         this._caSer._getqoltipi(),
         this._caSer._getitemstil(),
         this._caSer._getitemdesen(),
         this._caSer._getkullanimAlani(),
         this._caSer._getkumashtipi()
      ]

      forkJoin( Alldat).subscribe(
        ([gen,ca,fir,mar,bed,col,qel,mat,yak,qolt,stil,des,kul,kum])=>{
          this._gender=gen;
          this._cate1=ca;
          this._firma=fir; 
          this._marka=mar; 
          this._beden1=bed;         
          this._color=col; 
          this._qelip1=qel; 
          this._mater1=mat; 
          this._yaka1=yak; 
          this._qoltipi1=qolt; 
          this._stil=stil; 
          this._desen1=des; 
          this._kullan=kul; 
          this._kumash1=kum; 
        },
        error=>{console.error(error + 'Siz sistemə daxil olmalısınız!')  }
      ) 
      //#endregion  
}    
langu(lan:any){  this._lan=lan; }
selgen(sel:any){
   this._gen=sel;
   this._cate=this._cate1.filter(v=>v.gender_Id===this._gender.find(x=>x.gender_name===this._gen)!.gender_Id &&v.parid !=null )   
}
selcate(sel:any){
 
  this._cat=sel; 
  this._yaka=this._qoltipi=this._kumash= this._qelip=this._mater=this._desen=[]; 
  
  this._beden=this._beden1.filter(x=>x.gender_Id===(this._gender.find(x=>x.gender_name===this._gen)!.gender_Id)&&
  x.item_categoriy_Id===this._cate1.find(t=>t.item_categoriy_name===sel && 
  t.gender_Id=== this._gender.find(x=>x.gender_name===this._gen)!.gender_Id)!.parid); 
  //console.log(this._beden)
 // console.warn(this._beden.length);
 this._shomi=false;this._shomi1=false;
  if(this._beden.length>0)
  {
    // _b.disabled =false;
    this._shomi=true;   
    // console.warn(this._beden.length);
    if(this._cate1.find(r=>r.item_categoriy_Id===this._cate1.find(t=>t.item_categoriy_name===sel && 
      t.gender_Id=== this._gender.find(x=>x.gender_name===this._gen)!.gender_Id)!.parid)!.item_categoriy_name==='Giyim')
      {    
        this._shomi1=true;
         this._yaka=this._yaka1.filter(x=>x.gender_Id===this._gender.find(x=>x.gender_name===this._gen)!.gender_Id);
         this._qoltipi=this._qoltipi1.filter(x=>x.gender_Id===this._gender.find(x=>x.gender_name===this._gen)!.gender_Id);
         this._kumash=this._kumash1;
         this._qelip=this._qelip1;
         this._mater=this._mater1;
         this._desen=this._desen1;
        // console.log(this._qelip1)       
       // console.warn(this._shomi);
      }      
  }
 
}
selfir(sel:any){ this._fir=sel;}
selmar(sel:any){ this._mar=sel;}
selbed(sel:any){ this._bed=sel;}
selcol(sel:any){ this._col=sel;}
selqel(sel:any){ this._qel=sel;}
selmater(sel:any){ this._mat=sel;}
selyaka(sel:any){ this._yak=sel;}
selqol(sel:any){ this._qol=sel;}
selstil(sel:any){ this._sti=sel;}
seldes(sel:any){ this._des=sel;}
selkull(sel:any){ this._kul=sel;}
selkumas(sel:any){ this._kum=sel;}


 async _edititem(ca:itemdetail)
 {
   // this. _additem();  
  // console.log(ca)
   
    this.urls=[]; 
     var bed;let kum;let qol;let yak;let mat;let des; let ccol;
      this.item.item_Id=ca.item_Id;  
      //console.log(this._firma.filter(t=>t.firma_Id===ca.firma_Id).firma_email)
      this.item.firma_Id=this._email;//this._firma.find(t=>t.firma_Id===ca.firma_Id)!.firma_email; 

      this.gender=this._gender.find(v=>v.gender_Id===ca.gender_Id)!.gender_name;     
      this.selgen(this.gender);   
      this.catname=this._cate1.find(e=>e.item_categoriy_Id===ca.item_categoriy_Id )!.item_categoriy_name; 
      this.selcate(this.catname); 
      this.marname=this._marka.find(r=>r.item_marka_Id===ca.item_marka_Id)!.item_marka_name; 
      this.selmar(this.marname)
      this.kulname=this._kullan.find(k=>k.kulalan_Id===ca.kulalan_Id)!.kullanim_name;
      this.stilname=this._stil.find(k=>k.item_stil_Id===ca.item_stil_Id)!.item_stil_name;   
      //console.log(ca.item_color_Id)

      if(ca.item_color_Id!=null){ ccol=this._color.find(k=>k.item_color_Id=== ca.item_color_Id)!.item_color;this.colname = ccol; }
      
     // console.log(this.colname)
     // console.log('-----------ZZZZ-----------')       
      this.item.item_name=ca.item_name;  
      this.item.item_code=ca.item_code;     
      this.item.item_price=ca.item_price; 
      this.item.item_sales_price=ca.item_sales_price; 
      this.item.item_quantity=ca.item_quantity;
      this.item.item_discount=ca.item_discount;
      this.item.item_hidden=ca.item_hidden;
      let dd=false;
      if(ca.item_delivery==true){dd=true; this.item.item_delivery=dd; }
      
      if(ca.beden_Id!=undefined && ca.beden_Id!='')
      {     
        //console.log(ca.beden_Id) 
        bed=this._beden1.find(k=>k.beden_Id===ca.beden_Id)!.trEu;
        this.bedname=bed; 
        this._shomi=true;
        this.selbed(this.bedname); 
      }
      if(ca.yaka_Id!=null && ca.yaka_Id!='')
      {
       // console.log(ca.yaka_Id) 
          yak=this._yaka1.find(k=>k.yaka_Id===ca.yaka_Id)!.yaka_name;  this.yakname =yak; this._shomi1=true;        
          this.selyaka(this.yakname)
          if(ca.qelip_Id!=null && ca.qelip_Id!=''){ qol=this._qelip.find(k=>k.qelip_Id===ca.qelip_Id)!.qelip_name; this.qelname =qol;}
          if(ca.item_materal_Id!=null){ mat=this._mater.find(k=>k.item_materal_Id===ca.item_materal_Id)!.item_materal_name;  this.matname=mat;  }
          if(ca.qol_Id!=null){ qol=this._qoltipi1.find(k=>k.qol_Id===ca.qol_Id)!.qoltipi_name; this.qolname=qol; }
          this.selqol( this.qolname) ;     
          if(ca.item_desen_Id!=null) { des=this._desen.find(k=>k.item_desen_Id===ca.item_desen_Id)!.item_desen_name; this.desname=des;}   
          if(ca.kumash_Id!=null){ kum=this._kumash.find(k=>k.kumash_Id===ca.kumash_Id)!.kumash_name;  this.kumname = kum;}    
      }
     // console.log('kkkk')  
     var k = await this._caSer._getitemsphoto(this.item.item_Id).toPromise()
     var s=k as items_photo[];
     let ad=environment.apiUrl.replace('/api/','/');
      for (let i = 0; i < s.length; i++) 
      {
        let slices = s[i].item_photo_url.split("/")
        let filename= slices[slices.length-1]    
        var res =  await fetch(ad+s[i].item_photo_url)      
        var blob = await res.blob()
        var file = new File([blob],filename);
        this.selectedFiles.push(file);
        this.urls.push(ad+s[i].item_photo_url); 
        //console.log(ad+s[i].item_photo_url)     
      }     
  }     
 async ondel() {
   console.log(this.item)
   var phot = await this._caSer._getitemsphoto(this.item.item_Id).toPromise() as items_photo[] ;
   //shekili silir
   for (let item of phot) {  await this._caSer._delitemsphoto(item).toPromise(); }
   this.item.qaime_date=formatDate(new Date(),  'yyyy-MM-dd T HH:mm:ss', 'en-US');
   await this._caSer._delitemdetail(this.item).toPromise()
    this.notificationService.warn('!Deleted successfully');
    this._getit();    
  } 
  async _additem()
  {
    //this.itemForm.reset();
    this.item.item_Id='';
    this.item.firma_Id=this._email;
   
    this.item.gender_Id='';     
    this.item.item_categoriy_Id='';  
    this.item.item_marka_Id='';  
    this.item.beden_Id='';          
    this.item.item_color_Id='';    
    this.item.qelip_Id='';
    this.item.item_materal_Id='';   
    this.item.yaka_Id='';  
    this.item.qol_Id='';    
    this.item.item_stil_Id='';    
    this.item.item_desen_Id='';
    this.item.kulalan_Id='';   
    this.item.kumash_Id='';   
    this.item.item_name=''; 
    this.item.item_code='';    
    this.item.item_price=0;
    this.item.item_sales_price=0; 
    this.item.item_quantity=0;
    this.item.item_discount=0;
    this.item.item_hidden=false;
    this.item.item_delivery=false;
    this.item.qaime_date='';
    this.selectedFiles = [];
    this.urls = [];
    this.gender=this.catname=this.marname=this.colname=this.kulname=this.stilname=
    this.bedname=this.yakname=this.qolname=this.kumname=this.qelname=this.matname=this.desname='';
    //console.log('BBB')
   // console.log(this.item.firma_Id)    
  }
  _cline(){ 
    this.itemForm = new FormGroup({  
      item_Id: new FormControl(''),   
      firma_Id: new FormControl(''),    
      gender_Id: new FormControl(''),   
      item_categoriy_Id: new FormControl(''),   
      item_marka_Id: new FormControl(''),   
      beden_Id: new FormControl(''),           
      item_color_Id: new FormControl(''),    
      qelip_Id: new FormControl(''), 
      item_materal_Id: new FormControl(''),    
      yaka_Id: new FormControl(''),   
      qol_Id: new FormControl(''),     
      item_stil_Id: new FormControl(''),     
      item_desen_Id: new FormControl(''), 
      kulalan_Id: new FormControl(''),    
      kumash_Id: new FormControl(''),    
      item_name: new FormControl(''),  
      item_code: new FormControl(''),     
      item_price: new FormControl(0), 
      item_sales_price: new FormControl(0), 
      item_quantity: new FormControl(0),
      item_discount: new FormControl(0),
      item_hidden: new FormControl(false),
      item_delivery: new FormControl(''), 
      qaime_date: new FormControl('')  
      });
     
   }

   //-------------------------
   //-------------
urls : string[]=[]
selectedFiles: File[] = [];
progressInfos = [];
message = '';
fileInfos: Observable<any>; 
_delFiles(index : number) 
{
   this.urls =  this.urls.filter((_,i) => i != index)
   this.selectedFiles =  this.selectedFiles.filter((_,i) => i != index)
}
_selectFiles(event:any) 
{
   this.progressInfos = [];  
   const files = Array.from(event.target.files) as File[];  
   let isImage = true;  
   for (let i = 0; i < files.length; i++) 
   {      
      if (files[i].type.match('image.*')){ continue;  }
     else{
       isImage = false;
       alert('invalid format!');
       break;
     }  
   }  
   if (isImage) 
   {     
     this.selectedFiles = this.selectedFiles.concat(files);     
     if(event.target.files)
     {       
       for(var i=0;i<this.selectedFiles.length;i++) 
       {      
         var reader=new FileReader()
         if (event.target.files[i]) 
         {
            reader.readAsDataURL(event.target.files[i]);           
         }         
         reader.onload=(event:any)=> 
         {
            this.urls.push(event.target.result)
         }         
       }
     }
   } 
   else
   {     
     //this.selectedFiles = undefined;
     event.srcElement.percentage = null;
   }
 } 
 async _uploadFiles() {
// console.log('33')  
//console.log(this.itemForm.value.item_delivery)
    let hid=false; 
   // let dd=false;   if(this.itemForm.value.item_delivery=="") {dd=true;}    
    this.message = '';  
    var bed='';let kum='';let qol='';let yak='';let qel='';let mat='';let des=''; let fir='';let geni='';let _itm='';
    geni=this._gender.find(g=>g.gender_name===this.itemForm.value.gender_Id)!.gender_Id;
    
    if(this._shomi)
    {
      bed=this._beden1.find(g=>g.trEu===this.itemForm.value.beden_Id)!.beden_Id;  
     // console.log('A!!!!!!')
      if(this._shomi1){       
       if(this._cate1.find(r=>r.item_categoriy_Id===this._cate1.find(t=>t.item_categoriy_name===this._cat && 
        t.gender_Id=== this._gender.find(x=>x.gender_name===this._gen)!.gender_Id)!.parid)!.item_categoriy_name==='Giyim')
        {           
            kum=this._kumash.find(h=>h.kumash_name===this.itemForm.value.kumash_Id)!.kumash_Id;
            yak=this._yaka1.find(h=>h.yaka_name===this.itemForm.value.yaka_Id)!.yaka_Id;
            qol=this._qoltipi1.find(h=>h.qoltipi_name===this.itemForm.value.qol_Id)!.qol_Id; 
            qel=this._qelip.find(h=>h.qelip_name===this.itemForm.value.qelip_Id)!.qelip_Id;  
            mat=this._mater.find(h=>h.item_materal_name===this.itemForm.value.item_materal_Id)!.item_materal_Id;
            des=this._desen.find(h=>h.item_desen_name===this.itemForm.value.item_desen_Id)!.item_desen_Id; 
        }  
      }
    }
    
    if(this.item.item_Id!=''){_itm=this.item.item_Id;}
   //console.log(this.item.firma_Id)
    // if(this.item.firma_Id!='')
    // {
    //   fir!=this._firma.find(g=>g.firma_email===this.item.firma_Id)!.firma_Id; 
    // }   
    var itemcatid='';
    if(this.itemForm.value.item_categoriy_Id!=undefined){
     itemcatid= this._cate1.find(g=>g.item_categoriy_name===this.itemForm.value.item_categoriy_Id)!.item_categoriy_Id  }   
  var itemmarkid='';
  if(this.itemForm.value.item_marka_Id!=undefined){
   itemmarkid=this._marka.find(g=>g.item_marka_name===this.itemForm.value.item_marka_Id)!.item_marka_Id }
   var itemcolid='';
   if(this.itemForm.value.item_color_Id!=undefined){
    itemcolid= this._color.find(h=>h.item_color===this.itemForm.value.item_color_Id)!.item_color_Id}
   var itemstilid='';
   if(this.itemForm.value.item_stil_Id!=undefined){
    itemstilid=this._stil.find(h=>h.item_stil_name===this.itemForm.value.item_stil_Id)!.item_stil_Id
   }
   var itemkulid='';
   if(this.itemForm.value.kulalan_Id!=undefined){
    itemkulid= this._kullan.find(h=>h.kullanim_name===this.itemForm.value.kulalan_Id)!.kulalan_Id
   }
   if(_itm===undefined){_itm='';}
     var p={
      item_Id:_itm ,
      firma_Id:this.item.firma_Id,
      gender_Id:geni,   
      item_categoriy_Id:itemcatid,   
      item_marka_Id:itemmarkid,         
      item_color_Id:itemcolid,
      item_stil_Id:itemstilid, 
      kulalan_Id:itemkulid,   

      item_desen_Id:des, qelip_Id:qel,item_materal_Id:mat, beden_Id:bed, yaka_Id:yak, qol_Id:qol, kumash_Id:kum, 
      item_name:this.itemForm.value.item_name, item_code:this.itemForm.value.item_code,     
      item_price:this.itemForm.value.item_price, item_sales_price:this.itemForm.value.item_sales_price, 
      item_quantity:this.itemForm.value.item_quantity,item_discount:this.itemForm.value.item_discount,
      item_hidden:false,item_delivery:this.itemForm.value.item_delivery,qaime_date:new Date().toISOString()
    }  
   console.log(p) 
 // console.log('SS')     
    let itm = await this._caSer._positemdetail(p).toPromise() as itemdetail

    var _p={ item_Id:itm.item_Id , firma_Id:itm.firma_Id, gender_Id:this.itemForm.value.gender_Id } 
    var phot = await this._caSer._getitemsphoto(_p.item_Id).toPromise() as items_photo[] ;
    //shekili silir
    for (let item of phot) {  await this._caSer._delitemsphoto(item).toPromise(); }
     //shekili elave edir
    for (let i = 0; i < this.selectedFiles.length; i++)  { 

       await this._caSer.upload(_p, this.selectedFiles[i]).toPromise()
    }
    this._additem(); 
    this._getit();    
    this._cline();   
    this.notificationService.success('::Submitted successfully'); 
  }    
_getit(){
  
  this._caSer._getitemdetail(this._Id).subscribe(list=>
  {   
        if(list!=[]){
          this.listitem=list;
         //  this.mdbTable.setDataSource(this.listitem);
        //this.previous = this.mdbTable.getDataSource();
        }                         
    }, error => console.error(error + 'Siz sistemə daxil olmalısınız!'));
  }  
}
