import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMenujson } from '../models/_menu';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MenujsonService {
    public baseUrl =environment.apiUrl+ '/api/Menu/';
    private _MenuUrl = './mdbmaterial/Menu.json';
    constructor(private _http: HttpClient) { }

  _getMenu(): Observable<IMenujson[]> {
      return this._http.get<IMenujson[]>(this._MenuUrl)
         // .do(data => console.log('All: ' + JSON.stringify(data)))
         .pipe( catchError((err) => {  console.error(err);  throw err; }  ))
         // .catch(this.handleError);
  }
  _getmen(id: string):Observable<any> {
      let params = new HttpParams().set('id',id);    
      return this._http.get(this.baseUrl+ "_getmen/", { params: params }) 
      //.do(data => console.log('All: ' + JSON.stringify(data)))
      .pipe( catchError((err) => {  console.error(err);  throw err; }  ))
      //    .catch(this.handleError);    
  }    

}
