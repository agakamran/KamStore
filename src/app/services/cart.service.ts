import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Cart, Page } from 'src/app/models/_carts';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root'})
export class CartService {
  pathAPI: string;
  constructor(private http: HttpClient) { this.pathAPI=environment.apiUrl+'Carts/';  }
  _pospage(bo:Page):Observable<Page> {        
    const body=JSON.stringify(bo);  
   // console.log(body)
    return this.http.post<Page>(this.pathAPI + 'postpage', body)
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
  _delpage(id:string) {   
    const bod:Page= { pid: id,pagename:'' }
    //console.log(id)
     return this.http.post(this.pathAPI + 'delpage',bod )
    .pipe( catchError((err) => {  console.error(err);  throw err; }))
  }  
  _getpages(): Observable<any>{ 
    return this.http.get<any>(this.pathAPI +'_getpages')
    .pipe(map((data)=>{
      return data;
    }),
      catchError((err) => {
        console.error(err);
        throw err;
      }
    )); 
  }   
  _allCarts(): Observable<any>{  
    //const body=JSON.stringify();
   // console.log('uuuuu')
    //console.log(body)
    return this.http.get<any>(this.pathAPI +'allCarts')
    .pipe(map((data)=>{
      return data;
    }),
      catchError((err) => {
        console.error(err);
        throw err;
      }
    )); 
  } 
  _getcarts(car:any): Observable<any>{  
    const body=JSON.stringify(car);
   // console.log('uuuuu')
    //console.log(body)
    return this.http.post<any>(this.pathAPI +'getCarts',body)
    .pipe(map((data)=>{
      return data;
    }),
      catchError((err) => {
        console.error(err);
        throw err;
      }
    )); 
  } 
  _getcart(pra:string): Observable<any>{  
    return this.http.get<any>(this.pathAPI +'GetCart?id='+pra)
    .pipe(map((data)=>{
      return data;
    }),
      catchError((err) => {
        console.error(err);
        throw err;
      }
    )); 
  } 
  _getsay(par:any): Observable<any>{   
    const body=JSON.stringify(par);
    //console.log(this.pathAPI +'_getsay',body)  
    return this.http.post<any>(this.pathAPI +'_getsay',body)
    .pipe(map((data)=>{
      return data;
    }),
      catchError((err) => {
        console.error(err);
        throw err;
      }
    )); 
  } 
  _poscart(bo:any):Observable<Cart> {     
    const body=JSON.stringify(bo);  
    return this.http.post<Cart>(this.pathAPI + 'PostCart', body)
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
  _delcart(c:Cart) {   
   // const bod:Page= { pid: id,pagename:'' }
    console.log(c)
     return this.http.post(this.pathAPI + 'delcart',c )
    .pipe( catchError((err) => {  console.error(err);  throw err; }))
  }     
  _uploadImage( nid:string,lang:string,har:string,sira:string,file: File) {   
    var formData: any = new FormData();  
    formData.append("file", file, file.name); 
    formData.append('nid',nid);
    formData.append('lan',lang);
    formData.append('harda',har);
    formData.append('sira',sira); 
   // console.log(formData)
   // formData.append('mimeType',mimeType)   
    return this.http.post(this.pathAPI+'uplodeVidio',formData).pipe(
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
 /* addPerson(person:Person): Observable<Person> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(person);
 
    return this.http.post<Person>(this.baseURL + 'people', body,{'headers':headers})
       .pipe(
         catchError((err) => {
           console.error(err);
           throw err;
         }
       )
  }
  addPerson(person:Person): Observable<Person> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(person);
 
    return this.http.post<Person>(this.baseURL + 'people', body,{'headers':headers})
       .pipe(
          map((data) => {
            //You can perform some transformation here
           return data;
         }),
         catchError((err) => {
           console.error(err);
           throw err;
         }
       )
  }
  addPerson1(person:Person): Observable<Person> {
    const headers = { 'content-type': 'application/json'}  
 
   const params = new HttpParams()
      .set('para1', "value1")
      .set('para2',"value2");
    const body=JSON.stringify(person);
 
    return this.http.post<Person>(this.baseURL + 'people', body,{'headers':headers, 'params': params})
       
  }*/
}
