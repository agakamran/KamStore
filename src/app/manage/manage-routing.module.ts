import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageListComponent } from './manage-list/manage-list.component';
//import { ProfilComponent } from './profil/profil.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { TwoFactorAuthenticationComponent } from './two-factor-authentication/two-factor-authentication.component';
import { NeticeComponent } from './netice/netice.component';
import { MykabComponent } from './mykab/mykab.component';
import { AdditemComponent } from './additem/additem.component';
//import { UploadFilesComponent } from './upload-files/upload-files.component';
import { FirmaComponent } from './firma/firma.component';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ProfileModule } from './profile/profile.module';
import { CustomersModule } from './customers/customers.module';
import { ProjectsModule } from './projects/projects.module';
import { ChartsDataModule } from './charts/charts.module';

const routes: Routes = [ 
  { 
      path:'',component:ManageListComponent,
     children: [
     // { path: 'profil', component: ProfilComponent},
      { path: 'ChangePassword', component: ChangePasswordComponent},
      { path: 'additem', component: AdditemComponent},
      { path: 'firma', component: FirmaComponent},
     // { path: 'uplod', component: UploadFilesComponent},
      { path: 'netice', component: NeticeComponent},
     // { path: 'externallogins', component: ExternalLoginsComponent},
      { path: 'TwoFactorAuthentication', component: TwoFactorAuthenticationComponent},
     // { path: 'EnableAuthenticator', component: EnableAuthenticatorComponent},
      { path: 'mykabinet', component: MykabComponent},         
      { path: '', component: AdditemComponent}   ,
      { path: 'projects', loadChildren: './projects/projects.module#ProjectsModule', canActivate: [AuthGuard]},
      { path: 'customers', loadChildren: './customers/customers.module#CustomersModule', canActivate: [AuthGuard]},
      { path: 'profile', loadChildren: './profile/profile.module#ProfileModule', canActivate: [AuthGuard] },
      { path: 'charts', loadChildren: './charts/charts.module#ChartsDataModule', canActivate: [AuthGuard] },
      ]
          
   } 
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers:[ProfileModule,CustomersModule,ProjectsModule,ChartsDataModule],
  exports: [RouterModule,]
})
export class ManageRoutingModule { }
