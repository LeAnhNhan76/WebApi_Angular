import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { MessageContstants } from 'src/app/core/common';
import { DataService, NotificationService, UtilityService } from 'src/app/core/services';

@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.scss']
})
export class OrderAddComponent implements OnInit {

  @ViewChild('addEditModal') addEditModal: ModalDirective;

  public entity: any = { Status: true };
  public sizeId: number | null = null;
  public colorId: number | null = null;
  public colors: any[];
  public sizes: any[];
  public products: any[];
  public orderDetails: any[] = [];
  public detailEntity: any = {
    ProductID: 0,
    Quantity: 0,
    Price: 0
  };

  constructor(private utilityService: UtilityService,
    private dataService: DataService,
    private notificationService: NotificationService) { }

  ngOnInit() {
  }

  /*Product quantity management */
  onShowAddDetail() {
    this.onLoadColors();
    this.onLoadSizes();
    this.onLoadProducts();
    this.addEditModal.show();

  }

  onLoadProducts() {
    this.dataService.get('/api/product/getallparents').subscribe((response: any[]) => {
      this.products = response;
    }, (error: any) => this.dataService.handleError(error));
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

  onGoBack() {
    this.utilityService.navigate('/main/order/index');
  }

  //Save change for modal popup
  onSaveChange() {
    this.entity.OrderDetails = this.orderDetails;
    this.dataService.post('/api/order/add', JSON.stringify(this.entity)).subscribe((response: any) => {
      this.entity = response;
      this.notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
    }, (error: any) => this.dataService.handleError(error));
  }

  onSaveOrderDetail() {
    this.addEditModal.hide();
    this.detailEntity.Product = this.products.find(x => x.ID == this.detailEntity.ProductID);
    this.orderDetails.push(this.detailEntity);
    this.detailEntity = {
      ProductID: 0,
      Quantity: 0,
      Price: 0
    };
  }

  //Action delete
  onDeleteDetail(item: any) {
    for (var index = 0; index < this.orderDetails.length; index++) {
      let orderDetail = this.orderDetails[index];
      if (orderDetail.ProductID == item.ProductID
        && orderDetail.ColorId == item.ColorId
        && orderDetail.SizeId == item.SizeId) {
        this.orderDetails.splice(index, 1);
      }
    }
  }
}