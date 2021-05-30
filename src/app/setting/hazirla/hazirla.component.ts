import { Component, OnInit } from '@angular/core';

import { NotificationService } from 'src/app/helpers/notification.service';
import { MenuItem } from 'src/app/models/_menu';
import { beden, gender, item_categoriy, item_color, item_desen, item_marka, item_materal, item_stil, kullanimAlani, kumashtipi, qelip, qoltipi, yaka } from 'src/app/models/_settings';
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
  listcol:item_color[] = [];
  jsonlistcol:item_color[] = [];
  listdes:item_desen[] = []; 
  jsonlistdes:item_desen[] = [];

  listmar:item_marka[] = []; 
  jsonlistmar:item_marka[] = [];   
  listmat:item_materal[] = [];
  jsonlistmat:item_materal[] = [];
  liststil:item_stil[] = [];
  jsonliststil:item_stil[] = [];
  listkul:kullanimAlani[] = [];
  jsonlistkul:kullanimAlani[] = [];
  listkum:kumashtipi[] = []; 
  jsonlistkum:kumashtipi[] = []; 
  listqel:qelip[] = [];
  jsonlistqel:qelip[] = [];
  _gender: gender[]=[];
  jsonlistgen:gender[] = [];

  listcat:item_categoriy[] = [];
  jsonlistcat:item_categoriy[] = [];   
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
    this._caSer1._allmenu(rol)
    .pipe(
      flatMap(p=>{
         this.listnav=p;          
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
        this._caSer._jsongender().subscribe( p=>{     
        this.jsonlistgen=p;
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
  // console.log(this.listnav)
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
        if(item.gender_Id!=''){
          gendid=this._gender.find(x=>x.gender_name==item.gender_Id )!.gender_Id 
        }

        var p={       
          item_categoriy_Id:'' ,
          item_categoriy_name:item.item_categoriy_name.trim(),
          parid:item.parid,
          gender_Id:gendid                
        }
        //console.log(p) 
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
          else{kn=this.listcat.find(x=>x.item_categoriy_name==it.parid && x.gender_Id==it.gender_Id)?.item_categoriy_Id}
          let genderid=''
          if(it.gender_Id!=''){
          genderid= this._gender.find(x=>x.gender_Id==it.gender_Id )?.gender_Id
          }
          var ps={       
            item_categoriy_Id:it.item_categoriy_Id  ,
            item_categoriy_name:it.item_categoriy_name,
            gender_Id: genderid,  
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
        item_desen_Id:'' ,
        item_desen_name:item.item_desen_name,      
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
        qelip_Id:'' ,
        qelip_name:item.qelip_name,      
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
        kulalan_Id:'' ,
       // item_categoriy_Id:this.listcat.find(x=>x.item_categoriy_name===item.item_categoriy_Id).item_categoriy_Id, 
        kullanim_name:item.kullanim_name    
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
        kumash_Id:'' ,
       // item_categoriy_Id:this.listcat.find(x=>x.item_categoriy_name===item.item_categoriy_Id).item_categoriy_Id, 
       kumash_name:item.kumash_name    
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
        item_marka_Id:'' ,
       // item_categoriy_Id:this.listcat.find(x=>x.item_categoriy_name===item.item_categoriy_Id).item_categoriy_Id, 
       item_marka_name:item.item_marka_name   
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
        item_materal_Id:'' ,
       // item_categoriy_Id:this.listcat.find(x=>x.item_categoriy_name===item.item_categoriy_Id).item_categoriy_Id, 
       item_materal_name:item.item_materal_name   
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
        item_stil_Id:'' ,
       // item_categoriy_Id:this.listcat.find(x=>x.item_categoriy_name===item.item_categoriy_Id).item_categoriy_Id, 
       item_stil_name:item.item_stil_name   
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
        if(item.gender_Id!=''){
          gendid=this._gender.find(x=>x.gender_name==item.gender_Id)!.gender_Id
        }
       var p={
        qol_Id:'' ,
        //item_categoriy_Id:item.item_categoriy_Id, 
        gender_Id:gendid, 
        qoltipi_name:item.qoltipi_name    
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
        yaka_Id:'' ,
        gender_Id:this._gender.find(x=>x.gender_name==item.gender_Id)!.gender_Id, 
        //item_categoriy_Id:this.listcat.find(x=>x.item_categoriy_name===item.item_categoriy_Id).item_categoriy_Id, 
        yaka_name:item.yaka_name  
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
         
         if(item.gender_Id!=''){
          ge=this._gender.find(x=>x.gender_name==item.gender_Id)!.gender_Id;
         }
            var p={
            beden_Id:'' ,
            beden:item.beden,
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
            item_categoriy_Id:this.listcat.find(x=>x.parid===null && x.item_categoriy_name===item.item_categoriy_Id && x.gender_Id===ge)!.item_categoriy_Id,
            gender_Id:ge 
             
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
           gender_Id:''  ,
           gender_name:item.gender_name       
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
           item_color_Id:''  ,
           item_color:item.item_color,
           url_color:item.url_color     
         }
         this._caSer._poscolor(p).subscribe();  
        // console.log(item)
       }
     }
   }
}
