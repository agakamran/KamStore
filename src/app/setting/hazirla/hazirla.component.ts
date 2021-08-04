import { Component, OnInit } from '@angular/core';

import { NotificationService } from 'src/app/helpers/notification.service';
import { MenuItem } from 'src/app/models/_menu';
import { beden, gender, _categoriy, _color, _desen, _marka, _materal,_stil, kullanimAlani, kumashtipi, qelip, qoltipi, yaka } from 'src/app/models/_settings';
import { SettingsService } from 'src/app/services/settings.service';

import { NavbarService } from 'src/app/services/navbar.service';
import { AuthService } from 'src/app/services/auth.service';
import { flatMap } from 'rxjs/operators';
@Component({
  selector: 'app-hazirla',
  templateUrl: './hazirla.component.html',
  styleUrls: ['./hazirla.component.scss']
})
export class HazirlaComponent implements OnInit {
  //#region 
  listnav:MenuItem[] = []; 
  jsonlistnav:MenuItem[] = [];
  listcol:_color[] = [];
  jsonlistcol:_color[] = [];
  listdes:_desen[] = []; 
  jsonlistdes:_desen[] = [];

  listmar:_marka[] = []; 
  jsonlistmar:_marka[] = [];   
  listmat:_materal[] = [];
  jsonlistmat:_materal[] = [];
  liststil:_stil[] = [];
  jsonliststil:_stil[] = [];
  listkul:kullanimAlani[] = [];
  jsonlistkul:kullanimAlani[] = [];
  listkum:kumashtipi[] = []; 
  jsonlistkum:kumashtipi[] = []; 
  listqel:qelip[] = [];
  jsonlistqel:qelip[] = [];
  _gender: gender[]=[];
  jsonlistgen:gender[] = [];

