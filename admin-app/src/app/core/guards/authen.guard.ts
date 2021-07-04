import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { SystemConstants, UrlConstants } from "../common";

@Injectable()
export class AuthenGuard implements CanActivate{
    constructor(private router: Router){}

    canActivate(activedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean {
        if(localStorage.getItem(SystemConstants.CURRENT_USER)){
            return true;
        }
        else{
            this.router.navigate([UrlConstants.LOGIN], {
                queryParams: {returnUrl: routerState.url}
            });
            return false;
        }
    }
}