import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StatusNotification, StatusRequest } from 'src/app/shared/interfaces/utils.interface';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { HomeService } from './services/home.service';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/shared/services/navigation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(
    private service: HomeService,
    private notif: NotificationService,
    private navigate: NavigationService
  ) { }

  public authenticate?: StatusRequest
  private authenticateSubcription?: Subscription
  private logoutSub?: Subscription
  public sidebar: boolean = true

  ngOnInit(): void {
    this.service.check()
    this.authenticateSubcription = this.service.status.subscribe((authenticate) => {
      this.authenticate = authenticate
      if (authenticate == StatusRequest.failure) this.onUnAuthenticated()
    })
  }

  onUnAuthenticated(){
    this.notif.add({
      title: "Sesi Telah Habis",
      message: "Silahkan masuk kembali",
      status: StatusNotification.failure
    })
    this.navigate.to('/auth/login')
  }

  ngOnDestroy(): void {
    this.authenticateSubcription?.unsubscribe()
    this.logoutSub?.unsubscribe()
  }

  sidebarToggle(): void {
    this.sidebar = !this.sidebar
  }

  logout(): void {
    this.service.logout()
  }

}
