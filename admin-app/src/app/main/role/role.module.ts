import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role.component';
import { RoleRoutingModule } from './role-routing.module';
import { DataService, NotificationService, UtilityService } from 'src/app/core/services';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RoleComponent
  ],
  imports: [
    CommonModule,
    RoleRoutingModule,
    FormsModule
  ],
  providers: [DataService, NotificationService, UtilityService]
})
export class RoleModule { }
