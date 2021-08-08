import { Component, OnInit, ViewChild } from '@angular/core';
import { TreeComponent } from '@circlon/angular-tree-component';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { MessageContstants } from 'src/app/core/common';
import { DataService, NotificationService, UtilityService } from 'src/app/core/services';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnInit {

  @ViewChild('modalAddEdit') public modalAddEdit: ModalDirective;

  @ViewChild(TreeComponent)
  private treeProductCategory: TreeComponent;
  public filter: string = '';
  public entity: any;
  public functionId: string;
  public productCategoryHierachy: any[];
  public productCategories: any[];
  public isDisabledUpdateButton: boolean = false;

  constructor(private dataService: DataService,
    private notificationService: NotificationService,
    private utilityService: UtilityService) { }

  ngOnInit() {
    this.onLoad();
    this.onGetListForDropdown();
  }

  onCreateAlias() {
    this.entity.Alias = this.utilityService.MakeSeoTitle(this.entity.Name);
  }

  onLoad() {
    this.dataService.get('/api/productCategory/getall?filter=' + this.filter)
      .subscribe((response: any[]) => {
        this.productCategoryHierachy = this.utilityService.Unflatten(response);
        this.productCategories = response;
      }, (error: any) => this.dataService.handleError(error));
  }

  onGetListForDropdown() {
    this.dataService.get('/api/productCategory/getallhierachy')
      .subscribe((response: any[]) => {
        this.productCategories = response;
      }, (error: any) => this.dataService.handleError(error));
  }

  onShowAddModal() {
    this.entity = {};
    this.modalAddEdit.show();
    this.isDisabledUpdateButton = false;
  }
  //Show edit form
  onShowEditModal(id: string) {
    this.onLoadProductCategoryDetail(id);
    this.modalAddEdit.show();
    this.isDisabledUpdateButton = false;
  }

  onSaveChange() {
    this.isDisabledUpdateButton = true;
    if (this.entity.ID == undefined) {
      this.dataService.post('/api/productCategory/add', JSON.stringify(this.entity)).subscribe((response: any) => {
        this.onLoad();
        this.modalAddEdit.hide();
        this.notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
      }, (error: any) => {
        this.isDisabledUpdateButton = false;
        this.dataService.handleError(error);
      });
    }
    else {
      this.dataService.put('/api/productCategory/update', JSON.stringify(this.entity)).subscribe((response: any) => {
        this.onLoad();
        this.modalAddEdit.hide();
        this.notificationService.printSuccessMessage(MessageContstants.UPDATED_OK_MSG);
      }, (error: any) => {
        this.isDisabledUpdateButton = false;
        this.dataService.handleError(error);
      });
    }
  }

  onLoadProductCategoryDetail(id: any){
    this.dataService.get('/api/productCategory/detail/' + id).subscribe((response: any) => {
      this.entity = response;
    }, (error: any) => this.dataService.handleError(error));
  }

  onDeleteItem(id: any): void{
    this.notificationService.printConfirmationDialog(MessageContstants.CONFIRM_DELETE_MSG,() => this.onDeleteItemConfirm(id));
  }
  
  onDeleteItemConfirm(id: any): void{
    this.dataService.delete('/api/productCategory/delete', 'id', id).subscribe((response: any) => {
      this.notificationService.printSuccessMessage(MessageContstants.DELETED_OK_MSG);
      this.onLoad();
    })
  }

  onSelectedChange($event: any) {
    console.log($event);
  }

}
