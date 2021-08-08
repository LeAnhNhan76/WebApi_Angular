import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FunctionComponent } from './function.component';
import { FunctionRoutingModule } from './function-routing.module';
import { TreeDraggedElement, TreeModule } from '@circlon/angular-tree-component'
import { DataService, NotificationService, UtilityService } from 'src/app/core/services';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    FunctionComponent
  ],
  imports: [
    CommonModule,
    FunctionRoutingModule,
    TreeModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  providers: [ DataService, NotificationService, UtilityService, TreeDraggedElement ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class FunctionModule { }
