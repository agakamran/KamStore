import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { MainComponent } from './main/main.component';

//import { NavbarModule,DropdownModule,CardsModule, ButtonsModule, IconsModule} from 'angular-bootstrap-md';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MDBmaterialModule } from '../mdbmaterial/mdbmaterial.module';
import { MaterialModule } from '../material/material.module';
import { OnitemComponent } from './onitem/onitem.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MDBmaterialModule,
    MaterialModule,
  //  NavbarModule,
    //IconsModule,
   
   // DropdownModule.forRoot(),
   // CardsModule,
   //ButtonsModule,
  
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
  ]
})
export class CoreModule {}
