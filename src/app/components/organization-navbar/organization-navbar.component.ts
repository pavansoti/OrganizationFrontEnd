import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'src/app/services/dialog.service';
import { EmployeeFilterService } from 'src/app/services/employee-filter.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { OrganizationService } from 'src/app/services/organization.service';

@Component({
  selector: 'app-organization-navbar',
  templateUrl: './organization-navbar.component.html',
  styleUrls: ['./organization-navbar.component.css'],
})
export class OrganizationNavbarComponent{

  org:any;
  routeSegment: string = '';
  orgUsername=""
  feature='home'
  role=""
  constructor(private _route:ActivatedRoute,private _router:Router,
    private _organizationService:OrganizationService,private _employeeFilterService:EmployeeFilterService,
    private _dialogService:DialogService
  ){ }

  img:string
  ngOnInit(){
    this._route.paramMap.subscribe(params=>{
      this.orgUsername=params.get('username') 
    this._organizationService.getOrganization(this.orgUsername).subscribe(res=>{
      if(res){
        this.org=res
        this.img='data:'+this.org.orgImagePath+';base64,'+this.org.orgImage
      }else{
        this._router.navigateByUrl('/user-not-found')
      }
    })  
    })
    this.getPathUrl3()
  }

  selectFeature(feature: string) {
    this.feature=feature;
  }

  logout(){
    let tok=localStorage.getItem('token')
    localStorage.removeItem('token')
    this._dialogService.showSuccess('Success','Logged out')
    this._router.navigateByUrl('/login')
  }

  getPathUrl3(){
    let paths=this._router.url.split('/')
    console.log(paths);
    if(paths.length>3){
      this.feature=paths[3]
    }else{
      this.feature='home'
    }
  }

  onEmployeeFilter(role:string){
    this._employeeFilterService.setRoleFilter(role)
    alert(role+" nav")
    this._router.navigateByUrl(`org/${this.orgUsername}/employee/all-employees`)
  }
}
