import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationLoginComponent } from './components/organization-login/organization-login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { OrganizationRegisterComponent } from './components/organization-register/organization-register.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { OrganizationHomeComponent } from './components/organization-home/organization-home.component';
import { OrganizationDashboardComponent } from './components/organization-dashboard/organization-dashboard.component';
import { OrganizationEmployeeComponent } from './components/organization-employee/organization-employee.component';
import { OrganizationProjectComponent } from './components/organization-project/organization-project.component';
import { OrganizationSettingsComponent } from './components/organization-settings/organization-settings.component';
import { OrganizationEventsComponent } from './components/organization-events/organization-events.component';
import { OrganizationNavbarComponent } from './components/organization-navbar/organization-navbar.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { authGuard } from './guards/auth.guard';
import { AllEmployeesComponent } from './components/all-employees/all-employees.component';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { AllProjectsComponent } from './components/all-projects/all-projects.component';
import { ViewProjectEmployeesComponent } from './components/view-project-employees/view-project-employees.component';
import { UpdateProjectComponent } from './components/update-project/update-project.component';
import { UpdateEmployeeComponent } from './components/update-employee/update-employee.component';
import { UserNotFoundComponent } from './components/user-not-found/user-not-found.component';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',component:OrganizationLoginComponent},
  {path:'register',component:OrganizationRegisterComponent},
  {path:'forget',component:ForgetPasswordComponent},
  {path:'org/:username',component:OrganizationNavbarComponent,canActivate: [authGuard],
    children: [
      { path: '', redirectTo:'home', pathMatch:'full'},
      { path: 'home', component: OrganizationHomeComponent ,  },
      { path: 'employee',redirectTo:'employee/all-employees'},
      { path: 'employee/add-employee', component: AddEmployeeComponent},
      { path: 'employee/all-employees', component: AllEmployeesComponent },
      { path: 'employee/all-employees/update-emp/:employeeId', component: UpdateEmployeeComponent },
      { path: 'project',redirectTo:'project/all-projects'},
      { path: 'project/add-project', component: AddProjectComponent,},
      { path: 'project/all-projects', component: AllProjectsComponent},
      { path: 'project/all-projects/view-details/:projectId', component: ViewProjectEmployeesComponent,},
      { path: 'project/all-projects/update-project/:projectId', component: UpdateProjectComponent,},
      { path: 'setting', component: OrganizationSettingsComponent,  },
      { path: 'event', component: OrganizationEventsComponent, },
    ]
  },
  {path:'user-not-found',component:UserNotFoundComponent},
  { path:'**',component:PageNotFoundComponent},
  {path:'**',redirectTo:'page-not-found'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }