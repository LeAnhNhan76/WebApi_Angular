import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AnnouncementComponent } from "./announcement.component";

const routes: Routes = [
    {path: '', redirectTo: 'index', pathMatch: 'full'},
    {path: 'index', component: AnnouncementComponent}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AnnouncementRoutingModule {}