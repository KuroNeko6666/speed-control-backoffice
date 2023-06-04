import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StatusNotification, StatusRequest } from 'src/app/shared/interfaces/utils.interface';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { LoginService } from '../../services/login.service';
import { NavigationService } from 'src/app/shared/services/navigation.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  constructor(
    private service: LoginService,
    private notif: NotificationService,
    private navigate: NavigationService,
    private fb: FormBuilder,
  ) { }

  public status?: StatusRequest
  private statusSubcription?: Subscription

  ngOnInit(): void {
    this.statusSubcription = this.service.status.subscribe((status) => {
      this.status = status;
      switch (status) {
        case StatusRequest.success:
          return this.onAuthenticated()
        case StatusRequest.failure:
          return this.onUnAuthenticated()
      }
    })
  }

  public form = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  })

  public submit() {
  if (this.form.invalid) return this.form.markAllAsTouched()
    var username: string = this.form.get('username')?.value ?? ''
    var password: string = this.form.get('password')?.value ?? ''
    this.service.login({ username: username, password: password })
  }

  private onAuthenticated(): void {
    this.navigate.to('/home')
  }

  private onUnAuthenticated(): void {
    this.notif.add({
      title: "Gagal Login",
      message: "Silahkan cek kembali username / email dan password anda.",
      status: StatusNotification.failure
    })
  }

  ngOnDestroy(): void {
    this.statusSubcription?.unsubscribe()
  }

}
