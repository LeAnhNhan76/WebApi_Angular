import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageContstants } from 'src/app/core/common';
import { DataService, NotificationService } from 'src/app/core/services';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  
  @ViewChild('modalAddEdit') public modalAddEdit: ModalDirective;
  public pageIndex: number = 1;
  public pageSize: number = 1;
  public filter: string = '';
  public users: any[];
  public totalRows: number = 0;
  public entity: any;
  constructor(private dataService: DataService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.onLoad();
  }

  onLoad(): void{
    this.dataService.get(`/api/appUser/getlistpaging?page=${this.pageIndex}&pageSize=${this.pageSize}&filter=${this.filter}`)
    .subscribe((response: any) => {
      if(response) {
        this.users = response.Items;
        this.pageIndex = response.PageIndex;
        this.totalRows = response.TotalRows;
      }
    },
    () => {
      this.notificationService.printErrorMessage(MessageContstants.LOAD_FAILED_MSG);
    });
  }

  onSearch(){
    this.onLoad();
  }

  onPageChanged(event: any): void{
    this.pageIndex = event.page;
    this.onLoad();
  }

  onShowAddModal(): void{
    this.entity = {};
    this.modalAddEdit.show();
  }

  onShowEditModal(id: any): void{
    this.onGetRoleDetail(id);
    this.modalAddEdit.show();
  }

  onSaveChange(): void{
    if(!this.entity.Id || this.entity.Id === undefined){
      this.dataService.post('/api/appRole/add', JSON.stringify(this.entity)).subscribe((response: any) => {
        if(response){
          this.notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
          setTimeout(() => {
            this.modalAddEdit.hide();
            this.onLoad();
          }, 2000);
        }
      }
      , (error: any) => this.dataService.handleError(error));
    }
    else{
      this.dataService.put('/api/appRole/update', JSON.stringify(this.entity)).subscribe((response: any) => {
        if(response){
          this.notificationService.printSuccessMessage(MessageContstants.UPDATED_OK_MSG);
          setTimeout(() => {
            this.modalAddEdit.hide();
            this.onLoad();
          }, 2000);
        }
      }
      ,(error: any) => this.dataService.handleError(error));
    }
  }

  onGetRoleDetail(id: any){
    this.dataService.get('/api/appRole/detail/' + id).subscribe((response: any) => {
      this.entity = response;
    });
  }

  onDeleteItem(id: any): void{
    console.log('id', id);
    this.notificationService.printConfirmationDialog(MessageContstants.CONFIRM_DELETE_MSG,() => this.onDeleteItemConfirm(id));
  }
  
  onDeleteItemConfirm(id: any): void{
    this.dataService.delete('/api/appRole/delete', 'id', id).subscribe((response: any) => {
      this.notificationService.printSuccessMessage(MessageContstants.DELETED_OK_MSG);
      this.onLoad();
    })
  }
}
