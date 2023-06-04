import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ILogin } from 'src/app/shared/interfaces/auth.interface';
import { StatusRequest } from 'src/app/shared/interfaces/utils.interface';
import { AuthModule } from '../auth.module';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private service: AuthService) { }


  private statusSubject: Subject<StatusRequest> = new Subject<StatusRequest>()
  public status: Observable<StatusRequest> = this.statusSubject.asObservable()

  login(data: ILogin): void {
    this.statusSubject.next(StatusRequest.loading)
    var formData = new FormData()
    formData.append('username', data.username)
    formData.append('password', data.password)
    this.service.login(formData).subscribe({
        next: (res) => {
            this.service.save(res.data!);
            this.statusSubject.next(StatusRequest.success)
        },
        error: (_) => {
            this.statusSubject.next(StatusRequest.failure)
        }
    })
  }

}


