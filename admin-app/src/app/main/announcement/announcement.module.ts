import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnouncementComponent } from './announcement.component';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AnnouncementRoutingModule } from './announcement-routing.module';



@NgModule({
  declarations: [
    AnnouncementComponent
  ],
  imports: [
    CommonModule,
    AnnouncementRoutingModule,
    FormsModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot()
  ]
})
export class AnnouncementModule { }
