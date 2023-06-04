import { Injectable } from '@angular/core';
import { HomeModule } from '../home.module';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { ILogin } from 'src/app/shared/interfaces/auth.interface';
import { StatusRequest } from 'src/app/shared/interfaces/utils.interface';
import { IUser } from 'src/app/shared/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private service: AuthService) { }

  private statusSubject: Subject<StatusRequest> = new Subject<StatusRequest>()
  public status: Observable<StatusRequest> = this.statusSubject.asObservable()

  check(): void {
    console.log('checking');

    this.statusSubject.next(StatusRequest.loading)
    this.service.check().subscribe({
        next: (res) => {
            this.statusSubject.next(StatusRequest.success)
        },
        error: (_) => {
            this.service.delete()
            this.statusSubject.next(StatusRequest.failure)
        }
    })
  }

  logout(): void {
    this.service.delete()
    this.check()
  }

  user(): IUser {
    var user = this.service.find()
    return user
  }

}