  listcat:_categoriy[] = [];
  jsonlistcat:_categoriy[] = [];   
  listqol:qoltipi[] = []; 
  jsonlistqol:qoltipi[] = [];  
  listyak:yaka[] = [];
  jsonlistyak:yaka[] = [];
  listbeden:beden[] = [];
  jsonlistbeden:beden[] = [];
  //#endregion
  constructor(private _caSer: SettingsService,private _caSer1: NavbarService ,
    private _auth:AuthService,  private noti: NotificationService) {    
   }
  ngOnInit(): void {
    let rol=this._auth.getrole();  
    //console.log(rol)  
    this._caSer1._allmenu(rol)
    .pipe(
      flatMap(p=>{
         this.listnav=p;  
       //  console.log(this._caSer1._jsonmenu())         
       return this._caSer1._jsonmenu()
      })).subscribe(list=>
      { 
         this.jsonlistnav=list;
         this.noti.success(list+":: success") 
        // console.log(this.jsonlistnav)                     
      }, error => console.error(error + 'Siz sistemə daxil olmalısınız!'));    
    
    this._caSer._getgender().subscribe(p=>
    { 
        this._gender=p; 
       // console.log(p)
        this._caSer._jsongender().subscribe( p=>{     
        this.jsonlistgen=p;
       // console.log(p)
       // this.addgender();                                 
    })}, error => console.error(error + 'Siz sistemə daxil olmalısınız!')); 

    this._caSer._getgender()
    .pipe(
      flatMap(p=>{ this._gender=p ;         
       return this._caSer._jsonCate()
      }),
      flatMap(p=>{ this.jsonlistcat=p ; 
        return this._caSer._getcategoriy()  
    })).subscribe(list=>
      { 
         this.listcat=list;        

        // this._category();
       //  console.log(this._catt)                        
      }, error => console.error(error + 'Siz sistemə daxil olmalısınız!'));

      this._caSer._getcategoriy().pipe(
      flatMap(p=>{ this.listcat=p ;         
       return this._caSer._getqoltipi()
      }),
      flatMap(p=>{ this.jsonlistqol=p ; 
        return this._caSer._jsonqoltip()  
    })).subscribe(list=>
      { 
         this.jsonlistqol=list; 
         //  this._category();
        // console.log(this.jsonlistqol)                        
      }, error => console.error(error + 'Siz sistemə daxil olmalısınız!'));                 
        
       
     /* this._caSer._getqoltipi().subscribe(list=>
        { 
           this.listqol=list;  
           this._caSer._jsonqoltip().subscribe(list=>
            { 
              this.jsonlistqol=list;
             // this.addkoltip();
            })                        
        }, error => console.error(error + 'Siz sistemə daxil olmalısınız!'));
*/

    this._caSer._getcolor().subscribe(list=>
    {         
           this.listcol=list;
           this._caSer._jsonCol().subscribe(p=>{
            this.jsonlistcol=p;
           // this.addcol();   
          })
    }, error => console.error(error + 'Siz sistemə daxil olmalısınız!')); 
   
    this._caSer._getitemdesen().subscribe(list=>
    { 
         this.listdes=list;   
         this._caSer._jsondesen().subscribe(list=>
          { 
            this.jsonlistdes=list;
          //  this.adddesan();
          })                      
   }, error => console.error(error + 'Siz sistemə daxil olmalısınız!'));
    this._caSer._getqelip().subscribe(list=>
    { 
        this.listqel=list;
        this._caSer._jsonqalip().subscribe(list=>
          { 
            this.jsonlistqel=list;
           // this.addkalip();
          })                         
    }, error => console.error(error + 'Siz sistemə daxil olmalısınız!')); 
   
    this._caSer._getkullanimAlani().subscribe(list=>
    { 
       this.listkul=list; 
       this._caSer._jsonkullanal().subscribe(list=>
        { 
          this.jsonlistkul=list;
         // this.addkulalan();
        })                                        
    }, error => console.error(error + 'Siz sistemə daxil olmalısınız!'));  
    this._caSer._getkumashtipi().subscribe(list=>
    { 
        this.listkum=list; 
        this._caSer._jsonkumash().subscribe(list=>
          { 
            this.jsonlistkum=list;
           // this.addkumash();
          }) 
    }, error => console.error(error + 'Siz sistemə daxil olmalısınız!')); 
    this._caSer._getitemmarka().subscribe(list=>
    { 
       this.listmar=list; 
       this._caSer._jsonmarka().subscribe(list=>
        { 
          this.jsonlistmar=list;
         // console.log(this.jsonlistmar.length)
         // this.addmarka();
        }) 
    }, error => console.error(error + 'Siz sistemə daxil olmalısınız!')); 
    this._caSer._getitemmateral().subscribe(list=>
    { 
       this.listmat=list;
       this._caSer._jsonmaterial().subscribe(list=>
        { 
          this.jsonlistmat=list;
         // this.addmat();
        })  
    }, error => console.error(error + 'Siz sistemə daxil olmalısınız!')); 
    this._caSer._getitemstil().subscribe(list=>
    { 
      this.liststil=list;
      this._caSer._jsonstil().subscribe(list=>
        { 
          this.jsonliststil=list;
        //  this.addstil();
        }) 
    }, error => console.error(error + 'Siz sistemə daxil olmalısınız!')); 
    this._caSer._getyaka().subscribe(list=>
    { 
        this.listyak=list; 
        this._caSer._jsonyaka().subscribe(list=>
          { 
            this.jsonlistyak=list;
           // this.addyaka();
          }) 
    }, error => console.error(error + 'Siz sistemə daxil olmalısınız!'));
    this._caSer._getbeden().subscribe(list=>
    { 
        this.listbeden=list; 
        this._caSer._jsonbeden().subscribe(list=>
          {            
            this.jsonlistbeden=list;
           // this.addbeden();
          }) 
    }, error => console.error(error + 'Siz sistemə daxil olmalısınız!')); 
  
  }

