import { Routes } from '@angular/router';
import { RegisterComponent } from './Admin/Auth/register/register.component';
import { AuthComponent } from './Admin/Auth/auth.component';
import { LoginComponent } from './Admin/Auth/login/login.component';
import { DashboardComponent } from './Admin/Dashboard/dashboard.component';
import { ContainerComponent } from './Admin/components/container/container.component';
import { authGuard } from '../guards/auth.guard';
import { adminGuard } from '../guards/admin.guard';
import { BranchesComponent } from './Admin/branches/branches.component';
import { UploadFileComponent } from './Admin/components/views/upload-file/upload-file.component';
import { ViewMenuComponent } from './Admin/components/views/view-menu/view-menu.component';
import { LandingPageComponent } from './User/pages/landing-page/landing-page.component';
import { MainComponent } from './User/pages/main/main.component';
import { AdminDashboardComponent } from './SuperAdmin/admin-dashboard/admin-dashboard.component';
import { superAdminGuard } from '../guards/super-admin.guard';
import { PrivacyPolicyComponent } from './User/pages/privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from './User/pages/terms-conditions/terms-conditions.component';

export const routes: Routes = [  
  {path: 'Auth',
  component: AuthComponent,
  children:[
  {path: 'register' , component:RegisterComponent},
  {path: 'login' , component:LoginComponent}

  ]},
{path: 'home',component: LandingPageComponent},
{path:"privacy-policy" , component: PrivacyPolicyComponent},
{path:"terms-and-conditions" , component: TermsConditionsComponent},
    
{path: 'Home',
   canActivate: [authGuard , adminGuard],
  component: ContainerComponent,
  
  children:[
  {path: 'dashboard' , component:DashboardComponent},
  { path: ':facilityId/branches', component: BranchesComponent},
  { path: ':branchId/uploadMenu', component: UploadFileComponent},
  { path: ':branchId/viewMenu', component: ViewMenuComponent },
  ]
},
{
  path: 'Admin',
  canActivate : [authGuard, superAdminGuard],
  component:ContainerComponent,

  children:[
    {path:'dashboard', component:AdminDashboardComponent}
  ]

},
  {
    path: ':facilityId/:branchId',
    children: [
      { path: 'main' , component: MainComponent},
  ]},

  { path: '', redirectTo:  '/home', pathMatch: 'full' },
 
  { path: '**', redirectTo: '/home', pathMatch: 'full' },

];

