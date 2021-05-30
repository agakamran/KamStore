import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { IRoleModifi, IRole, IRoleEdit } from 'src/app/models/_role';
import { Observable } from 'rxjs';
import { RequestResult } from 'src/app/models/_users';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  pathAPI: string;
  constructor(private http: HttpClient) { this.pathAPI=environment.apiUrl+'Role/';  }  
 //---------yeni---------------------------------------------------
 //roleList:IRole[];     
 //form:FormGroup=new FormGroup({  id:new FormControl(null),  name:new FormControl('',Validators.required) });
 //initializeFormGroup(){ this.form.setValue({  id:'', name:''});  }
 //populateFrom(roleList)  {  this.form.setValue(_.omit(roleList));  } 
 //------------------------Edit---------------------------------------------------

 //editroleList:IRoleModifi[];
 //editform:FormGroup=new FormGroup({  RoleId:new FormControl(null), RoleName:new FormControl('',Validators.required),
 //IdsToAdd:new FormControl([]),IdsToDelete:new FormControl([]) });
 //editinitializeFormGroup(){ this.editform.setValue({  RoleId:'', RoleName:'',IdsToAdd:null,IdsToDelete:null});  }
 //editpopulateFrom(editroleList)  {  this.editform.setValue(_.omit(editroleList));  } 
//---------------------------------------------------------------------------------- 


_getrole (): Observable<IRole[]> {    
  return this.http.get<IRole[]>(this.pathAPI+ '_getRoles' )
  .pipe( catchError((err) => {  console.error(err);  throw err; }  ))
  
 }
 _CreateRole(XX:IRole): Promise<any>
 {
    const bod:IRole= { id: XX.id, name:XX.name    }        
      return this.http.post( this.pathAPI + '_CreateRole', bod).toPromise() 
      .then(response => {
          let result = response as RequestResult;              
          return result.mesage;
      }).catch( catchError((err) => {  console.error(err);  throw err;}));    
  }
  _delRol(id:string) {   
    const bod:IRole= { id: id, name:'' }
    //console.log(id)
     return this.http.post(this.pathAPI + '_DeleteRole',bod )
    .pipe( catchError((err) => {  console.error(err);  throw err; }))

    //.pipe( map(this.extractData), catchError(super.handleError)).subscribe(); 
  }  
  _getUser(id:string): Observable<IRoleEdit> {   
      return this.http.get<IRoleEdit>(this.pathAPI + '_getUser/?id='+id)
      .pipe(catchError((err) => {  console.error(err);  throw err; }));
  }  

 
 _EditRol(_log:IRoleModifi): Promise<any>
  {
    //console.log(_log)
     const bod:IRoleModifi=  {  RoleId:_log.RoleId, RoleName: _log.RoleName,
                              IdsToAdd:_log.IdsToAdd, IdsToDelete:_log.IdsToDelete ,sel:_log.sel }         
       return this.http.post( this.pathAPI + '_EditRoles', bod).toPromise() 
       .then(response => {
         
           let result = response as unknown as IRoleModifi;              
           return result;
       }).catch(catchError((err) => {  console.error(err);  throw err; })); 
  }
}
