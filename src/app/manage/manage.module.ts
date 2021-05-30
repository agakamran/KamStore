import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageRoutingModule } from './manage-routing.module';
import { ManageListComponent } from './manage-list/manage-list.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

import { TwoFactorAuthenticationComponent } from './two-factor-authentication/two-factor-authentication.component';
import { NeticeComponent } from './netice/netice.component';
import { MykabComponent } from './mykab/mykab.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdditemComponent } from './additem/additem.component';
import { MDBmaterialModule } from '../mdbmaterial/mdbmaterial.module';
import { HttpClientModule } from '@angular/common/http';
//import { UploadFilesComponent } from './upload-files/upload-files.component';
import { FirmaComponent } from './firma/firma.component';
//import { ProfilComponent } from './profil/profil.component';
//import { ProfileComponent } from './profile/containers/profile.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ProfileModule } from './profile/profile.module';




@NgModule({
  declarations: [ManageListComponent, ChangePasswordComponent,FirmaComponent,// ProfilComponent, 
     TwoFactorAuthenticationComponent, NeticeComponent,
      MykabComponent, AdditemComponent,// UploadFilesComponent
    ],
  imports: [
    CommonModule,
    ManageRoutingModule,
    MDBmaterialModule,
    HttpClientModule,
    ReactiveFormsModule,   
    FormsModule,
    RouterModule,
    ProfileModule
    ],
  schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ]
})
export class ManageModule { }
