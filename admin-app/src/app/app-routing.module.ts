import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenGuard } from './core/guards/authen.guard';

const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', loadChildren: () => import('./login/login.module').then((m) => m.LoginModule)},
    {path: 'main', loadChildren: () => import('./main/main.module').then((m) => m.MainModule), canActivate: [AuthenGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
