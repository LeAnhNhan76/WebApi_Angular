import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { AuthenService, DataService, NotificationService, UtilityService } from '../core/services';
import { HttpClientModule } from '@angular/common/http';
import { SidebarMenuComponent } from '../shared/sidebar-menu/sidebar-menu.component';
import { TopMenuComponent } from '../shared/top-menu/top-menu.component';

@NgModule({
  declarations: [
    MainComponent,
    SidebarMenuComponent,
    TopMenuComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    HttpClientModule
  ],
  providers: [AuthenService, DataService, NotificationService, UtilityService]
})
export class MainModule { }
