import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UrlConstants } from '../core/common';
import { LoggedInUser } from '../core/domain';
import { AuthenService } from '../core/services';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public user: LoggedInUser;
  constructor(private authenService: AuthenService
    , private router: Router) { }

  ngOnInit(): void {
    this.user = this.authenService.getLoggedinUser();
  }

}
