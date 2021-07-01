import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FunctionComponent } from "./function.component";

const routes : Routes = [
    {path: '', redirectTo: 'index', pathMatch: 'full'},
    {path: 'index', component: FunctionComponent},
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FunctionRoutingModule{}
