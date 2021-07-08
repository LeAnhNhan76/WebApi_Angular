import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { DataService, NotificationService, UtilityService } from 'src/app/core/services';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [DataService, NotificationService, UtilityService],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class UserModule { }
