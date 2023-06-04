import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { IForgot } from 'src/app/shared/interfaces/auth.interface';
import { StatusRequest } from 'src/app/shared/interfaces/utils.interface';
import { AuthModule } from '../auth.module';



@Injectable({
  providedIn: 'root'
})
export class ForgotService {

  constructor(private service: AuthService) { }


  private statusSubject: Subject<StatusRequest> = new Subject<StatusRequest>()
  public status: Observable<StatusRequest> = this.statusSubject.asObservable()

  forgot(data: IForgot): void {
    this.statusSubject.next(StatusRequest.loading)
    var formData = new FormData()
    formData.append('email', data.email)
    this.service.forgot(formData).subscribe({
      next: (res) => {
        this.statusSubject.next(StatusRequest.success)
      },
      error: (_) => {
        this.statusSubject.next(StatusRequest.failure)
      }
    })
  }

}


