import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/services/dialog.service';
import { OrganizationService } from 'src/app/services/organization.service';

@Component({
  selector: 'app-organization-register',
  templateUrl: './organization-register.component.html',
  styleUrls: ['./organization-register.component.css']
})
export class OrganizationRegisterComponent {

  registrationForm=this._fb.group({
    "orgName":['orgname'],
    "orgContact":[65656456],
    "orgUsername":['orgusername'],
    "orgPassword":['pass'],
    "orgImage":[null]
  })

  constructor(private _fb:FormBuilder,private _organizationService:OrganizationService,
    private _dialogService:DialogService,private _router:Router
  ) {
  }

  onChange(event:any){
    this.registrationForm.patchValue({
      "orgImage": event.target.files[0]
    });
  }

  register() {
   let orgDetails={
    orgName:this.registrationForm.value.orgName,
    orgContact:this.registrationForm.value.orgContact,
    orgUsername:this.registrationForm.value.orgUsername,
    orgPassword:this.registrationForm.value.orgPassword,
    }
    const formData=new FormData();
    formData.append('organization',new Blob([JSON.stringify(orgDetails)], { type: 'application/json' }))
    formData.append('orgImage', this.registrationForm.get('orgImage').value)
    this._organizationService.addOrganization(formData).subscribe((res)=>{
        this._dialogService.showSuccess('Success','Organization registered')
        this._router.navigateByUrl('/login')
    },(err)=>{
        this._dialogService.showFailed('Failed',err.error)
    });
  }
}
