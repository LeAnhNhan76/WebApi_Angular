import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainComponent } from "./main.component";

const routes : Routes = [
    {path: '', component: MainComponent, children:[
        {path: '', redirectTo: 'home', pathMatch: 'full'},
        {path: 'home', loadChildren: () => import('./home/home.module').then((m) => m.HomeModule)},
        {path: 'function', loadChildren: () => import('./function/function.module').then((m) => m.FunctionModule)},
        {path: 'product', loadChildren: () => import('./product/product.module').then((m) => m.ProductModule)},
        {path: 'product-category', loadChildren: () => import('./product-category/product-category.module').then((m) => m.ProductCategoryModule)},
        {path: 'user', loadChildren: () => import('./user/user.module').then((m) => m.UserModule)},
        {path: 'role', loadChildren: () => import('./role/role.module').then((m) => m.RoleModule)}
    ]}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule{}
