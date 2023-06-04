import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IUser, IUserRegister, IUserUpdate } from 'src/app/shared/interfaces/user.interface';
import { IPaginate, IParamUsers, StatusNotification, StatusRequest } from 'src/app/shared/interfaces/utils.interface';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { AccountService } from '../../services/account.service';
import { HomeService } from '../../services/home.service';

enum Mode { initial, update, create }

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent implements OnInit, OnDestroy {

  constructor(
    private service: AccountService,
    private parent: HomeService,
    private notif: NotificationService,
    private fb: FormBuilder,
  ) { }

  public status?: StatusRequest
  public users: IPaginate<IUser[]> = { page: 0, total_page: 0, data: [] }
  public currentUser: IUser = {}
  public user: IUser = {}
  public mode: Mode = Mode.initial
  public modeEnum = Mode
  public params: IParamUsers = this.service.params

  private usersSubcription?: Subscription
  private userSubcription?: Subscription
  private statusSubcription?: Subscription

  public formCreate = this.fb.group({
    name: ['', [Validators.required]],
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    role: ['', [Validators.required]],
  })

  public formUpdate = this.fb.group({
    name: ['', [Validators.required]],
    role: ['', [Validators.required]],
  })

  public search: FormControl = new FormControl('');

  public image?: any;

  ngOnInit(): void {
    this.read()
    this.user = this.parent.user()
    this.usersSubcription = this.service.users.subscribe((res => this.users = res))
    this.userSubcription = this.service.user.subscribe((res => this.show(res)))
    this.statusSubcription = this.service.status.subscribe((res => {
      this.status = res
      switch (res) {
        case StatusRequest.success:
          return this.onSuccess()
        case StatusRequest.failure:
          return this.onFailure()
      }
    }))
    this.search.valueChanges.subscribe(res => {
      this.params.search = res
      this.read()
    })
  }

  public read(): void {
    this.service.read()
  }

  public create() {
    if (this.formCreate.invalid) this.formCreate.markAllAsTouched()
    var data: IUserRegister = {
      name: this.formCreate.get('name')?.value!,
      email: this.formCreate.get('email')?.value!,
      username: this.formCreate.get('username')?.value!,
      password: this.formCreate.get('password')?.value!,
      role: this.formCreate.get('role')?.value!,
    }
    this.service.create(data);
  }

  public find(id: string): void {
    this.service.find(id)
  }

  public update() {
    if (this.formUpdate.invalid) this.formUpdate.markAllAsTouched()
    var data: IUserUpdate = {
      name: this.formUpdate.get('name')?.value ?? '',
      role: this.formUpdate.get('role')?.value ?? '',
      avatar: this.image
    }
    this.service.update(data, this.currentUser.id!)
  }

  public delete(id: string): void {
    this.service.delete(id)
  }

  private show(data: IUser) {
    console.log(data);
    this.formUpdate.get('name')?.setValue(data.name!)
    this.formUpdate.get('role')?.setValue(data.role!)
    this.currentUser = data
    this.mode = Mode.update
  }

  public onFileChange(event: any): void {
    const file: File = event.target.files[0]
    const reader = new FileReader()
    reader.onloadend = () => {
      this.currentUser.avatar!.url = reader.result as string
    }
    reader.readAsDataURL(file)
    this.image = file
  }

  private resetForm(): void {
    this.formCreate.reset()
    this.formUpdate.reset()
  }

  private onSuccess(): void {
    this.resetForm()
    if (this.mode != Mode.initial) this.mode = Mode.initial
    this.notif.add({
      title: "Berhasil",
      message: "Aksi berhasil dijalankan.",
      status: StatusNotification.success
    })
  }

  private onFailure(): void {
    this.notif.add({
      title: "Gagal",
      message: "Aksi gagal dijalankan.",
      status: StatusNotification.failure
    })
  }

  changeRole(role: string): void {
    this.params.role = role
    this.read()
  }

  changeRoleInput(role: string): void {
    switch (this.mode) {
      case Mode.create:
        this.formCreate.get('role')?.setValue(role)
        return
        case Mode.update:
          this.formUpdate.get('role')?.setValue(role)
          return
    }
  }

  changeMode(mode: Mode): void {
    this.resetForm()
    if (mode == Mode.create) {
      this.formCreate.get('role')?.setValue('user')
    }
    this.mode = mode
  }

  changeOffset(bool: boolean){
    if (bool) {
      this.params.offset! += this.params.limit!
      return;
    }
    this.params.offset! -= this.params.limit!
  }


  ngOnDestroy(): void {
    this.userSubcription?.unsubscribe()
    this.usersSubcription?.unsubscribe()
    this.statusSubcription?.unsubscribe()
  }

}