  addmenu()
  { 
   console.log(this.listnav)
   if(this.listnav.length===0)
   {
     // console.log(this.jsonlistnav.length)
      //var kn;
      for (let item of this.jsonlistnav) 
      {
        
         var p={
          nid:'',
          pid:item.pid,
          ntitle:item.ntitle,
          npath:item.npath,
          nlan:item.nlan,
          nrol:item.nrol,
          nisparent:item.nisparent ,
          ncsay:item.ncsay,
          ink:item.ink,
          nicon:item.nicon
        }
        // console.log(p)
         this._caSer1._posmenu(p).subscribe();  
      }
    }
    else
    {
      var kn;
     // console.log(this.listnav.length)
      for (let item of this.listnav) 
      {  
        console.log(item.pid)
       // console.log(this.listnav.find(x=>x.ntitle==item.pid)!.nid)
         if(item.pid!=null){
           console.log(this.listnav.find(x=>x.ntitle==item.pid)?.nid) 
         }
      
          if(this.listnav.find(x=>x.ntitle==item.pid)?.nid!=undefined){  
          console.log(this.listnav.find(x=>x.ntitle==item.pid)?.nid)          
        if(item.pid===undefined){kn=''}
        else {
              kn=this.listnav.find(x=>x.ntitle==item.pid)?.nid;    
        }
         var pp={
          nid:item.nid,
          pid:kn,
          ntitle:item.ntitle,
          npath:item.npath,
          nlan:item.nlan,
          nrol:item.nrol,
          nisparent:item.nisparent,
          ncsay:item.ncsay,
          nicon:item.nicon
        }
         // console.log(pp)
        this._caSer1._posmenu(pp).subscribe();  
       }
      }
    }
  }
  
