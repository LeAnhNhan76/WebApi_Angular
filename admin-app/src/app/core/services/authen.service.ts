import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SystemConstants } from '../../core/common';
import {map} from 'rxjs/operators';
import { LoggedInUser } from '../domain';

@Injectable()
export class AuthenService {
  constructor(private _httpClient: HttpClient) {}

  login(username: string, password: string): any {
    let body = 'userName=' + encodeURIComponent(username) +
      '&password=' + encodeURIComponent(password) +
      '&grant_type=password';

    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    let options = {
      headers: headers
    }

    return this._httpClient.post(SystemConstants.BASE_API + SystemConstants.AUTHEN_URL, body, options).pipe(map((response : any) => {
      if(response) {
        let user : LoggedInUser = response;
        if(user && user.access_token){
          localStorage.removeItem(SystemConstants.CURRENT_USER);
          localStorage.setItem(SystemConstants.CURRENT_USER, JSON.stringify(user));
        }
      }
    }))
  }

  logout(): void {
    localStorage.removeItem(SystemConstants.CURRENT_USER);
  }

  isUserAuthenticated(): boolean {
    let user = localStorage.getItem(SystemConstants.CURRENT_USER);
    return user !== null && user !== undefined;
  }

  getLoggedinUser(): LoggedInUser {
    let user : LoggedInUser;
    let userData = localStorage.getItem(SystemConstants.CURRENT_USER);
    user = userData !== null && userData !== undefined ? user= JSON.parse(userData) : null;
    return user;
  }
  checkAccess(functionId: string) {
    var user = this.getLoggedinUser();
    var permission: any[] = JSON.parse(user.permissions);
    var roles: any[] = JSON.parse(user.roles);
    var hasPermission: number = permission.findIndex(x => x.FunctionId == functionId && x.CanRead == true);
    if (hasPermission != -1 || roles.findIndex(x => x == "Admin") != -1) {
      return true;
    }
    else
      return false;
  }
  hasPermission(functionId: string, action: string): boolean {
    var user = this.getLoggedinUser();
    var result: boolean = false;
    var permission: any[] = JSON.parse(user.permissions);
    var roles: any[] = JSON.parse(user.roles);
    switch (action) {
      case 'create':
        var hasPermission: number = permission.findIndex(x => x.FunctionId == functionId && x.CanCreate == true);
        if (hasPermission != -1 || roles.findIndex(x => x == "Admin") != -1)
          result = true;
        break;
      case 'update':
        var hasPermission: number = permission.findIndex(x => x.FunctionId == functionId && x.CanUpdate == true);
        if (hasPermission != -1 || roles.findIndex(x => x == "Admin") != -1)
          result = true;
        break;
      case 'delete':
        var hasPermission: number = permission.findIndex(x => x.FunctionId == functionId && x.CanDelete == true);
        if (hasPermission != -1 || roles.findIndex(x => x == "Admin") != -1)
          result = true;
        break;
    }
    return result;
  }
}
