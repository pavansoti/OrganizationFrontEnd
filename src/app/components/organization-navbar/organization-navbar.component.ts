import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'src/app/services/dialog.service';
import { EmployeeFilterService } from 'src/app/services/employee-filter.service';
import { OrganizationService } from 'src/app/services/organization.service';
import { ProjectFilterService } from 'src/app/services/project-filter.service';

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
  val=""
  constructor(private _route:ActivatedRoute,private _router:Router,
    private _organizationService:OrganizationService,private _employeeFilterService:EmployeeFilterService,
    private _dialogService:DialogService,private _projectFilterService:ProjectFilterService,
  ){ }

  img:string
  ngOnInit(){
    this.getPathOf2Index()
    this._organizationService.getOrganization(this.orgUsername).subscribe(res=>{
      if(res){
        this.org=res
        this.img='data:'+this.org.orgImagePath+';base64,'+this.org.orgImage
      }else{
        this._router.navigateByUrl('/user-not-found')
      }
    })  
    this.getPathOf3Index()
  }

  selectFeature(feature: string) {
    this.val=''
    this.feature=feature;
  }

  logout(){
    localStorage.removeItem('token')
    this._dialogService.showSuccess('Success','Logged out')
    this._router.navigateByUrl('/login')
  }

  getPathOf3Index(){
    let paths=this._router.url.split('/')
    console.log(paths);
    if(paths.length>3){
      this.feature=paths[3]
    }else{
      this.feature='home'
    }
  }

  onEmployeeRoleFilter(role:string){
    this._employeeFilterService.setSearchVal('')
    this.val=''
    this._employeeFilterService.setRoleFilter(role)
    this._router.navigateByUrl(`org/${this.orgUsername}/employee/all-employees`)
  }

  onProjectStatusFilter(status:string){
    this._projectFilterService.setSearchVal('')
    this.val=''
    this._projectFilterService.setStatusFilter(status)
    this._router.navigateByUrl(`org/${this.orgUsername}/project/all-projects`)
  }

  //emp or project, searching value
  search(item:string,form:NgForm){
    this._employeeFilterService.setRoleFilter('all')
    const searchVal=form.value.val
    if(item==='employee'){
      this._employeeFilterService.setSearchVal(searchVal)
      this._router.navigateByUrl(`org/${this.orgUsername}/employee/all-employees`)
    }
    else if(item=='project'){
      this._projectFilterService.setSearchVal(searchVal)
      this._router.navigateByUrl(`org/${this.orgUsername}/project/all-projects`)
    }
  }

  removeSearchVal(){
    this.val=''
    this.role=''
  }

  getPathOf2Index(){
    let path=this._router.url.split('/')
    this.orgUsername=path[2]
  }

}