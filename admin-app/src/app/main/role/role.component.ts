import { Component, OnInit } from '@angular/core';
import { MessageContstants } from 'src/app/core/common';
import { DataService, NotificationService } from 'src/app/core/services';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  public pageIndex: number = 1;
  public pageSize: number = 20;
  public filter: string = '';
  public roles: any[];
  constructor(private dataService: DataService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.onLoad();
  }

  onLoad(): void{
    this.dataService.get(`/api/appRole/getlistpaging?page=${this.pageIndex}&pageSize=${this.pageSize}&filter=${this.filter}`)
    .subscribe((response: any) => {
      if(response) {
        this.roles = response.Items;
        this.pageIndex = response.PageIndex;
        console.log('roles', this.roles);
      }
    },
    () => {
      this.notificationService.printErrorMessage(MessageContstants.LOAD_FAILED_MSG);
    });
  }

  onSearch(){
    this.onLoad();
  }

}
