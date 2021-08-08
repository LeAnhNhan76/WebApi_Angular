import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UrlConstants } from 'src/app/core/common';
import { LoggedInUser } from 'src/app/core/domain';
import { AuthenService } from 'src/app/core/services';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {

  public user: LoggedInUser;
  constructor(private authenService: AuthenService
    , private router: Router) { }

  ngOnInit(): void {
    this.user = this.authenService.getLoggedinUser();
  }

  onLogout(): void{
    this.authenService.logout();
    setTimeout(() => {
      this.router.navigate([UrlConstants.LOGIN]);  
    }, 3000);
  }

}
