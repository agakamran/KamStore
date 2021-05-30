import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService { 
  //private baseUrl = 'http://localhost:8080';
  pathAPI: string;
  constructor(private http: HttpClient) {this.pathAPI=environment.apiUrl+'Settings/'; }

  _upload(g:any,file: File): Observable<HttpEvent<any>> 
  {
    const formData: FormData = new FormData();
    formData.append('item_Id',g.item_Id);
    formData.append('firma_Id',g.firma_Id);
    formData.append('file', file);
   // console.log('1111')
   // console.log(file)
    const req = new HttpRequest('POST', `${this.pathAPI}/postitemdetail`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  getFiles(): Observable<any>
  {
        return this.http.get(`${this.pathAPI}/itemsphoto`);
  }
  uploadAvatar(file: File) {  
  //  console.log(file)
   // alert('Images/profile/'+file.name)
        const fd: FormData = new FormData();   
        fd.append('file', file);  
       // fd.append('yol', 'Images/profile/'+file.name);         
        const req = new HttpRequest('POST', `${this.pathAPI}uplodeAvatar`, fd);
        console.log(req) 
        return this.http.request(req);  
  }
}
