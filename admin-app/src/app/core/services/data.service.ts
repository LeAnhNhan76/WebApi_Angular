import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MessageContstants, SystemConstants } from '../common';
import { AuthenService } from './authen.service';
import { NotificationService } from './notification.service';
import { UtilityService } from './utility.service';

@Injectable()
export class DataService {

  constructor(private _httpClient: HttpClient
    , private _authenService : AuthenService
    , private _notificationService : NotificationService
    , private _utilityService : UtilityService ) { }

  get(uri: string): any {
    return this._httpClient.get(SystemConstants.BASE_API + uri, this.getHeader()).pipe(map((response: any) => response));
  }

  post(uri: string, data?: any): any {
    return this._httpClient.post(SystemConstants.BASE_API + uri, data, this.getHeader()).pipe(map((response: any) => response));
  }

  put(uri: string, data?: any): any {
    return this._httpClient.put(SystemConstants.BASE_API + uri, data, this.getHeader()).pipe(map((response: any) => response));
  }

  delete(uri: string, key: string, id: string): any{
    return this._httpClient.delete(SystemConstants.BASE_API + uri + "/?" + key + "=" + id, this.getHeader()).pipe(map((response: any) => response));
  }

  postFile(uri: string, data?: any): any {
    return this._httpClient.post(SystemConstants.BASE_API + uri, data, this.getHeader()).pipe(map((response: any) => response));
  }

  public handleError(error: any): any {
    if (error.status == 401) {
        localStorage.removeItem(SystemConstants.CURRENT_USER);
        this._notificationService.printErrorMessage(MessageContstants.LOGIN_AGAIN_MSG);
        this._utilityService.navigateToLogin();
    }
    else {
        let errMsg = (error.error.Message) ? error.error.Message :
            error.status ? `${error.status} - ${error.statusText}` : 'Lỗi hệ thống';
        this._notificationService.printErrorMessage(errMsg);
    }
  }

  getToken(): string{
    return this._authenService.getLoggedinUser().access_token;
  }

  getHeader(): any{
    return {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization',  `Bearer ${this.getToken()}`)
    };
  }
}
