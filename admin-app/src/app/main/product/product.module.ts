import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { ProductRoutingModule } from './product-routing.module';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DataService, NotificationService, UtilityService } from 'src/app/core/services';
import { TreeDraggedElement } from '@circlon/angular-tree-component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { UploadService } from 'src/app/core/services/upload.service';
import { SimpleTinyComponent } from 'src/app/shared/simple-tiny/simple-tiny.component';

@NgModule({
  declarations: [
    ProductComponent,
    SimpleTinyComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot()
  ],
  exports: [ SimpleTinyComponent ],
  providers: [ DataService, NotificationService, UtilityService, UploadService, TreeDraggedElement ],
})
export class ProductModule { }
