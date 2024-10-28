import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
    "orgName":['',[Validators.minLength(4),Validators.pattern(/^[a-zA-Z-' ]+$/),Validators.required]],
    "orgContact":['',[Validators.pattern(/^\d{10}$/),Validators.required]],
    "orgUsername":['',[Validators.minLength(4),Validators.pattern(/^[a-zA-Z][a-zA-Z0-9@._-]*$/),Validators.required]],
    "orgPassword":['',[Validators.minLength(6),Validators.required]],
    "orgImage":[null,[Validators.required]]
  })
  imageError
  constructor(private _fb:FormBuilder,private _organizationService:OrganizationService,
    private _dialogService:DialogService,private _router:Router
  ) {
  }

  onChange(event:any){
    const file = event.target.files[0];
    if (file) {
      //validate image type
      console.log(file.type);
      
      const validImageTypes = ['image/jpeg', 'image/png'];
      if (!validImageTypes.includes(file.type)) {
        this.imageError = 'Only JPG, PNG are allowed.';
        this.registrationForm.get('orgImage')?.setValue(null);
        return;
      }

      // Validate file size (max 2MB)
      const maxSizeInMB = 1;
      if (file.size > maxSizeInMB * 1024 * 1024) {
        this.imageError = `Image size should not exceed ${maxSizeInMB}MB.`;
        this.registrationForm.get('orgImage')?.setValue(null);
        return;
      }

      // Clear errors if file is valid
      this.imageError = null;
      this.registrationForm.get('orgImage')?.setValue(file);
    }
  }

  register() {
    
    if(this.registrationForm.valid){
      let orgDetails={
        orgName:this.registrationForm.value.orgName,
        orgContact:this.registrationForm.value.orgContact,
        orgUsername:this.registrationForm.value.orgUsername,
        orgPassword:this.registrationForm.value.orgPassword,
        }
        const formData=new FormData();
        formData.append('organization',new Blob([JSON.stringify(orgDetails)], { type: 'application/json' }))
        formData.append('orgImage', this.registrationForm.get('orgImage').value)
        this._organizationService.addOrganization(formData).subscribe({
          next:res=>{
            this._dialogService.showSuccess('Success','Organization registered')
            this._router.navigateByUrl('/login')
          },error:(err)=>{
              this._dialogService.showFailed('Failed',err.error)
          }
        });
     }else{
      this.registrationForm.markAllAsTouched();
        this._dialogService.showFailed('Failed','Invalid form!!!')
     }
  }

  get orgUsername(){
    return this.registrationForm.get('orgUsername')
  }

  get orgContact(){
    return this.registrationForm.get('orgContact')
  }

  get orgName(){
    return this.registrationForm.get('orgName')
  }

  get orgPassword(){
    return this.registrationForm.get('orgPassword')
  }

  get orgImage(){
    return this.registrationForm.get('orgImage')
  }

  get usernameCheckStart() {
    const username = this.orgUsername?.value || '';
    return username.length > 0 && !/^[a-zA-Z]/.test(username);
  }

  get usernameCheckSpace() {
    const username = this.orgUsername?.value || '';
    return username.includes(' ');
  }

  get isUsernameValid() {
    const username = this.registrationForm.get('orgUsername')?.value;
    const pattern = /^[a-zA-Z][a-zA-Z0-9@._-]*$/;
    return pattern.test(username);
  }

}
