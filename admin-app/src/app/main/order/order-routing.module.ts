import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { OrderAddComponent } from "./order-add/order-add.component";
import { OrderDetailComponent } from "./order-detail/order-detail.component";
import { OrderComponent } from "./order.component";

const routes: Routes =[
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', component: OrderComponent },
    { path: 'detail/:id', component: OrderDetailComponent},
    { path: 'add', component: OrderAddComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class OrderRoutingModule{}