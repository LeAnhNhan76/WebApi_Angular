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
  @ViewChild('imageManageModal') imageManageModal: ModalDirective;
  @ViewChild('imagePath') imagePath: any;
  @ViewChild('quantityManageModal') quantityManageModal: ModalDirective;
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
  public checkedItems: any[];
  public checkedIds: any[];

  /*Image manage */
  public imageEntity: any = {};
  public productImages: any = [];

  /*Quantity manage */
  public quantityEntity: any = {};
  public productQuantities: any = [];
  public sizeId: number | null = null;
  public colorId: number | null = null;
  public colors: any[];
  public sizes: any[];
  
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

  onDeleteMulti() {
    this.checkedItems = this.products.filter(x => x.Checked);
    this.checkedIds = [];
    for (var i = 0; i < this.checkedItems.length; ++i)
      this.checkedIds.push(this.checkedItems[i]["ID"]);

    this.notificationService.printConfirmationDialog(MessageContstants.CONFIRM_DELETE_MSG, () => this.onDeleteMultiItemConfirm(this.checkedIds));
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

  onDeleteMultiItemConfirm(checkedIds: any[]): void{
    this.dataService.delete('/api/product/deletemulti', 'checkedProducts', JSON.stringify(checkedIds)).subscribe((response: any) => {
      this.notificationService.printSuccessMessage(MessageContstants.DELETED_OK_MSG);
      this.onLoad();
    }, (error: any) => this.dataService.handleError(error));
  }

  onPageChanged(event: any): void {
    this.pageIndex = event.page;
    this.onLoad();
  }

  onKeyupHandlerContentFunction(e: any) {
    this.entity.Content = e;
  }

  /*Image management*/
  onShowImageManage(id: number) {
    this.imageEntity = {
      ProductId: id
    };
    this.onLoadProductImages(id);
    this.imageManageModal.show();
  }

  onLoadProductImages(id: number) {
    this.dataService.get('/api/productImage/getall?productId=' + id).subscribe((response: any[]) => {
      this.productImages = response;
    }, (error: any) => this.dataService.handleError(error));
  }
  
  onDeleteImage(id: number) {
    this.notificationService.printConfirmationDialog(MessageContstants.CONFIRM_DELETE_MSG, () => {
      this.dataService.delete('/api/productImage/delete', 'id', id.toString()).subscribe((response: any) => {
        this.notificationService.printSuccessMessage(MessageContstants.DELETED_OK_MSG);
        this.onLoadProductImages(this.imageEntity.ProductId);
      }, (error: any) => this.dataService.handleError(error));
    });
  }

  onSaveProductImage() {
    let fi = this.imagePath.nativeElement;
      if (fi.files.length > 0) {
        this.uploadService.postWithFile('/api/upload/saveImage?type=product', null, fi.files).then((imageUrl: any) => {
          this.imageEntity.Path = imageUrl;
          this.dataService.post('/api/productImage/add', JSON.stringify(this.imageEntity)).subscribe((response: any) => {
            this.onLoadProductImages(this.imageEntity.ProductId);
            this.notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
          });
        });
      }
  }

  /*Quản lý số lượng */
  onShowQuantityManage(id: number) {
    this.quantityEntity = {
      ProductId: id
    };
    this.onLoadColors();
    this.onLoadSizes();
    this.onLoadProductQuantities(id);
    this.quantityEntity.ColorId = '';
    this.quantityEntity.SizeId = '';
    this.quantityManageModal.show();
  }
  
  onLoadColors() {
    this.dataService.get('/api/productQuantity/getcolors').subscribe((response: any[]) => {
      this.colors = response;
    }, (error: any) => this.dataService.handleError(error));
  }
  
  onLoadSizes() {
    this.dataService.get('/api/productQuantity/getsizes').subscribe((response: any[]) => {
      this.sizes = response;
    }, (error: any) => this.dataService.handleError(error));
  }

  onLoadProductQuantities(id: number) {
    this.dataService.get('/api/productQuantity/getall?productId=' + id + '&sizeId=' + this.sizeId + '&colorId=' + this.colorId).subscribe((response: any[]) => {
      this.productQuantities = response;
    }, (error: any) => this.dataService.handleError(error));
  }

  onSaveProductQuantity() {
    this.dataService.post('/api/productQuantity/add', JSON.stringify(this.quantityEntity)).subscribe((response: any) => {
      this.onLoadProductQuantities(this.quantityEntity.ProductId);
      this.quantityEntity = {
        ProductId: this.quantityEntity.ProductId,
        ColorId: '',
        SizeId: ''
      };
      this.notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
    }, (error: any) => this.dataService.handleError(error));
  }

  onDeleteQuantity(productId: number, colorId: string, sizeId: string) {
    var parameters = { "productId": productId, "sizeId": sizeId, "colorId": colorId };
    this.notificationService.printConfirmationDialog(MessageContstants.CONFIRM_DELETE_MSG, () => {
      this.dataService.deleteWithMultiParams('/api/productQuantity/delete', parameters).subscribe((response: any) => {
        this.notificationService.printSuccessMessage(MessageContstants.DELETED_OK_MSG);
        this.onLoadProductQuantities(productId);
      }, (error: any) => this.dataService.handleError(error));
    });
  }
}
