import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private _toastr: ToastrService) { }

  showSuccess(title:string,msg:string){
    this._toastr.success(msg,title);
  }

  showFailed(title:string,msg:string){
    this._toastr.error(msg,title);
  }

  showInfo(title:string,msg:string){
    this._toastr.info(msg,title);
  }

  showShow(title:string,msg:string){
    this._toastr.show(msg,title);
  }
}
