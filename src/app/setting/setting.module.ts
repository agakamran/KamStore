import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingListComponent } from './setting-list/setting-list.component';
import { GenderComponent } from './gender/gender.component';
import { HttpClientModule } from '@angular/common/http';
import { MDBmaterialModule } from '../mdbmaterial/mdbmaterial.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
//import { FirmaComponent } from './firma/firma.component';
import { BedenComponent } from './beden/beden.component';
import { CategoriyaComponent } from './categoriya/categoriya.component';
import { ColorsComponent } from './colors/colors.component';
import { DesenComponent } from './desen/desen.component';
import { MarkaComponent } from './marka/marka.component';
import { MateralComponent } from './materal/materal.component';
import { StilComponent } from './stil/stil.component';
import { KullanimalaniComponent } from './kullanimalani/kullanimalani.component';
import { KumashtipiComponent } from './kumashtipi/kumashtipi.component';
import { QelipComponent } from './qelip/qelip.component';
import { QoltipiComponent } from './qoltipi/qoltipi.component';
import { YakaComponent } from './yaka/yaka.component';
import { HazirlaComponent } from './hazirla/hazirla.component';


@NgModule({
  declarations: [SettingListComponent, GenderComponent, //FirmaComponent,
     BedenComponent, CategoriyaComponent, ColorsComponent, DesenComponent, 
     MarkaComponent, MateralComponent, StilComponent,KullanimalaniComponent,
     KumashtipiComponent, QelipComponent, QoltipiComponent, YakaComponent,HazirlaComponent
    ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    MDBmaterialModule,
    HttpClientModule,
    ReactiveFormsModule,   
    FormsModule,
    RouterModule   
  ],
  schemas:[NO_ERRORS_SCHEMA]
})
export class SettingModule { }
