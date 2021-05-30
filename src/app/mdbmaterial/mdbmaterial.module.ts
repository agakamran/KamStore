import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsModule, DropdownModule, NavbarModule, ButtonsModule,
   IconsModule, ModalModule, BreadcrumbModule, InputsModule,
   TooltipModule, CarouselModule, BadgeModule, CheckboxModule,
   CollapseModule, InputUtilitiesModule, PopoverModule, 
   TableModule, WavesModule, MDBBootstrapModule, ChartsModule } from 'angular-bootstrap-md';
//import { LayoutModule } from '@angular/cdk/layout';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BadgeModule,BreadcrumbModule,ButtonsModule,CardsModule,CarouselModule.forRoot(),
    ChartsModule,CheckboxModule,CollapseModule.forRoot(),DropdownModule.forRoot(),
    IconsModule,InputsModule.forRoot(),InputUtilitiesModule,ModalModule.forRoot(),
    NavbarModule,PopoverModule.forRoot(),TableModule,TooltipModule.forRoot(),
    WavesModule.forRoot(),MDBBootstrapModule.forRoot()//,LayoutModule
  
  ],
  exports: [
    CommonModule,
    BadgeModule,BreadcrumbModule,ButtonsModule,CardsModule,CarouselModule,
    ChartsModule,CheckboxModule,CollapseModule,DropdownModule,
    IconsModule,InputsModule,InputUtilitiesModule,ModalModule,
    NavbarModule,PopoverModule,TableModule,TooltipModule,
    WavesModule,MDBBootstrapModule//,LayoutModule
  ]
})
export class MDBmaterialModule { }
