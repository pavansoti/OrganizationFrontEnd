import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/services/dialog.service';
import { OrganizationService } from 'src/app/services/organization.service';

@Component({
  selector: 'app-organization-login',
  templateUrl: './organization-login.component.html',
  styleUrls: ['./organization-login.component.css']
})
export class OrganizationLoginComponent {

  org={
    orgUsername:"cyepro",
    orgPassword:"pass"
  }

  constructor(private _router:Router, private _organizationService:OrganizationService,
    private _dialogService:DialogService
  ){}

  ngOnInit(){
    localStorage.removeItem('token')
  }


  login(org:any){
    console.log(org.value);
    
    this._organizationService.login(org.value).subscribe((res)=>{
      if(res){
        localStorage.setItem('token',res.orgUsername)
        this._dialogService.showSuccess('Success','logged in as '+res.orgUsername)

        this._router.navigateByUrl('org/'+res.orgUsername)
      }else{
        this._dialogService.showFailed('Failed','username or password not matched!!!')
      }
    })
    
  }
}
