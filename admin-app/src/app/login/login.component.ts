import { Component, OnInit } from '@angular/core';
import { AuthenService, NotificationService } from '../core/services';
import { MessageContstants, UrlConstants } from '../core/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public model: any = {};
  public loading: boolean = false;
  constructor(private authenService : AuthenService
    , private notificationService: NotificationService
    , private router: Router
    , private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onLogin(): any {
    this.loading = true;
    if(this.model && this.model.username && this.model.password){
      this.authenService.login(this.model.username, this.model.password).subscribe((response: any) => {
        this.notificationService.printSuccessMessage(MessageContstants.LOGIN_OK_MSG);
        setTimeout(() => {
          this.activatedRoute.queryParams.subscribe(params =>{
            let returnUrl = params['returnUrl'];
            if(returnUrl){
              this.router.navigate([returnUrl]);
            }
            else{
              this.router.navigate([UrlConstants.HOME]);
            }
          });
        }, 300);
      }
      ,() => {
        this.loading = false;
        this.notificationService.printErrorMessage(MessageContstants.LOGIN_FAILED_MSG);
      })
    }
  }

}
