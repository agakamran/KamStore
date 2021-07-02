import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { MenuItem, NavbarRole } from 'src/app/models/_menu';
import { IRole } from 'src/app/models/_role';
import * as datmenu  from '../../_json/menu.json';

//import * as datrolmen  from '../../api/rolmenu.json';
@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  pathAPI: string;
  constructor(private http: HttpClient) { this.pathAPI=environment.apiUrl+'Navbars/';  }
  _getmenu(): Observable<any>{      
    //const body=JSON.stringify(pra);
   // console.log('uuuuu')
   // console.log(body.toString())   
    return this.http.get<any>(this.pathAPI +'_getnav')
    .pipe(map((data)=>{
      return data;
    }),
      catchError((err) => {
        console.error(err);
        throw err;
      }
    )); 
  } 
  _getrole (): Observable<IRole[]> {    
    return this.http.get<IRole[]>(this.pathAPI+ '_getRoles' )
    .pipe( catchError((err) => {  console.error(err);  throw err; }  ))
    
   }
   _jsonmenu(): Observable<MenuItem[]> {    
    return of((datmenu as any).default)   
   }
  
  _allmenu(pra:any): Observable<any>{  
    
    const body=JSON.stringify(pra);
    //console.log('kkk')
    //console.log(body)
   // console.log(body.toString())   
    return this.http.post<any>(this.pathAPI +'_getnavbar',body)
    .pipe(map((data)=>{
      return data;
    }),
      catchError((err) => {
        console.error(err);
        throw err;
      }
    )); 
  } 
  _posmenu(bo:MenuItem):Observable<MenuItem> {        
    const body=JSON.stringify(bo);  
   // console.log(body)
    return this.http.post<MenuItem>(this.pathAPI + 'postmenu', body)
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
  _delmenu(bo:MenuItem) {   
   // const bod:MenuItem= { pid: id,pagename:'' }
    //console.log(id)
     return this.http.post(this.pathAPI + 'delmenu',bo )
    .pipe( catchError((err) => {  console.error(err);  throw err; }))
  } 
  //---------------------------------------------
  _allnavrol(): Observable<any>{  
     return this.http.get<any>(this.pathAPI +'_getnavrol')
    .pipe(map((data)=>{
      return data;
    }),
      catchError((err) => {
        console.error(err);
        throw err;
      }
    )); 
  } 
  _addnavrol(bo:NavbarRole):Observable<NavbarRole> {        
    const body=JSON.stringify(bo);  
   // console.log(body)
    return this.http.post<NavbarRole>(this.pathAPI + '_addnavrol', body)
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
  _delnavrol(bo:NavbarRole) {   
   // const bod:MenuItem= { pid: id,pagename:'' }
    //console.log(id)
     return this.http.post(this.pathAPI + '_delnavrol',bo )
    .pipe( catchError((err) => {  console.error(err);  throw err; }))
  } 
}
