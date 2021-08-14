import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataService, NotificationService, UtilityService } from 'src/app/core/services';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  public orderDetails: any[];
  public entity: any;
  public totalAmount: number;
  constructor(private utilityService: UtilityService,
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      let orderId = params['id'];
      this.onLoadOrder(params['id']);
      this.onLoadOrderDetail(params['id']);
    });

  }

  onLoadOrder(id: number) {
    this.dataService.get('/api/order/detail/' + id.toString()).subscribe((response: any) => {
      this.entity = response;
    }, (error: any) => this.dataService.handleError(error));
  }

  onLoadOrderDetail(id: number) {
    this.dataService.get('/api/order/getalldetails/' + id.toString()).subscribe((response: any[]) => {
      this.orderDetails = response;
      this.totalAmount = 0;
      for(var item of this.orderDetails){
        this.totalAmount = this.totalAmount + (item.Quantity * item.Price);
      }
      console.log(this.totalAmount);
    }, (error: any) => this.dataService.handleError(error));
  }
}