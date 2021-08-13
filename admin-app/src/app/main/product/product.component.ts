import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { MessageContstants, SystemConstants } from 'src/app/core/common';
import { AuthenService, DataService, NotificationService, UtilityService } from 'src/app/core/services';
import { UploadService } from 'src/app/core/services/upload.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  /*Declare modal */
  @ViewChild('addEditModal')  addEditModal: ModalDirective;
  @ViewChild("thumbnailImage") thumbnailImage: any;
  /*Product manage */
  public baseFolder: string = SystemConstants.BASE_API;
  public entity: any;
  public totalRows: number;
  public pageIndex: number = 1;
  public pageSize: number = 20;
  public pageDisplay: number = 10;
  public filter: string = '';
  public filterCategoryID: any;
  public products: any[];
  public productCategories: any[];
  public isDisabledUpdateButton: boolean = false;

  constructor(public authenService: AuthenService
    , private dataService: DataService
    , private notificationService: NotificationService
    , private utilityService: UtilityService
    , private uploadService: UploadService) {
      if(!this.authenService.checkAccess('PRODUCT')){
        this.utilityService.navigateToLogin();
      } 
  }

  ngOnInit() {
    this.filterCategoryID = '';
    this.onLoad();
    this.onLoadProductCategories();
  }

  onCreateAlias() {
    this.entity.Alias = this.utilityService.MakeSeoTitle(this.entity.Name);
  }

  onLoad() {
    this.dataService.get('/api/product/getall?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&keyword=' + this.filter + '&categoryId=' + this.filterCategoryID)
      .subscribe((response: any) => {
        this.products = response.Items;
        this.pageIndex = response.PageIndex;
      }, (error: any) => this.dataService.handleError(error));
  }

  onReset() {
    this.filter = '';
    this.filterCategoryID = '';
    this.onLoad();
  }

  onShowAddModal() {
    this.entity = { Content: '' };
    this.addEditModal.show();
    this.isDisabledUpdateButton = false;
  }

  onShowEditModal(id: string) {
    this.onLoadProductDetail(id);
    this.addEditModal.show();
    this.isDisabledUpdateButton = false;
  }

  onLoadProductDetail(id: string): void{
    this.dataService.get('/api/product/detail/' + id).subscribe((response: any) => {
      this.entity = response;
    }, (error: any) => this.dataService.handleError(error));
  }

  onLoadProductCategories() {
    this.dataService.get('/api/productCategory/getallhierachy').subscribe((response: any[]) => {
      this.productCategories = response;
    }, (error: any) => this.dataService.handleError(error));
  }

  onSaveChange(): void {
    this.isDisabledUpdateButton = true;
    let fi = this.thumbnailImage.nativeElement;
    if (fi.files.length > 0) {
      this.uploadService.postWithFile('/api/upload/saveImage?type=product', null, fi.files).then((imageUrl: any) => {
        this.entity.ThumbnailImage = imageUrl;
      }).then(() => {
        this.onSaveData();
      });
    }
    else {
      this.onSaveData();
    }
  }

  onSaveData() {
    if (this.entity.ID == undefined) {
      this.dataService.post('/api/product/add', JSON.stringify(this.entity)).subscribe((response: any) => {
        this.onLoad();
        this.addEditModal.hide();
        this.notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
      }, (error: any) => {
        this.isDisabledUpdateButton = false;
        this.dataService.handleError(error);
      });
    }
    else {
      this.dataService.put('/api/product/update', JSON.stringify(this.entity)).subscribe((response: any) => {
        this.onLoad();
        this.addEditModal.hide();
        this.notificationService.printSuccessMessage(MessageContstants.UPDATED_OK_MSG);
      }, (error: any) => {
        this.isDisabledUpdateButton = false;
        this.dataService.handleError(error);
      });
    }
  }

  onDeleteItem(id: any): void{
    this.notificationService.printConfirmationDialog(MessageContstants.CONFIRM_DELETE_MSG,() => this.onDeleteItemConfirm(id));
  }
  
  onDeleteItemConfirm(id: any): void{
    this.dataService.delete('/api/product/delete', 'id', id).subscribe((response: any) => {
      this.notificationService.printSuccessMessage(MessageContstants.DELETED_OK_MSG);
      this.onLoad();
    })
  }

  onPageChanged(event: any): void {
    this.pageIndex = event.page;
    this.onLoad();
  }

  onKeyupHandlerContentFunction(e: any) {
    this.entity.Content = e;
  }
}
