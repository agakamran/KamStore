import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminsListComponent } from './containers/admins-list/admins-list.component';
import { AdminComponent } from './containers/admin/admin.component';
import { RoleListComponent } from './containers/role-list/role-list.component';
import { NavbarComponent } from './containers/navbar/navbar.component';
// import { CartListComponent } from './containers/cart-list/cart-list.component';
// import { AddPageComponent } from './containers/add-page/add-page.component';
// import { AddvideoComponent } from './containers/addvideo/addvideo.component';



const routes: Routes = [
  { 
    path:'',component:AdminsListComponent,
   // canActivate: [ AuthGuard  ],
    children: [
      {
        path: '',  //component: UserComponent,
        children: [
          { path: 'admin-panel',      component: AdminComponent },
           { path: 'role',       component: RoleListComponent},    
           { path: 'addmen' ,    component: NavbarComponent }, 
           { path: 'admin' ,    component: AdminComponent },        
          // { path: 'cartlar' ,   component: CartListComponent },
          // { path: 'addpage' ,   component: AddPageComponent },
          // { path: 'addvideo' ,  component: AddvideoComponent },
          
         // { path: 'menurole' ,  component: NavroleComponent },
         // { path: 'settings' ,  component: SettingsComponent },
          //{ path: 'settings/gender' ,  component: GenderComponent },
        //{ path: 'LoginWith2fa/:id' ,  component: LoginWith2faComponent },
        //{ path: 'LoginWithRecovery' ,  component: LoginWithRecoveryCodeComponent }         
        //ConfirmEmail?userId=d1c80c0a-f231-4a8e-8761-125c4e676d7f&code=
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
