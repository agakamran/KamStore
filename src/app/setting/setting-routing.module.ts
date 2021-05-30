import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingListComponent } from './setting-list/setting-list.component';
import { GenderComponent } from './gender/gender.component';
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


const routes: Routes = [
  { 
    path:'',component:SettingListComponent,
   children: [    
    //{ path: 'firma', component: FirmaComponent},   
    { path: 'gender', component: GenderComponent},
    { path: 'beden', component: BedenComponent},
    { path: 'categoriya', component: CategoriyaComponent},
    { path: 'colors', component: ColorsComponent},
    { path: 'desen', component: DesenComponent},
    { path: 'marka', component: MarkaComponent},         
    { path: 'materal', component: MateralComponent},     
    { path: 'stil', component: StilComponent}, 
    { path: 'kullanimalani', component: KullanimalaniComponent}, 
    { path: 'kumashtipi', component: KumashtipiComponent},
    { path: 'qelip', component: QelipComponent},
    { path: 'qoltipi', component: QoltipiComponent},
    { path: 'yaka', component: YakaComponent},
    { path: 'hazirla',  component: HazirlaComponent }
    ]    
 } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
