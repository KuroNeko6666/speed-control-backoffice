import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { ILogin } from 'src/app/shared/interfaces/auth.interface';
import { IUser, IUserRegister, IUserUpdate } from 'src/app/shared/interfaces/user.interface';
import { IPaginate, IParamUsers, StatusRequest } from 'src/app/shared/interfaces/utils.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private service: UserService) { }

  public params: IParamUsers = {
    limit: 10,
    offset: 0,
    search: '',
    role: 'all',
  }

  private statusSubject: Subject<StatusRequest> = new Subject<StatusRequest>()
  public status: Observable<StatusRequest> = this.statusSubject.asObservable()

  private usersSubject: Subject<IPaginate<IUser[]>> = new Subject<IPaginate<IUser[]>>()
  public users: Observable<IPaginate<IUser[]>> = this.usersSubject.asObservable()

  private userSubject: Subject<IUser> = new Subject<IUser>()
  public user: Observable<IUser> = this.userSubject.asObservable()

  create(data: IUserRegister): void {
    this.statusSubject.next(StatusRequest.loading)
    var formData = new FormData()
    formData.append('name', data.name)
    formData.append('username', data.username)
    formData.append('email', data.email)
    formData.append('password', data.password)
    formData.append('role', data.role)
    this.service.create(formData).subscribe({
      next: (res) => {
        this.read()
        this.statusSubject.next(StatusRequest.success)
      },
      error: (_) => {
        this.statusSubject.next(StatusRequest.failure)
      }
    })
  }

  update(data: IUserUpdate, id: string): void {
    this.statusSubject.next(StatusRequest.loading)
    var formData = new FormData()
    formData.append('name', data.name!)
    formData.append('role', data.role!)
    if (data.avatar != undefined) {
      formData.append('avatar', data.avatar)
    }
    this.service.update(formData, id).subscribe({
      next: (res) => {
        this.read()
        this.statusSubject.next(StatusRequest.success)
      },
      error: (_) => {
        this.statusSubject.next(StatusRequest.failure)
      }
    })
  }

  delete(id: string): void {
    this.statusSubject.next(StatusRequest.loading)
    this.service.delete(id).subscribe({
      next: (res) => {
        this.read()
        this.statusSubject.next(StatusRequest.success)
      },
      error: (_) => {
        this.statusSubject.next(StatusRequest.failure)
      }
    })
  }

  read(): void {
    this.service.read(this.params).subscribe({
      next: (res) => {
        this.usersSubject.next(res.data!)
      },
      error: (_) => {
        this.usersSubject.next({ page: 0, total_page: 0, data: [] })
        this.statusSubject.next(StatusRequest.failure)
      },
    })
  }

  find(id: string): void {
    this.statusSubject.next(StatusRequest.loading)
    this.service.find(id).subscribe({
      next:(res) => {
        this.userSubject.next(res.data!);
        this.statusSubject.next(StatusRequest.initial)
      },
      error: (_) => {
        this.statusSubject.next(StatusRequest.failure)
      }
    })
  }

}
