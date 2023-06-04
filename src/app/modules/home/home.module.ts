import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { DevicePageComponent } from './pages/device-page/device-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { AccountPageComponent } from './pages/account-page/account-page.component';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { NgChartsModule } from 'ng2-charts';
import { BarCardComponent } from './components/bar-card/bar-card.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { InputDropdownComponent } from './components/input-dropdown/input-dropdown.component';
import { BarCardDataComponent } from './components/bar-card-data/bar-card-data.component';


@NgModule({
  declarations: [
    DashboardPageComponent,
    DevicePageComponent,
    ProfilePageComponent,
    AccountPageComponent,
    HomeComponent,
    SidebarComponent,
    HeaderComponent,
    BarCardComponent,
    DropdownComponent,
    InputDropdownComponent,
    BarCardDataComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgChartsModule
  ]
})
export class HomeModule { }
