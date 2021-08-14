import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderAddComponent } from './order-add/order-add.component';
import { OrderComponent } from './order.component';
import { OrderRoutingModule } from './order-routing.module';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DataService, NotificationService, UtilityService } from 'src/app/core/services';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { UploadService } from 'src/app/core/services/upload.service';
import { Daterangepicker } from 'ng2-daterangepicker';
import { SimpleTinyComponent } from 'src/app/shared/simple-tiny/simple-tiny.component';
import { ProductModule } from '../product/product.module';

@NgModule({
  declarations: [
    OrderDetailComponent,
    OrderAddComponent,
    OrderComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    FormsModule,
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    Daterangepicker,
    ProductModule
  ],
  providers: [ DataService, NotificationService, UploadService, UtilityService ]
})
export class OrderModule { }
