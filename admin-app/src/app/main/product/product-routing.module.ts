import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProductComponent } from "./product.component";

const routes : Routes = [
    {path: '', redirectTo: 'index', pathMatch: 'full'},
    {path: 'index', component: ProductComponent},
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductRoutingModule{}
