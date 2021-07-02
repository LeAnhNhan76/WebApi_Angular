import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SystemConstants } from '../../core/common';
import {map} from 'rxjs/operators';
import { LoggedInUser } from '../domain';

@Injectable({
  providedIn: 'root',
})
export class AuthenService {
  constructor(private _httpClient: HttpClient) {}

  login(username: string, password: string): void {
    let body = 'userName=' + encodeURIComponent(username) +
      '&password=' + encodeURIComponent(password) +
      '&grant_type=password';

    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    let options = {
      headers: headers
    }

    this._httpClient.post(SystemConstants.BASE_API + SystemConstants.AUTHEN_URL, body, options).pipe(map((response : any) => {
       let user : LoggedInUser = response;
       if(user && user.access_token){
         localStorage.removeItem(SystemConstants.CURRENT_USER);
         localStorage.setItem(SystemConstants.CURRENT_USER, JSON.stringify(user));
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
}
