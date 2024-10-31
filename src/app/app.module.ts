import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrganizationLoginComponent } from './components/organization-login/organization-login.component';
import { OrganizationRegisterComponent } from './components/organization-register/organization-register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { OrganizationHomeComponent } from './components/organization-home/organization-home.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { OrganizationDashboardComponent } from './components/organization-dashboard/organization-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OrganizationNavbarComponent } from './components/organization-navbar/organization-navbar.component';
import { OrganizationEmployeeComponent } from './components/organization-employee/organization-employee.component';
import { OrganizationProjectComponent } from './components/organization-project/organization-project.component';
import { OrganizationSettingsComponent } from './components/organization-settings/organization-settings.component';
import { OrganizationEventsComponent } from './components/organization-events/organization-events.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { AllEmployeesComponent } from './components/all-employees/all-employees.component';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { AllProjectsComponent } from './components/all-projects/all-projects.component';
import { UpdateProjectComponent } from './components/update-project/update-project.component';
import { ViewProjectEmployeesComponent } from './components/view-project-employees/view-project-employees.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Toast, ToastrModule } from 'ngx-toastr';
import { StatusPipe } from './pipes/status.pipe';
import { DescriptionPipe } from './pipes/description.pipe';
import { UpdateEmployeeComponent } from './components/update-employee/update-employee.component';
import { UserNotFoundComponent } from './components/user-not-found/user-not-found.component';
import { AddEmployeeToProjectComponent } from './components/add-employee-to-project/add-employee-to-project.component';

@NgModule({
  declarations: [
    AppComponent,
    OrganizationLoginComponent,
    OrganizationRegisterComponent,
    PageNotFoundComponent,
    OrganizationHomeComponent,
    ForgetPasswordComponent,
    OrganizationDashboardComponent,
    OrganizationNavbarComponent,
    OrganizationEmployeeComponent,
    OrganizationProjectComponent,
    OrganizationSettingsComponent,
    OrganizationEventsComponent,
    AddEmployeeComponent,
    AllEmployeesComponent,
    AddProjectComponent,
    AllProjectsComponent,
    UpdateProjectComponent,
    ViewProjectEmployeesComponent,
    StatusPipe,
    DescriptionPipe,
    UpdateEmployeeComponent,
    UserNotFoundComponent,
    AddEmployeeToProjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 3000,  
      progressBar: true,
      easeTime: 300,
      preventDuplicates: true,
      positionClass:'toast-top-left'
      
    }),// ToastrModule added
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
