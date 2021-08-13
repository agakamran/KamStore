import { formatDate } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { forkJoin, Observable } from 'rxjs';
import { getemail, getId, getpercent} from 'src/app/auth/store/auth.selectors';
import { NotificationService } from 'src/app/helpers/notification.service';
import { Lang } from 'src/app/models/_carts';
import { beden, firma, gender, product, prodphoto, _categoriy, _color, _desen, _marka, _materal, _stil, kullanimAlani, kumashtipi, qelip, qoltipi, yaka } from 'src/app/models/_settings';
import { AppState } from 'src/app/reducers';
import { SettingsService } from 'src/app/services/settings.service';
import { environment } from 'src/environments/environment';
//import { UploadFilesService } from 'src/app/services/upload-files-service.service';
//import { flatMap } from 'rxjs/operators';
//import { MdbTableDirective } from 'angular-bootstrap-md';
@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.scss']
})
export class AdditemComponent implements OnInit {
  //#region
   _Id:any;_email:any;
  itemForm: FormGroup; 
  listitem:product[] = []; 
  filtereditem: product[];
  item:product=new product(); 
  //itemphto:items_photo=new items_photo();
  _lang:Lang[]=[{lid: '1', lname: 'Az'},{lid: '2', lname: 'En'},{lid: '3', lname: 'Ru'} ];  _lan='';
  _item: product[];  _pid:'';  
  //-----------------------
  _gender: gender[];_gen:any; gender:string;
  _cate: _categoriy[];_cat:any; catname: string;
  _cate1: _categoriy[];
  _firma: firma[];_fir:any; firname: string;
  _marka: _marka[];_mar:any; marname: string;
  _beden: beden[];_bed:any; bedname: string;
  _beden1: beden[];
  _color: _color[];_col:any; colname: string;
  _qelip: qelip[];_qel:any; qelname: string;
  _qelip1: qelip[];
  _mater: _materal[];_mat:any; matname: string;
  _mater1: _materal[];
  _yaka: yaka[];_yak:any; yakname: string;
  _yaka1: yaka[];
  _qoltipi: qoltipi[];_qol:any; qolname: string;
  _qoltipi1: qoltipi[];
  _stil: _stil[];_sti:any; stilname: string;
  //_stil1: _stil[];
  _desen: _desen[];_des:any; desname: string;
  _desen1: _desen[];
  _kumash: kumashtipi[];_kum:any; kumname: string;
  _kumash1: kumashtipi[];
  _kullan: kullanimAlani[];_kul:any; kulname: string;
  _shomi:boolean=true;_shomi1:boolean=true;
  //#endregion
  //#endregion
  searchText: string = '';
  previous: string; //'firmaname',
  headElements = ['imag','_name','_buy_unitprice','genname','beden','trEu','_color','_catname',

  // '_delivery','_desenname','_discount','_hidden','_markaname','_materalname','_unitsinstock','_sales_price','_stil_name','kullanim_name',
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
      //  'item_discount','item_hidden','markaname','matname','item_name',
      //  'item_buy_unitprice','item_unitsinstock','item_sales_price','item_stil_name','kullanim_name',
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
      proId: new FormControl('', [Validators.maxLength(36)]),
      genId: new FormControl('', [Validators.required,Validators.maxLength(36)]),
      catId: new FormControl('', [Validators.required,Validators.maxLength(36)]),      
      markaId: new FormControl('', [Validators.required,Validators.maxLength(36)]), 
      qelipId: new FormControl('', [Validators.maxLength(36)]),             
      matId: new FormControl('', [Validators.maxLength(36)]),
      yakaId: new FormControl('', [Validators.maxLength(36)]),
      qolId: new FormControl('', [Validators.maxLength(36)]), 
      stilId: new FormControl('', [Validators.required,Validators.maxLength(36)]),
      desenId: new FormControl('', [Validators.maxLength(36)]),
      kulalanId: new FormControl('', [Validators.required,Validators.maxLength(36)]),
      kumashId: new FormControl('', [Validators.maxLength(36)]), 
      desId:new FormControl('', [Validators.maxLength(36)]), 
      bedenId: new FormControl('', [Validators.maxLength(36)]), 
      colId: new FormControl('', [Validators.required,Validators.maxLength(36)]),    
      prodname: new FormControl('', [Validators.required,Validators.maxLength(36)]),    
      barcode: new FormControl(0),  
      storId: new FormControl('', [Validators.required,Validators.maxLength(36)]),  
      boxquantity: new FormControl(1, [Validators.required,Validators.required]),
      unitsinstock: new FormControl(1, [Validators.required,Validators.required]),        
      buy_unitprice: new FormControl('', [Validators.required,Validators.required]),
      sell_unitprice: new FormControl('', [Validators.required,Validators.required]),    
      discount: new FormControl('', [Validators.required,Validators.required]),     
      Discontinued: new FormControl(false),
      delivery: new FormControl(false),
      _file: new FormControl('', [Validators.required]) 
     //#endregion      
    });
      this._getit();
      this._ref();
    }
    //#region 
    // get proId() { return this.itemForm.get('proId'); }
    // get storId() { return this.itemForm.get('storId'); }
    // get genId() { return this.itemForm.get('genId'); }
    // get catId() { return this.itemForm.get('catId'); }
    // get markaId() { return this.itemForm.get('markaId'); }
    // get bedenId() { return this.itemForm.get('bedenId'); }
    // get colId() { return this.itemForm.get('colId'); }
    // get qelipId() { return this.itemForm.get('qelipId'); }
    // get matId() { return this.itemForm.get('matId'); }
    // get yakaId() { return this.itemForm.get('yakaId'); }
    // get qolId() { return this.itemForm.get('qolId'); }
    // get stilId() { return this.itemForm.get('stilId'); }
    // get desId() { return this.itemForm.get('desId'); }
    // get kulalanId() { return this.itemForm.get('kulalanId'); }
    // get kumashId() { return this.itemForm.get('kumashId'); }
    // get itemname() { return this.itemForm.get('name'); }
    // get barcode() { return this.itemForm.get('barcode'); }
    // get buy_unitprice() { return this.itemForm.get('buy_unitprice'); }
    // get sell_unitprice() { return this.itemForm.get('sell_unitprice'); }
    // get unitsinstock() { return this.itemForm.get('unitsinstock'); }
    // get discount() { return this.itemForm.get('discount'); }
    // get hidden() { return this.itemForm.get('hidden'); }
    // get delivery() { return this.itemForm.get('delivery'); }
    // get ModifiedDate() { return this.itemForm.get('ModifiedDate'); }  
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
         // console.log(bed)
        },
        error=>{console.error(error + 'Siz sistemə daxil olmalısınız!')  }
      ) 
      //#endregion  
}    
langu(lan:any){  this._lan=lan; }
selgen(sel:any){
   this._gen=sel;
   this._cate=this._cate1.filter(v=>v.genId===this._gender.find(x=>x.genname===this._gen)!.genId &&v.parid !=null )   
}
selcate(sel:any){ 
  this._cat=sel; 
  this._yaka=this._qoltipi=this._kumash= this._qelip=this._mater=this._desen=[]; 
 // console.log(this._beden1)
 // console.log(this._cate1.find(t=>t.catname===sel &&  t.genId=== this._gender.find(x=>x.genname===this._gen)!.genId))
  this._beden=this._beden1.filter(x=>x.genId===(this._gender.find(x=>x.genname===this._gen)!.genId)&&
  x.catId===this._cate1.find(t=>t.catname===sel &&  t.genId=== this._gender.find(x=>x.genname===this._gen)!.genId)!.parid); 
  //console.log(this._beden)
 // console.warn(this._beden.length);
 this._shomi=false;this._shomi1=false;
  if(this._beden.length>0)
  {
    // _b.disabled =false;
    this._shomi=true;  
   // console.log('ZX') 
    // console.warn(this._beden.length);
    if(this._cate1.find(r=>r.catId===this._cate1.find(t=>t.catname===sel && 
      t.genId=== this._gender.find(x=>x.genname===this._gen)!.genId)!.parid)!.catname==='Giyim')
      {    
       // console.log('AAAA') 
        this._shomi1=true;
         this._yaka=this._yaka1.filter(x=>x.genId===this._gender.find(x=>x.genname===this._gen)!.genId);
         this._qoltipi=this._qoltipi1.filter(x=>x.genId===this._gender.find(x=>x.genname===this._gen)!.genId);
         this._kumash=this._kumash1;
         this._qelip=this._qelip1;
         this._mater=this._mater1;
         this._desen=this._desen1;
       //  console.log(this._qelip1)       
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


 async _edititem(ca:product)
 {
   // this. _additem();  
  // console.log(ca)
   
    this.urls=[]; 
     var bed;let kum;let qol;let yak;let mat;let des; let ccol;
      this.item.proId=ca.proId;
      this.item.storId=this._email;
      this.gender=this._gender.find(v=>v.genId===ca.genId)!.genname;     
      this.selgen(this.gender);   
      this.catname=this._cate1.find(e=>e.catId===ca.catId )!.catname; 
      this.selcate(this.catname); 
      this.marname=this._marka.find(r=>r.markaId===ca.markaId)!.markaname; 
      this.selmar(this.marname)
      this.kulname=this._kullan.find(k=>k.kulalanId===ca.kulalanId)!.kullanimname;
      this.stilname=this._stil.find(k=>k.stilId===ca.stilId)!.stilname;   
      //console.log(ca.item_color_Id)

      if(ca.colId!=null){
       
         ccol=this._color.find(k=>k.colId=== ca.colId)!.colname;this.colname = ccol; 
         for(let i=0;i<this._color.length;i++){
           this._color[i].isChecked=false;
           if(this._color[i].colname===ccol){
             this._color[i].isChecked=true;
             //console.log(this._color[i].colname)
            }
          }
        }
     // console.log(ccol)
      
       
      this.item.prodname=ca.prodname;  
      this.item.barcode=ca.barcode;     
      this.item.buy_unitprice=ca.buy_unitprice; 
      this.item.sell_unitprice=ca.sell_unitprice; 
      this.item.unitsinstock=ca.unitsinstock;
      this.item.boxquantity=ca.boxquantity;
      this.item.discount=ca.discount;
      this.item.Discontinued=ca.Discontinued;
      let dd=false;
      if(ca.delivery==true){dd=true; this.item.delivery=dd; }
      
      if(ca.bedenId!=undefined && ca.bedenId!='')
      {  
        bed=this._beden1.find(k=>k.bedenId===ca.bedenId)!.trEu;
        this.bedname=bed; 
        this._shomi=true;
        this.selbed(this.bedname); 
      }
      if(ca.yakaId!=null && ca.yakaId!='')
      {
          yak=this._yaka1.find(k=>k.yakaId===ca.yakaId)!.yakaname;  this.yakname =yak; this._shomi1=true;        
          this.selyaka(this.yakname)
          if(ca.qelipId!=null && ca.qelipId!=''){ qol=this._qelip.find(k=>k.qelipId===ca.qelipId)!.qelipname; this.qelname =qol;}
          if(ca.matId!=null){ mat=this._mater.find(k=>k.matId===ca.matId)!.matname;  this.matname=mat;  }
          if(ca.qolId!=null){ qol=this._qoltipi1.find(k=>k.qolId===ca.qolId)!.qoltipiname; this.qolname=qol; }
          this.selqol( this.qolname) ;     
          if(ca.desId!=null) { des=this._desen.find(k=>k.desId===ca.desId)!.desname; this.desname=des;}   
          if(ca.kumashId!=null){ kum=this._kumash.find(k=>k.kumashId===ca.kumashId)!.kumashname;  this.kumname = kum;}    
      }
     // console.log('kkkk')  
     var k = await this._caSer._getitemsphoto(this.item.proId).toPromise()
     var s=k as prodphoto[];
     let ad=environment.apiUrl.replace('/api/','/');
      for (let i = 0; i < s.length; i++) 
      {
        let slices = s[i].photourl.split("/")
        let filename= slices[slices.length-1]    
        var res =  await fetch(ad+s[i].photourl)      
        var blob = await res.blob()
        var file = new File([blob],filename);
        this.selectedFiles.push(file);
        this.urls.push(ad+s[i].photourl); 

        //console.log(ad+s[i].item_photo_url)     
      }     
  }     
 async ondel() {
  // console.log(this.item)
   var phot = await this._caSer._getitemsphoto(this.item.proId).toPromise() as prodphoto[] ;
   //shekili silir
   for (let item of phot) {  await this._caSer._delitemsphoto(item).toPromise(); }
   this.item.ModifiedDate=formatDate(new Date(),  'yyyy-MM-dd T HH:mm:ss', 'en-US');
   await this._caSer._delitemdetail(this.item).toPromise()
    this.notificationService.warn('!Deleted successfully');
    this._getit();    
  } 
  async _additem()
  {    
    for(let i=0;i<this._color.length;i++){this._color[i].isChecked=false;}
    this.item.proId='';
    this.item.storId=this._email;
   
    this.item.genId='';     
    this.item.catId='';  
    this.item.markaId='';  
    this.item.bedenId='';          
   // this.item.colId='';    
    this.item.qelipId='';
    this.item.matId='';   
    this.item.yakaId='';  
    this.item.qolId='';    
    this.item.stilId='';    
    this.item.desId='';
    this.item.kulalanId='';   
    this.item.kumashId='';   
    this.item.prodname=''; 
   // this.item.barcode=0;    
    this.item.buy_unitprice=0;
    this.item.sell_unitprice=0;
    this.item.boxquantity=1; 
    this.item.unitsinstock=1;
    this.item.discount=0;  //skidka
    this.item.Discontinued=false; //satishdan chixarilib
    this.item.delivery=false; //dastavka
    this.item.ModifiedDate='';
    this.selectedFiles = [];
    this.urls = [];
    this.gender=this.catname=this.marname=this.colname=this.kulname=this.stilname=
    this.bedname=this.yakname=this.qolname=this.kumname=this.qelname=this.matname=this.desname='';
    this.barkod();
    //console.log('BBB')
   // console.log(this.item.firma_Id)    
  }
  _cline(){ 
    this.itemForm = new FormGroup({  
      proId: new FormControl(''),   
      storId: new FormControl(''),    
      genId: new FormControl(''),   
      catId: new FormControl(''),   
      markaId: new FormControl(''),   
      bedenId: new FormControl(''),           
      colId: new FormControl(''),    
      qelipId: new FormControl(''), 
      matId: new FormControl(''),    
      yakaId: new FormControl(''),   
      qolId: new FormControl(''),     
      stilId: new FormControl(''),     
      desId: new FormControl(''), 
      kullanimId: new FormControl(''),    
      kumashId: new FormControl(''),    
      prodname: new FormControl(''),  
      barcode: new FormControl(''),     
      buy_unitprice: new FormControl(0), 
      sell_unitprice: new FormControl(0), 
      unitsinstock: new FormControl(0),
      discount: new FormControl(0),
      hidden: new FormControl(false),
      delivery: new FormControl(''), 
      ModifiedDate: new FormControl('')  
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
 colors:string[]=[];
 onChangeColor(cid:string,val:boolean){
   if(val){ this.colors.push(cid) }
   else{this.colors= this.colors.filter(item => item !== cid);}
 //console.log(this.colors)
 }
 async _uploadFiles() {
// console.log('33')  
//console.log(this.itemForm.value.item_delivery)
    let hid=false; 
   // let dd=false;   if(this.itemForm.value.item_delivery=="") {dd=true;}    
    this.message = '';  
    var bed='';let kum='';let qol='';let yak='';let qel='';let mat='';let des=''; let fir='';let geni='';let _itm='';
    geni=this._gender.find(g=>g.genname===this.itemForm.value.genId)!.genId;
    
    if(this._shomi)
    {
      bed=this._beden1.find(g=>g.trEu===this.itemForm.value.bedenId)!.bedenId;  
     // console.log('A!!!!!!')
      if(this._shomi1){       
       if(this._cate1.find(r=>r.catId===this._cate1.find(t=>t.catname===this._cat && 
        t.genId=== this._gender.find(x=>x.genname===this._gen)!.genId)!.parid)!.catname==='Giyim')
        {           
            kum=this._kumash.find(h=>h.kumashname===this.itemForm.value.kumashId)!.kumashId;
            yak=this._yaka1.find(h=>h.yakaname===this.itemForm.value.yakaId)!.yakaId;
            qol=this._qoltipi1.find(h=>h.qoltipiname===this.itemForm.value.qolId)!.qolId; 
            qel=this._qelip.find(h=>h.qelipname===this.itemForm.value.qelipId)!.qelipId;  
            mat=this._mater.find(h=>h.matname===this.itemForm.value.matId)!.matId;
            des=this._desen.find(h=>h.desname===this.itemForm.value.desId)!.desId; 
        }  
      }
    }
    
    if(this.item.proId!=''){_itm=this.item.proId;}
   //console.log(this.item.firma_Id)
    // if(this.item.firma_Id!='')
    // {
    //   fir!=this._firma.find(g=>g.firma_email===this.item.firma_Id)!.firma_Id; 
    // }   
    var itemcatid='';
    if(this.itemForm.value.catId!=undefined){
     itemcatid= this._cate1.find(g=>g.catname===this.itemForm.value.catId)!.catId  }   
  var itemmarkid='';
  if(this.itemForm.value.markaId!=undefined){
   itemmarkid=this._marka.find(g=>g.markaname===this.itemForm.value.markaId)!.markaId }
   var itemcolid='';
  //  if(this.itemForm.value.colId!=undefined)
  //  {
  //    //console.log(this.itemForm.value.colId)
  //   itemcolid= this._color.find(h=>h.colname===this.itemForm.value.colId)!.colId
  // }

   var itemstilid='';
   if(this.itemForm.value.stilId!=undefined){
    itemstilid=this._stil.find(h=>h.stilname===this.itemForm.value.stilId)!.stilId
   }
   var itemkulid='';
   if(this.itemForm.value.kulalanId!=undefined){
    itemkulid= this._kullan.find(h=>h.kullanimname===this.itemForm.value.kulalanId)!.kulalanId
   }
    console.log(this.colors.length) 
   for(let j=0;j<this.colors.length;j++){   
      if(_itm===undefined){_itm='';}
        var p={
          proId:_itm ,genId:geni,catId:itemcatid,markaId:itemmarkid, bedenId:bed,colId:this.colors[j],qelipId:qel, matId:mat,
          yakaId:yak,qolId:qol, stilId:itemstilid,desId:des,kulalanId:itemkulid, kumashId:kum,
          storId:this.item.storId,prodname:this.itemForm.value.prodname,  barcode:this.itemForm.value.barcode,       
          boxquantity:this.itemForm.value.boxquantity,unitsinstock:this.itemForm.value.unitsinstock,
          buy_unitprice:this.itemForm.value.buy_unitprice, sell_unitprice:this.itemForm.value.sell_unitprice,
          discount:this.itemForm.value.discount,ModifiedDate:new Date().toISOString(),Discontinued:false,opr:'Add',
          delivery:this.itemForm.value.delivery
        }  
        // console.log(p) 
        // console.log('SS')     
        let itm = await this._caSer._positemdetail(p).toPromise() as product

        var _p={ proId:itm.proId , storId:itm.storId, genId:this.itemForm.value.genId } 
    //console.log(_p) 
    var phot = await this._caSer._getitemsphoto(_p.proId).toPromise() as prodphoto[] ;
    //shekili silir
    for (let item of phot) {  await this._caSer._delitemsphoto(item).toPromise(); }
     //shekili elave edir
    for (let i = 0; i < this.selectedFiles.length; i++)  { 
       await this._caSer.upload(_p, this.selectedFiles[i]).toPromise()
    }
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
       //console.log(this.listitem)
         //  this.mdbTable.setDataSource(this.listitem);
        //this.previous = this.mdbTable.getDataSource();
        }                                
   }, error => console.error(error + 'Siz sistemə daxil olmalısınız!'));
  } 
  _bayunit(event:string){
    let per:number;
    this._store.select(getpercent).subscribe(k=>{  per=k;   })
    this.item.sell_unitprice= Number.parseFloat(event) +  (Number.parseFloat(event)* per/100);
   // this.barkod();
    
   }
   barkod(){
    // console.log('!!!!')
   //  console.log(this.listitem.length)
     if(this.listitem.length===0){        
        this.item.barcode=1;
     }
     else {
       let z=0;
       for(let f=0;f<this.listitem.length;f++) {
       // console.log('sss')         
          if(z<this.listitem[f].barcode) {
            z=this.listitem[f].barcode;           
            //  this.item.barcode=this. item.storId.substring(0,3)+'_00000000'+1;
          }
        }
        this.item.barcode = z+1;
     }     
   } 
}