  addcate()
  {
    
    //console.log('&&&&')
    if(this.listcat.length===0)
    {
      //console.log('&&&&')
     // console.log(this.jsonlistcat.length)
    
      for (let item of this.jsonlistcat) 
      {     
       // console.log(this._gender.find(x=>x.gender_name==item.gender_Id ).gender_Id)  
        var kn;
        let gendid=''
        if(item.genId!=''){
          gendid=this._gender.find(x=>x.genname==item.genId )!.genId 
        }

        var p={       
          catId:'' ,
          catname:item.catname.trim(),
          parid:item.parid,
          genId:gendid                
        }
       // console.log(p) 
        this._caSer._poscategoriy(p).subscribe(); 
      }     
     }
     else
     {
     // console.log(this.listcat.length)
      for (let it of this.listcat)
      {
          var kn;
         // console.log(it)
          if(it.parid===''){kn=''}
          else{kn=this.listcat.find(x=>x.catname==it.parid && x.genId==it.genId)?.catId}
          let genderid=''
          if(it.genId!=''){
          genderid= this._gender.find(x=>x.genId==it.genId )?.genId
          }
          var ps={       
            catId:it.catId  ,
            catname:it.catname,
            genId: genderid,  
            parid:kn,       
          } 
         // console.log(ps)
          this._caSer._poscategoriy(ps).subscribe();
      }
     }
  }
  adddesan()
  { 
    if(this.listdes.length===0)  
    {
      for (let item of this.jsonlistdes) 
      {
       var p={
        desId:'' ,
        desname:item.desname,      
        }
        //  console.log(p)
       this._caSer._positemdesen(p).subscribe();  
      }                  
    }   
  } 
  addkalip()
  { 
    if(this.listqel.length===0)  
    {
      for (let item of this.jsonlistqel) 
      {
       var p={
        qelipId:'' ,
        qelipname:item.qelipname,      
        }
        //  console.log(p)
       this._caSer._posqelip(p).subscribe();  
      }                  
    }   
  }   
  addkulalan()
  { 
    if(this.listkul.length===0)  
    {
       console.log(this.jsonlistkul)
      for (let item of this.jsonlistkul) 
      {
       var p={
        kulalanId:'' ,
       // item_categoriy_Id:this.listcat.find(x=>x.item_categoriy_name===item.item_categoriy_Id).item_categoriy_Id, 
        kullanimname:item.kullanimname    
        }
        //  console.log(p)
       this._caSer._poskullanimAlani(p).subscribe();  
      }                  
    }   
  } 
  addkumash()
  { 
    if(this.listkum.length===0)  
    {
      for (let item of this.jsonlistkum) 
      {
       var p={
        kumashId:'' ,
       // item_categoriy_Id:this.listcat.find(x=>x.item_categoriy_name===item.item_categoriy_Id).item_categoriy_Id, 
       kumashname:item.kumashname    
        }
        //  console.log(p)
       this._caSer._poskumashtipi(p).subscribe();  
      }                  
    }   
  } 
  addmarka()
  { 
    if(this.listmar.length===0)  
    {
      for (let item of this.jsonlistmar) 
      {
       var p={
        markaId:'' ,
       // item_categoriy_Id:this.listcat.find(x=>x.item_categoriy_name===item.item_categoriy_Id).item_categoriy_Id, 
       markaname:item.markaname   
        }
        //  console.log(p)
       this._caSer._positemmarka(p).subscribe();
      // console.log(p)
      }                  
    }   
  } 
  addmat()
  { 
    if(this.listmat.length===0)  
    {
      for (let item of this.jsonlistmat) 
      {
       var p={
        matId:'' ,
       // item_categoriy_Id:this.listcat.find(x=>x.item_categoriy_name===item.item_categoriy_Id).item_categoriy_Id, 
         matname:item.matname   
        }
        //  console.log(p)
       this._caSer._positemmateral(p).subscribe();  
      }                  
    }   
  } 
  addstil()
  { 
    if(this.liststil.length===0)  
    {
      for (let item of this.jsonliststil) 
      {
       var p={
        stilId:'' ,
       // item_categoriy_Id:this.listcat.find(x=>x.item_categoriy_name===item.item_categoriy_Id).item_categoriy_Id, 
       stilname:item.stilname   
        }
        //  console.log(p)
       this._caSer._positemstil(p).subscribe();  
      }                  
    }   
  }
  addkoltip()
  { 
    console.log(this.jsonlistqol.length)
   // console.log(this.jsonlistqol)
    if(this.listqol.length===0)  
    {
      for (let item of this.jsonlistqol) 
      {
        let gendid=''
        if(item.genId!=''){
          gendid=this._gender.find(x=>x.genname==item.genId)!.genId
        }
       var p={
        qolId:'' ,
        //item_categoriy_Id:item.item_categoriy_Id, 
        genId:gendid, 
        qoltipiname:item.qoltipiname    
        }
      //  console.log(p)
       this._caSer._posqoltipi(p).subscribe();  
      }                  
    }   
  } 
  addyaka()
  { 
    if(this.listyak.length===0)  
    {
      // console.log(this.jsonlistyak)
      for (let item of this.jsonlistyak) 
      {
       var p={
        yakaId:'' ,
        genId:this._gender.find(x=>x.genname==item.genId)!.genId, 
        //item_categoriy_Id:this.listcat.find(x=>x.item_categoriy_name===item.item_categoriy_Id).item_categoriy_Id, 
        yakaname:item.yakaname  
        }
       // console.log(p)
       this._caSer._posyaka(p).subscribe();  
      }                  
    }   
  }
  addbeden()
  { 
    if(this.listbeden.length===0)  
    {
     // console.log(this.jsonlistbeden.length)
      for (let item of this.jsonlistbeden) 
      {        
      //  console.log(this.jsonlistbeden.filter(x=>x.ayakUz!=null).length)        
         let ge='';
         
         if(item.genId!=''){
          ge=this._gender.find(x=>x.genname==item.genId)!.genId;
         }
            var p={
            bedenId:'' ,
            bedeni:item.bedeni,
            trEu:item.trEu,
            uk:item.uk,
            us:item.us,
            it:item.it,
            koks:item.koks,
            bel:item.bel,
            ayakUz:item.ayakUz,
            ichBacakBoyu:item.ichBacakBoyu,
            yaka:item.yaka,
            kot:item.kot,
            uzunluk:item.uzunluk,
            catId:this.listcat.find(x=>x.parid===null && x.catname===item.catId && x.genId===ge)!.catId,
            genId:ge 
             
          }
          //console.log(p)
          this._caSer._posbeden(p).subscribe();  
      }                  
    }   
  }
  addgender()
  {
 //console.log('&&&&')
     if(this._gender.length===0)
     {
       for (let item of this.jsonlistgen) 
       {
         var p={
           genId:''  ,
           genname:item.genname       
         }
         this._caSer._postgender(p).subscribe(); 
       } 
     }
   }
   addcol()
   {
     //console.log(this.listcol)
     if(this.listcol.length===0)
     {
       for (let item of this.jsonlistcol) 
       {
         var p={
           colId:''  ,
           colname:item.colname,
           colurl:item.colurl     
         }
         this._caSer._poscolor(p).subscribe();  
        // console.log(item)
       }
     }
   }
}
