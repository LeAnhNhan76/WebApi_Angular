import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { AuthenService, DataService, NotificationService, UtilityService } from 'src/app/core/services';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MultiselectDropdownModule } from 'angular2-dropdown-multiselect';
import { Daterangepicker } from 'ng2-daterangepicker';
import { UploadService } from 'src/app/core/services/upload.service';

@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    MultiselectDropdownModule,
    Daterangepicker,
    PaginationModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [DataService, NotificationService, UtilityService, UploadService, AuthenService],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class UserModule { }
