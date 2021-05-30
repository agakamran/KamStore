import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { AngularFireDatabase } from '@angular/fire/database';
import { from, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private pathAPI =''
  constructor(private http: HttpClient ) { this.pathAPI=environment.apiUrl+'Account/'; }
  //constructor(private db: AngularFireDatabase  ) { }

  selectedUser = new Subject();
  selectedUser$ = this.selectedUser.asObservable();

  getUsersList() {    
    return from(this.http.get<any>(this.pathAPI + '_getUsers')
    .pipe( catchError((err) => {  console.error(err);  throw err; }  )));
    //const usersRef = this.db.list('users');
   // return usersRef.snapshotChanges();
  }

  getUserProjects(//uid: string
    ) {
   // const projectsRef = this.db.list('projects/' + uid);
   // return projectsRef.snapshotChanges();
  }

  getUserCustomers(//uid: string
    ) {
   // const customersRef = this.db.list('customers/' + uid);
   // return customersRef.snapshotChanges();
  }

  checkAdminRole(//uid: string
    ) {
   // return this.db.object('admins/' + uid).valueChanges();
  }

  deleteUserProject(//uid: string, projectId: string
    ) {
  //  return from(this.db.object(`projects/${uid}/` + projectId).remove());
  }

  deleteUserCustomer(//uid: string, customerId: string
    ) {
    //return from(this.db.object(`customers/${uid}/` + customerId).remove());
  }

  addAdminPrivileges(//uid: string
    ) {
  //  const adminsRef = this.db.object('admins/' + uid);
   // this.db.object('users/' + uid).update({ isAdmin: true });
   // return from(adminsRef.set(true));
  }

  removeAdminPrivileges(//uid: string
    ) {
   // this.db.object('users/' + uid).update({ isAdmin: false });
   // return from(this.db.object('admins/' + uid).remove());
  }
}
