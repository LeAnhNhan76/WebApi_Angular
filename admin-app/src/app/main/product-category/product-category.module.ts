import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCategoryComponent } from './product-category.component';
import { ProductCategoryRoutingModule } from './product-category-routing.module';
import { TreeDraggedElement, TreeModule } from '@circlon/angular-tree-component';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DataService, NotificationService, UtilityService } from 'src/app/core/services';

@NgModule({
  declarations: [
    ProductCategoryComponent
  ],
  imports: [
    CommonModule,
    ProductCategoryRoutingModule,
    TreeModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  providers: [ DataService, NotificationService, UtilityService, TreeDraggedElement ],
})
export class ProductCategoryModule { }
