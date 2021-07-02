import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UrlConstants } from '../core/common';
import { AuthenService } from '../core/services';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private authenService: AuthenService
    , private router: Router) { }

  ngOnInit(): void {
  }

  onLogout(): void{
    this.authenService.logout();
    setTimeout(() => {
      this.router.navigate([UrlConstants.LOGIN]);  
    }, 3000);
  }

}
