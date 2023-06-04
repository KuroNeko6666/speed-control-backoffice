import { Component } from '@angular/core';
import { ForgotService } from '../../services/forgot.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StatusRequest, StatusNotification } from 'src/app/shared/interfaces/utils.interface';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-forgot-page',
  templateUrl: './forgot-page.component.html',
  styleUrls: ['./forgot-page.component.css']
})
export class ForgotPageComponent {
  constructor(
    private service: ForgotService,
    private notif: NotificationService,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  public status?: StatusRequest
  private statusSubcription?: Subscription

  ngOnInit(): void {
    this.statusSubcription = this.service.status.subscribe((status) => {
      this.status = status;
      switch (status) {
        case StatusRequest.success:
          return this.onSuccess()
        case StatusRequest.failure:
          return this.onFailure()
      }
    })
  }

  public form = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  })

  public submit() {
    if (this.form.invalid) this.form.markAllAsTouched()
    var email: string = this.form.get('email')?.value ?? ''
    this.service.forgot({ email: email })
  }

  private onSuccess(): void {
    this.notif.add({
      title: "Email Terkirim",
      message: "Silahkan cek email anda.",
      status: StatusNotification.success
    })
    this.router.navigateByUrl('/login')
  }

  private onFailure(): void {
    this.notif.add({
      title: "Gagal Reset Password",
      message: "Silahkan cek kembali email anda.",
      status: StatusNotification.failure
    })
  }

  ngOnDestroy(): void {
    this.statusSubcription?.unsubscribe()
  }
}
