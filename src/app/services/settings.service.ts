import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { firma, gender, _color, _categoriy, beden,
   _desen, _marka, _materal, _stil, kullanimAlani,
    kumashtipi, qelip, qoltipi, yaka,  product, prodphoto, _sales, shipper } from '../models/_settings';
import * as datgender  from '../../_json/gender.json';   
import * as datcate  from '../../_json/categori.json';
import * as datacol  from '../../_json/Colors.json';
import * as datdesen  from '../../_json/desen.json';
import * as datkalip  from '../../_json/kalip.json';
import * as datkoltipi  from '../../_json/koltipi.json';
import * as datkulal  from '../../_json/kullanimAlan.json';
import * as datkumash  from '../../_json/kumashtipi.json';
import * as datmarka  from '../../_json/marka.json';
import * as datmater  from '../../_json/material.json';
import * as datstil  from '../../_json/stil.json';
import * as datyaka  from '../../_json/yaka.json';
import * as datbeden  from '../../_json/beden.json';
@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  pathAPI='';
  _jsonUrl ='src/api/categori.json';
  constructor(private http: HttpClient) {  this.pathAPI=environment.apiUrl+'Settings/';}
  //------------firma
  _getfirma(): Observable<any>{      
    //const body=JSON.stringify(pra);
   // console.log('uuuuu')
   // console.log(body.toString())   
    return this.http.get<any>(this.pathAPI +'firma')
    .pipe(map((data)=>{
      return data;
    }),
      catchError((err) => {
        console.error(err);
        throw err;
      }
    )); 
  } 
  _posfirma(bo:firma):Observable<any> {        
    const body=JSON.stringify(bo);  
   // console.log('11sd')
    console.log(this.pathAPI + 'postfirma', body)
    return this.http.post<firma>(this.pathAPI + 'postfirma', body)
       .pipe(
          map((data) => {
            //You can perform some transformation here
           return data;
         }),
         catchError((err) => {
           console.error(err);
           throw err;
         }
       ))
  }  
  _delfirma(bo:firma) {   
   // const bod:MenuItem= { pid: id,pagename:'' }
    //console.log(id)
     return this.http.post(this.pathAPI + 'delfirma',bo )
    .pipe( catchError((err) => {  console.error(err);  throw err; }))
  } 
  //-------------------- beden
  _jsonbeden(): Observable<beden[]> {    
    return of((datbeden as any).default)   
   }
  _getbeden(): Observable<any>{      
    //const body=JSON.stringify(pra);
   // console.log('uuuuu')
   // console.log(body.toString())   
    return this.http.get<any>(this.pathAPI +'beden')
    .pipe(map((data)=>{
      return data;
    }),
      catchError((err) => {
        console.error(err);
        throw err;
      }
    )); 
  } 
  _posbeden(bo:beden):Observable<any> {        
    const body=JSON.stringify(bo);  
   // console.log('11sd')
   // console.log(this.pathAPI + 'postbeden', body)
    return this.http.post<beden>(this.pathAPI + 'postbeden', body)
       .pipe(
          map((data) => {
            //You can perform some transformation here
           return data;
         }),
         catchError((err) => {
           console.error(err);
           throw err;
         }
       ))
  }  
  _delbeden(bo:beden) {   
   // const bod:MenuItem= { pid: id,pagename:'' }
    //console.log(id)
     return this.http.post(this.pathAPI + 'delbeden',bo )
    .pipe( catchError((err) => {  console.error(err);  throw err; }))
  } 
  //-------------gender
  _jsongender(): Observable<gender[]> {    
    return of((datgender as any).default)   
   }
  _getgender(): Observable<any>{      
    //const body=JSON.stringify(pra);
   // console.log('uuuuu')
   // console.log(body.toString())   
    return this.http.get<any>(this.pathAPI +'gender')
    .pipe(map((data)=>{
     // console.log(data)
      return data;
    }),
      catchError((err) => {
        console.error(err);
        throw err;
      }
    )); 
  } 
  _postgender(bo:gender):Observable<gender> {        
    const body=JSON.stringify(bo);  
   // console.log(body)
    return this.http.post<gender>(this.pathAPI + 'postgender', body)
       .pipe(
          map((data) => {
            //You can perform some transformation here
           return data;
         }),
         catchError((err) => {
           console.error(err);
           throw err;
         }
       ))
  }  
  _delgender(bo:gender) {   
   // const bod:MenuItem= { pid: id,pagename:'' }
    //console.log(id)
     return this.http.post(this.pathAPI + 'delgender',bo )
    .pipe( catchError((err) => {  console.error(err);  throw err; }))
  } 
   //--- ----------categiry
   
   _jsonCate(): Observable<_categoriy[]> {    
     return of((datcate as any).default)   
    }
   _getcategoriy(): Observable<any>{      
    //const body=JSON.stringify(pra);
   // console.log('uuuuu')
   // console.log(body.toString())   
    return this.http.get<any>(this.pathAPI +'categoriy')
    .pipe(map((data)=>{
      return data;
    }),
      catchError((err) => {
        console.error(err);
        throw err;
      }
    )); 
  } 
  _poscategoriy(bo:_categoriy):Observable<any> {        
    const body=JSON.stringify(bo);  
   // console.log('11sd')
    console.log(this.pathAPI + 'postcategoriy', body)
    return this.http.post<_categoriy>(this.pathAPI + 'postcategoriy', body)
       .pipe(
          map((data) => {
            //You can perform some transformation here
           return data;
         }),
         catchError((err) => {
           console.error(err);
           throw err;
         }
       ))
  }  
  _delcategoriy(bo:_categoriy) {   
   // const bod:MenuItem= { pid: id,pagename:'' }
    //console.log(id)
     return this.http.post(this.pathAPI + 'delcategoriy',bo )
    .pipe( catchError((err) => {  console.error(err);  throw err; }))
  }   
  //------------color
  _jsonCol(): Observable<_color[]> {   
   // console.log(datacol) 
    return of((datacol as any).default)   
   }
  _getcolor(): Observable<any>{      
    //const body=JSON.stringify(pra);
   // console.log('uuuuu')
   // console.log(body.toString())   
    return this.http.get<any>(this.pathAPI +'itemcolor')
    .pipe(map((data)=>{
      return data;
    }),
      catchError((err) => {
        console.error(err);
        throw err;
      }
    )); 
  } 
  _poscolor(bo:_color):Observable<any> {        
    const body=JSON.stringify(bo);  
   // console.log('11sd')
  //  console.log(this.pathAPI + 'postitemcolor', body)
    return this.http.post<_color>(this.pathAPI + 'postitemcolor', body)
       .pipe(
          map((data) => {
            //You can perform some transformation here
           return data;
         }),
         catchError((err) => {
           console.error(err);
           throw err;
         }
       ))
  }  
  _delcolor(bo:_color) {   
   // const bod:MenuItem= { pid: id,pagename:'' }
    //console.log(id)
     return this.http.post(this.pathAPI + 'delitemcolor',bo )
    .pipe( catchError((err) => {  console.error(err);  throw err; }))
  }   
  //-------------------- _desen
  _jsondesen(): Observable<_desen[]> {    
    return of((datdesen as any).default)   
   }
  _getitemdesen(): Observable<any>{      
    //const body=JSON.stringify(pra);
   // console.log('uuuuu')
   // console.log(body.toString())   
    return this.http.get<any>(this.pathAPI +'itemdesen')
    .pipe(map((data)=>{
      return data;
    }),
      catchError((err) => {
        console.error(err);
        throw err;
      }
    )); 
  } 
  _positemdesen(bo:_desen):Observable<any> {        
    const body=JSON.stringify(bo);  
   // console.log('11sd')
    //console.log(this.pathAPI + 'postitemdesen', body)
    return this.http.post<_desen>(this.pathAPI + 'postitemdesen', body)
       .pipe(
          map((data) => {
            //You can perform some transformation here
           return data;
         }),
         catchError((err) => {
           console.error(err);
           throw err;
         }
       ))
  }  
  _delitemdesen(bo:_desen) {   
   // const bod:MenuItem= { pid: id,pagename:'' }
    //console.log(id)
     return this.http.post(this.pathAPI + 'delitemdesen',bo )
    .pipe( catchError((err) => {  console.error(err);  throw err; }))
  } 
  //-------------------- marka
  _jsonmarka(): Observable<_marka[]> {    
    return of((datmarka as any).default)   
   }
  _getitemmarka(): Observable<any>{      
    //const body=JSON.stringify(pra);
   // console.log('uuuuu')
   // console.log(body.toString())   
    return this.http.get<any>(this.pathAPI +'itemmarka')
    .pipe(map((data)=>{
      return data;
    }),
      catchError((err) => {
        console.error(err);
        throw err;
      }
    )); 
  } 
  _positemmarka(bo:_marka):Observable<any> {        
    const body=JSON.stringify(bo);  
   // console.log('11sd')
   // console.log(this.pathAPI + 'postbeden', body)
    return this.http.post<_marka>(this.pathAPI + 'postitemmarka', body)
       .pipe(
          map((data) => {
            //You can perform some transformation here
           return data;
         }),
         catchError((err) => {
           console.error(err);
           throw err;
         }
       ))
  }  
  _delitemmarka(bo:_marka) {   
   // const bod:MenuItem= { pid: id,pagename:'' }
    //console.log(id)
     return this.http.post(this.pathAPI + 'delitemmarka',bo )
    .pipe( catchError((err) => {  console.error(err);  throw err; }))
  } 
  //-------------------- materal
  _jsonmaterial(): Observable<_materal[]> {    
    return of((datmater as any).default)   
   }
  _getitemmateral(): Observable<any>{      
    //const body=JSON.stringify(pra);
   // console.log('uuuuu')
   // console.log(body.toString())   
    return this.http.get<any>(this.pathAPI +'itemmateral')
    .pipe(map((data)=>{
      return data;
    }),
      catchError((err) => {
        console.error(err);
        throw err;
      }
    )); 
  } 
  _positemmateral(bo:_materal):Observable<any> {        
    const body=JSON.stringify(bo);  
   // console.log('11sd')
   // console.log(this.pathAPI + 'postbeden', body)
    return this.http.post<_materal>(this.pathAPI + 'postitemmateral', body)
       .pipe(
          map((data) => {
            //You can perform some transformation here
           return data;
         }),
         catchError((err) => {
           console.error(err);
           throw err;
         }
       ))
  }  
  _delitemmateral(bo:_materal) {   
   // const bod:MenuItem= { pid: id,pagename:'' }
    //console.log(id)
     return this.http.post(this.pathAPI + 'delitemmateral',bo )
    .pipe( catchError((err) => {  console.error(err);  throw err; }))
  } 
  //-------------------- stil
  _jsonstil(): Observable<_stil[]> {    
    return of((datstil as any).default)   
   }
  _getitemstil(): Observable<any>{      
    //const body=JSON.stringify(pra);
   // console.log('uuuuu')
   // console.log(body.toString())   
    return this.http.get<any>(this.pathAPI +'itemstil')
    .pipe(map((data)=>{
      return data;
    }),
      catchError((err) => {
        console.error(err);
        throw err;
      }
    )); 
  } 
  _positemstil(bo:_stil):Observable<any> {        
    const body=JSON.stringify(bo);  
   // console.log('11sd')
   // console.log(this.pathAPI + 'postbeden', body)
    return this.http.post<_stil>(this.pathAPI + 'postitemstil', body)
       .pipe(
          map((data) => {
            //You can perform some transformation here
           return data;
         }),
         catchError((err) => {
           console.error(err);
           throw err;
         }
       ))
  }  
  _delitemstil(bo:_stil) {   
   // const bod:MenuItem= { pid: id,pagename:'' }
    //console.log(id)
     return this.http.post(this.pathAPI + 'delitemstil',bo )
    .pipe( catchError((err) => {  console.error(err);  throw err; }))
  } 
  //-------------------- kullanimAlani
  _jsonkullanal(): Observable<kullanimAlani[]> {    
    return of((datkulal as any).default)   
   }
  _getkullanimAlani(): Observable<any>{      
    //const body=JSON.stringify(pra);
   // console.log('uuuuu')
   // console.log(body.toString())   
    return this.http.get<any>(this.pathAPI +'kullanimAlani')
    .pipe(map((data)=>{
      return data;
    }),
      catchError((err) => {
        console.error(err);
        throw err;
      }
    )); 
  } 
  _poskullanimAlani(bo:kullanimAlani):Observable<any> {        
    const body=JSON.stringify(bo);  
   // console.log('11sd')
   // console.log(this.pathAPI + 'postbeden', body)
    return this.http.post<kullanimAlani>(this.pathAPI + 'postkullanimAlani', body)
       .pipe(
          map((data) => {
            //You can perform some transformation here
           return data;
         }),
         catchError((err) => {
           console.error(err);
           throw err;
         }
       ))
  }  
  _delkullanimAlani(bo:kullanimAlani) {   
   // const bod:MenuItem= { pid: id,pagename:'' }
    //console.log(id)
     return this.http.post(this.pathAPI + 'delkullanimAlani',bo )
    .pipe( catchError((err) => {  console.error(err);  throw err; }))
  } 
  //-------------------- kumashtipi
  _jsonkumash(): Observable<kumashtipi[]> {    
    return of((datkumash as any).default)   
   }
  _getkumashtipi(): Observable<any>{      
    //const body=JSON.stringify(pra);
   // console.log('uuuuu')
   // console.log(body.toString())   
    return this.http.get<any>(this.pathAPI +'kumashtipi')
    .pipe(map((data)=>{
      return data;
    }),
      catchError((err) => {
        console.error(err);
        throw err;
      }
    )); 
  } 
  _poskumashtipi(bo:kumashtipi):Observable<any> {        
    const body=JSON.stringify(bo);  
   // console.log('11sd')
   // console.log(this.pathAPI + 'postbeden', body)
    return this.http.post<kumashtipi>(this.pathAPI + 'postkumashtipi', body)
       .pipe(
          map((data) => {
            //You can perform some transformation here
           return data;
         }),
         catchError((err) => {
           console.error(err);
           throw err;
         }
       ))
  }  
  _delkumashtipi(bo:kumashtipi) {   
   // const bod:MenuItem= { pid: id,pagename:'' }
    //console.log(id)
     return this.http.post(this.pathAPI + 'delkumashtipi',bo )
    .pipe( catchError((err) => {  console.error(err);  throw err; }))
  } 
  //-------------------- qelip
  _jsonqalip(): Observable<qelip[]> {    
    return of((datkalip as any).default)   
   }
  _getqelip(): Observable<any>{      
    //const body=JSON.stringify(pra);
   // console.log('uuuuu')
   // console.log(body.toString())   
    return this.http.get<any>(this.pathAPI +'qelip')
    .pipe(map((data)=>{
      return data;
    }),
      catchError((err) => {
        console.error(err);
        throw err;
      }
    )); 
  } 
  _posqelip(bo:qelip):Observable<any> {        
    const body=JSON.stringify(bo);  
   // console.log('11sd')
   // console.log(this.pathAPI + 'postbeden', body)
    return this.http.post<qelip>(this.pathAPI + 'postqelip', body)
       .pipe(
          map((data) => {
            //You can perform some transformation here
           return data;
         }),
         catchError((err) => {
           console.error(err);
           throw err;
         }
       ))
  }  
  _delqelip(bo:qelip) {   
   // const bod:MenuItem= { pid: id,pagename:'' }
    //console.log(id)
     return this.http.post(this.pathAPI + 'delqelip',bo )
    .pipe( catchError((err) => {  console.error(err);  throw err; }))
  } 
  //-------------------- qoltipi
  _jsonqoltip(): Observable<qoltipi[]> {    
    return of((datkoltipi as any).default)   
   }
  _getqoltipi(): Observable<any>{      
    //const body=JSON.stringify(pra);
   // console.log('uuuuu')
   // console.log(body.toString())   
    return this.http.get<any>(this.pathAPI +'qoltipi')
    .pipe(map((data)=>{
      return data;
    }),
      catchError((err) => {
        console.error(err);
        throw err;
      }
    )); 
  } 
  _posqoltipi(bo:qoltipi):Observable<any> {        
    const body=JSON.stringify(bo);  
   // console.log('11sd')
   // console.log(this.pathAPI + 'postbeden', body)
    return this.http.post<qoltipi>(this.pathAPI + 'postqoltipi', body)
       .pipe(
          map((data) => {
            //You can perform some transformation here
           return data;
         }),
         catchError((err) => {
           console.error(err);
           throw err;
         }
       ))
  }  
  _delqoltipi(bo:qoltipi) {   
   // const bod:MenuItem= { pid: id,pagename:'' }
    //console.log(id)
     return this.http.post(this.pathAPI + 'delqoltipi',bo )
    .pipe( catchError((err) => {  console.error(err);  throw err; }))
  } 
  //-------------------- yaka
  _jsonyaka(): Observable<yaka[]> {    
    return of((datyaka as any).default)   
   }
  _getyaka(): Observable<any>{      
    //const body=JSON.stringify(pra);
   // console.log('uuuuu')
   // console.log(body.toString())   
    return this.http.get<any>(this.pathAPI +'yaka')
    .pipe(map((data)=>{
      return data;
    }),
      catchError((err) => {
        console.error(err);
        throw err;
      }
    )); 
  } 
  _posyaka(bo:yaka):Observable<any> {        
    const body=JSON.stringify(bo);  
   // console.log('11sd')
   // console.log(this.pathAPI + 'postbeden', body)
    return this.http.post<yaka>(this.pathAPI + 'postyaka', body)
       .pipe(
          map((data) => {
            //You can perform some transformation here
           return data;
         }),
         catchError((err) => {
           console.error(err);
           throw err;
         }
       ))
  }  
  _delyaka(bo:yaka) {   
   // const bod:MenuItem= { pid: id,pagename:'' }
    //console.log(id)
     return this.http.post(this.pathAPI + 'delyaka',bo )
    .pipe( catchError((err) => {  console.error(err);  throw err; }))
  } 
  //=====================================
  //-------------------- items_qaime
  _getitemsqaime(): Observable<any>{      
    //const body=JSON.stringify(pra);
   // console.log('uuuuu')
   // console.log(body.toString())   
    return this.http.get<any>(this.pathAPI +'itemsqaime')
    .pipe(map((data)=>{
      return data;
    }),
      catchError((err) => {
        console.error(err);
        throw err;
      }
    )); 
  } 
 /* _positemsqaime(bo:items_qaime):Observable<any> {        
    const body=JSON.stringify(bo);  
   // console.log('11sd')
   // console.log(this.pathAPI + 'postbeden', body)
    return this.http.post<items_qaime>(this.pathAPI + 'postitemsqaime', body)
       .pipe(
          map((data) => {
            //You can perform some transformation here
           return data;
         }),
         catchError((err) => {
           console.error(err);
           throw err;
         }
       ))
  }  
  _delitemsqaime(bo:items_qaime) {   
   // const bod:MenuItem= { pid: id,pagename:'' }
    //console.log(id)
     return this.http.post(this.pathAPI + 'delitemsqaime',bo )
    .pipe( catchError((err) => {  console.error(err);  throw err; }))
  } */
 //-----------------------------------------------  
  _getitemdetail(par:string): Observable<any>{      
    //const body=JSON.stringify(pra);   
    return this.http.get<any>(this.pathAPI +'itemdetail?userId='+par)
    .pipe(map((data)=>{
      return data;
    }),
      catchError((err) => {
        console.error(err);
        throw err;
      }
    )); 
  }  
  upload(p:any,file: File) {   
    const formData: FormData = new FormData(); 
    //console.log('FFF') 
    console.log(p.firmaId) 
    formData.append('file', file);     
    formData.append('itemId',p.itemId);
    formData.append('firmaId',p.firmaId);
    formData.append('genId',p.genId);   
   console.log(formData)
   // console.log('SSSSSSSSS')
    return this.http.post(this.pathAPI+'postitemsphoto',formData).pipe(
      map((data) => {
        //You can perform some transformation here
       return data;
     }),
     catchError((err) => { 
       console.error(err);
       throw err;
     }
   ))  
}
_positemdetail(bo:product):Observable<any> {        
    const body=JSON.stringify(bo);
    //console.log('1KKKKKKK')
    console.log(this.pathAPI + 'postitemdetail', body) 
    return this.http.post<any>(this.pathAPI + 'postitemdetail', body)
       .pipe(
          map((data) => {         
           return data;
         }),
         catchError((err) => {
           console.error(err);
           throw err;
         }
       ))
}  
//--================================
_delitemdetail(bo:product) {   
     return this.http.post(this.pathAPI + 'delitemdetail',bo )
    .pipe( catchError((err) => {  console.error(err);  throw err; }))
} 
  //-------------------- items_photo
  _getitemsphoto(par:string): Observable<any>{      
     return this.http.get<any>(this.pathAPI +'itemsphoto?itemid='+par)
    .pipe(map((data)=>{
      return data;
    }),
      catchError((err) => {
        console.error(err);
        throw err;
      }
    )); 
  } 
   _positemsphoto(bo:prodphoto):Observable<any> {        
    const body=JSON.stringify(bo);    
    return this.http.post<prodphoto>(this.pathAPI + 'postitemsphoto', body)
       .pipe(
          map((data) => {
            //You can perform some transformation here
           return data;
         }),
         catchError((err) => {
           console.error(err);
           throw err;
         }
       ))
  }  
  _delitemsphoto(bo:prodphoto) {   
   // const bod:MenuItem= { pid: id,pagename:'' }
    //console.log(id)
     return this.http.post(this.pathAPI + 'delitemsphoto',bo )
    .pipe( catchError((err) => {  console.error(err);  throw err; }))
  } 
  //=====================================
  //-------------------- itemsales
  _getitemsales(): Observable<any>{      
   return this.http.get<any>(this.pathAPI +'itemsales')
    .pipe(map((data)=>{
      return data;
    }),
      catchError((err) => {
        console.error(err);
        throw err;
      }
    )); 
  } 
  _positemsales(bo:_sales):Observable<any> {        
    const body=JSON.stringify(bo);  
    return this.http.post<_sales>(this.pathAPI + 'postitemsales', body)
       .pipe(
          map((data) => {
            //You can perform some transformation here
           return data;
         }),
         catchError((err) => {
           console.error(err);
           throw err;
         }
       ))
  }  
  _delitemsales(bo:_sales) {   
   // const bod:MenuItem= { pid: id,pagename:'' }
    //console.log(id)
     return this.http.post(this.pathAPI + 'delitemsales',bo )
    .pipe( catchError((err) => {  console.error(err);  throw err; }))
  } 
  //-------------------- ShippingDetail
  _getShippingDetail(): Observable<any>{    
    return this.http.get<any>(this.pathAPI +'ShippingDetail')
    .pipe(map((data)=>{
      return data;
    }),
      catchError((err) => {
        console.error(err);
        throw err;
      }
    )); 
  } 
  _posShippingDetail(bo:shipper):Observable<any> {        
    const body=JSON.stringify(bo);  
    return this.http.post<shipper>(this.pathAPI + 'postShippingDetail', body)
       .pipe(
          map((data) => {
            //You can perform some transformation here
           return data;
         }),
         catchError((err) => {
           console.error(err);
           throw err;
         }
       ))
  }  
  _delShippingDetail(bo:shipper) {   
   // const bod:MenuItem= { pid: id,pagename:'' }
    //console.log(id)
     return this.http.post(this.pathAPI + 'delShippingDetail',bo )
    .pipe( catchError((err) => {  console.error(err);  throw err; }))
  } 
}
