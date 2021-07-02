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

  private _headers: HttpHeaders = new HttpHeaders;
  constructor(private _httpClient: HttpClient
    , private _authenService : AuthenService
    , private _notificationService : NotificationService
    , private _utilityService : UtilityService ) { }

  get(uri: string): any {
    this._headers.delete("Authorization");
    this._headers.append("Authorization", "Bearer " + this._authenService.getLoggedinUser().access_token);
    return this._httpClient.get(uri, {headers: this._headers}).pipe(map(this.extractData));
  }

  post(uri: string, data?: any): any {
    this._headers.delete("Authorization");
    this._headers.append("Authorization", "Bearer " + this._authenService.getLoggedinUser().access_token);
    return this._httpClient.post(uri, data, {headers: this._headers}).pipe(map(this.extractData));
  }

  put(uri: string, data?: any): any {
    this._headers.delete("Authorization");
    this._headers.append("Authorization", "Bearer " + this._authenService.getLoggedinUser().access_token);
    return this._httpClient.put(uri, data, {headers: this._headers}).pipe(map(this.extractData));
  }

  delete(uri: string, key: string, id: string): any{
    this._headers.delete("Authorization");
    this._headers.append("Authorization", "Bearer " + this._authenService.getLoggedinUser().access_token);
    return this._httpClient.delete(uri + "/?" + key + "=" + id, {headers: this._headers}).pipe(map(this.extractData));
  }

  postFile(uri: string, data?: any): any {
    let newHeaders = new HttpHeaders;
    newHeaders.append("Authorization", "Bearer " + this._authenService.getLoggedinUser().access_token);
    return this._httpClient.post(uri, data, {headers: this._headers}).pipe(map(this.extractData));
  }

  private extractData(response: any): any{
    let body = JSON.parse(response);
    return body || {};
  }

  public handleError(error: any): any {
    if (error.status == 401) {
        localStorage.removeItem(SystemConstants.CURRENT_USER);
        this._notificationService.printErrorMessage(MessageContstants.LOGIN_AGAIN_MSG);
        this._utilityService.navigateToLogin();
    }
    else {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Lỗi hệ thống';
        this._notificationService.printErrorMessage(errMsg);

        return Observable.throw(errMsg);
    }

  }
}
