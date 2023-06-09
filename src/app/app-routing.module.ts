import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoAuthGuard } from './core/guards/no-auth.guard';
import { AuthGuard } from './core/guards/auth.guard';


const routes: Routes = [
  {
    path:"auth",
    loadChildren: () => import("./modules/auth/auth.module").then(m=>m.AuthModule),
    canActivate: [NoAuthGuard]
  },
  {
    path:"home",
    loadChildren: () => import("./modules/home/home.module").then(m=>m.HomeModule),
    canActivate: [AuthGuard]
  },
  {
    path: "",
    redirectTo: "auth",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
