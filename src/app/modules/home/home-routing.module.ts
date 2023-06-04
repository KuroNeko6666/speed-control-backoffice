import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { AccountPageComponent } from './pages/account-page/account-page.component';
import { DevicePageComponent } from './pages/device-page/device-page.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [
      {
        path: "dashboard",
        component: DashboardPageComponent,
      },
      {
        path: "accounts",
        component: AccountPageComponent,
      },
      {
        path: "devices",
        component: DevicePageComponent,
      },
      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full",
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
