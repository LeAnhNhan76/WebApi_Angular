import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RoleComponent } from "./role.component";

const routes : Routes = [
    {path: '', redirectTo: 'index', pathMatch: 'full'},
    {path: 'index', component: RoleComponent},
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RoleRoutingModule{}
