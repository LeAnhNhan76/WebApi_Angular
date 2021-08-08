import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService, NotificationService, UtilityService } from 'src/app/core/services';
import { TreeComponent } from '@circlon/angular-tree-component';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { MessageContstants } from 'src/app/core/common';
@Component({
  selector: 'app-function',
  templateUrl: './function.component.html',
  styleUrls: ['./function.component.scss']
})
export class FunctionComponent implements OnInit {

  @ViewChild('treeFunction') public treeFunction: TreeComponent;
  @ViewChild('modalAddEdit') public modalAddEdit: ModalDirective;
  @ViewChild('permissionModal') public permissionModal: ModalDirective;
  public functionsHierachy: any[] = [];
  public functions: any[] = [];
  public filter: any = '';
  public entity: any = {};
  public isDisabledUpdateButton: boolean = false;
  public isEditAction: boolean = false;
  public permissions: any = {};
  public functionId: number;

  constructor(private dataService: DataService
      , private notificationService: NotificationService
      , private utilityService: UtilityService) { }

  ngOnInit(): void {
    this.onLoad();
  }

  onLoad(): void{
    this.dataService.get(`/api/function/getall?filter=${this.filter}`).subscribe((response: any[]) => {
      this.functions = response.filter(x => x.ParentId==null);
      this.functionsHierachy = this.utilityService.Unflatten(response);
    }
    , (error: any) => this.dataService.handleError(error));
  }

  onShowAddModal(): void{
    this.entity = {};
    this.modalAddEdit.show();
    this.isDisabledUpdateButton = false;
  }

  onShowEditModal(id: any): void{
    this.onLoadFunctionDetail(id);
    this.modalAddEdit.show();
    this.isDisabledUpdateButton = false;
    this.isEditAction = true;
  }

  onShowPermission(id: any) {
    this.dataService.get('/api/appRole/getAllPermission?functionId=' + id).subscribe((response: any[]) => {
      this.functionId = id;
      this.permissions = response;
      this.permissionModal.show();
    }, (error: any) => this.dataService.handleError(error));
  }


  onSaveChange(): void{
    this.isDisabledUpdateButton = true;
    if(!this.entity.ID || this.entity.ID === undefined){
      this.dataService.post('/api/function/add', JSON.stringify(this.entity)).subscribe((response: any) => {
        if(response){
          this.notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
          setTimeout(() => {
            this.modalAddEdit.hide();
            this.onLoad();
          }, 2000);
        }
      }
      , (error: any) => {
         this.isDisabledUpdateButton = false;
         this.dataService.handleError(error);
      })
    }
    else{
      this.dataService.put('/api/function/update', JSON.stringify(this.entity)).subscribe((response: any) => {
        if(response){
          this.notificationService.printSuccessMessage(MessageContstants.UPDATED_OK_MSG);
          setTimeout(() => {
            this.modalAddEdit.hide();
            this.onLoad();
            this.isEditAction = false;
          }, 2000);
        }
      }
      , (error: any) => {
         this.isDisabledUpdateButton = false;
         this.dataService.handleError(error);
      });
    }
  }

  onSavePermission(): void{
    var data = {
      Permissions: this.permissions,
      FunctionId: this.functionId
    }
    this.dataService.post('/api/appRole/savePermission', JSON.stringify(data)).subscribe((response: any) => {
      this.notificationService.printSuccessMessage(response);
      this.permissionModal.hide();
    }, (error: any) => this.dataService.handleError(error));
  }

  onLoadFunctionDetail(id: any){
    this.dataService.get('/api/function/detail/' + id).subscribe((response: any) => {
      this.entity = response;
      console.log('entity', this.entity);
    });
  }

  onDeleteItem(id: any): void{
    this.notificationService.printConfirmationDialog(MessageContstants.CONFIRM_DELETE_MSG,() => this.onDeleteItemConfirm(id));
  }
  
  onDeleteItemConfirm(id: any): void{
    this.dataService.delete('/api/function/delete', 'id', id).subscribe((response: any) => {
      this.notificationService.printSuccessMessage(MessageContstants.DELETED_OK_MSG);
      this.onLoad();
    })
  }

}
