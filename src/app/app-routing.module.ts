import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { MainComponent } from './core/main/main.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { OnitemComponent } from './core/onitem/onitem.component';
import { RegisterComponent } from './auth/component/register/register.component';
import { LoginComponent } from './auth/component/login/login.component';



const routes: Routes = [
    { path: '', component: HomeComponent, children: [
    { path: '', component: MainComponent},
 /* {
      path: 'projects',
      loadChildren: () => import('../app/projects/projects.module')
        .then(module => module.ProjectsModule), //canLoad: [AdminAuthGuard],
      canActivate: [AuthGuard]
    },
    {
      path: 'customers',
      loadChildren: () => import('../app/customers/customers.module')
        .then(module => module.CustomersModule), //canLoad: [AdminAuthGuard],
      canActivate: [AuthGuard]
    },
    {
      path: 'profile',
      loadChildren: () => import('../app/profile/profile.module')
        .then(module => module.ProfileModule), //canLoad: [AdminAuthGuard],
      canActivate: [AuthGuard]
    },
    {
      path: 'charts',
      loadChildren: () => import('../app/charts/charts.module')
        .then(module => module.ChartsDataModule), //canLoad: [AdminAuthGuard],
      canActivate: [AuthGuard]
    },*/
    // { path: 'projects', loadChildren: './projects/projects.module#ProjectsModule', canActivate: [AuthGuard]},
    // { path: 'customers', loadChildren: './customers/customers.module#CustomersModule', canActivate: [AuthGuard]},
    // { path: 'profile', loadChildren: './profile/profile.module#ProfileModule', canActivate: [AuthGuard] },
    { path: 'charts', loadChildren: './charts/charts.module#ChartsDataModule', canActivate: [AuthGuard] },
    { path: 'manage', loadChildren:'./manage/manage.module#ManageModule',canActivate: [AuthGuard] }, 
    { path: 'admin', loadChildren:'./admin/admin.module#AdminModule', canActivate: [AuthGuard] } ,
    { path: 'setting', loadChildren:'./setting/setting.module#SettingModule', canActivate: [AuthGuard] }
    //{ path: 'admin-panel', component: AdminComponent canActivate: [AdminGuard]    }
  ]},
  { path: 'onitem', component: OnitemComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
