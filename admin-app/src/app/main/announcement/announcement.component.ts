import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { MessageContstants } from 'src/app/core/common';
import { DataService, NotificationService, UtilityService } from 'src/app/core/services';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss']
})
export class AnnouncementComponent implements OnInit {

  @ViewChild('addEditModal') addEditModal: ModalDirective;
  public totalRows: number;
  public pageIndex: number = 1;
  public pageSize: number = 20;
  public pageDisplay: number = 10;
  public filter: string = '';
  public entity: any;

  announcements: any[];

  constructor(
    private dataService: DataService,
    private notificationService: NotificationService,
    private utilityService: UtilityService) {
  }

  ngOnInit() {
    this.onLoad();
  }

  onLoad() {
    this.dataService.get('/api/announcement/getall?pageIndex='
      + this.pageIndex + '&pageSize='
      + this.pageSize)
      .subscribe((response: any) => {
        this.announcements = response.Items;
        this.pageIndex = response.PageIndex;
      }, (error: any) => this.dataService.handleError(error));
  }

  onShowAdd() {
    this.entity = {};
    this.addEditModal.show();
  }

  onShowEdit(id: number) {
    this.entity = this.announcements.find(x => x.ID == id);
    this.addEditModal.show();
  }

  onSaveChange() {
    this.dataService.post('/api/announcement/add', JSON.stringify(this.entity)).subscribe((response: any) => {
      this.onLoad();
      this.addEditModal.hide();
      this.notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
    }, (error: any) => this.dataService.handleError(error));
  }

  onPageChanged(event: any): void {
    this.pageIndex = event.page;
    this.onLoad();
  }

  onDeleteItem(id: any): void{
    this.notificationService.printConfirmationDialog(MessageContstants.CONFIRM_DELETE_MSG,() => this.onDeleteItemConfirm(id));
  }
  
  onDeleteItemConfirm(id: any): void{
    this.dataService.delete('/api/announcement/delete', 'id', id).subscribe((response: any) => {
      this.notificationService.printSuccessMessage(MessageContstants.DELETED_OK_MSG);
      this.onLoad();
    })
  }
}