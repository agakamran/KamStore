import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MDBmaterialModule } from '../mdbmaterial/mdbmaterial.module';
import { MaterialModule } from '../material/material.module';
import { OnitemComponent } from './onitem/onitem.component';
import { StoreModule } from '@ngrx/store';
import * as fromMenus from './store/Menus.reducer';
import { EffectsModule } from '@ngrx/effects';
import { MenusEffects } from './store/menus.effects';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MDBmaterialModule,
    MaterialModule,  
    StoreModule.forFeature('menus', fromMenus.menusReducer),
    EffectsModule.forFeature([MenusEffects])    
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    WelcomeComponent,
    MainComponent,
    HomeComponent,
    DashboardComponent,
    PageNotFoundComponent,
    OnitemComponent,
   
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    WelcomeComponent,
    MainComponent,
    HomeComponent,
  ],
  providers:[],schemas: [ NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA ]
})
export class CoreModule {}
