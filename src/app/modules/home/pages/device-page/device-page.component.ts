import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IDeviceData } from 'src/app/shared/interfaces/device-data.interface';
import { IDevice, IDeviceForm } from 'src/app/shared/interfaces/device.interface';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { IPaginate, IParamDeviceData, IParamDevices, IParamUsers, StatusNotification, StatusRequest } from 'src/app/shared/interfaces/utils.interface';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { AccountService } from '../../services/account.service';
import { DeviceDataService } from '../../services/device-data.service';
import { DeviceService } from '../../services/device.service';
import { HomeService } from '../../services/home.service';
enum Mode { initial, update, create, detail }

@Component({
  selector: 'app-device-page',
  templateUrl: './device-page.component.html',
  styleUrls: ['./device-page.component.css']
})
export class DevicePageComponent implements OnInit, OnDestroy {
  constructor(
    private service: DeviceService,
    private accountService: AccountService,
    private dataDeviceService: DeviceDataService,
    private parent: HomeService,
    private notif: NotificationService,
    private fb: FormBuilder,
  ) { }

  public status?: StatusRequest
  public devices: IPaginate<IDevice[]> = { page: 0, total_page: 0, data: [] }
  public users: IPaginate<IUser[]> = { page: 0, total_page: 0, data: [] }
  public dataDevices: IPaginate<IDeviceData[]> = { page: 0, total_page: 0, data: [] }
  public currentDevice: IDevice = {}
  public user: IUser = {}
  public mode: Mode = Mode.initial
  public modeEnum = Mode
  public params: IParamDevices = this.service.params
  public paramsUser: IParamUsers = this.accountService.params
  public paramsData: IParamDeviceData = this.dataDeviceService.params

  private usersSubcription?: Subscription
  private devicesSubcription?: Subscription
  private deviceSubcription?: Subscription
  private dataSubcription?: Subscription
  private statusSubcription?: Subscription
  private searchSubcription?: Subscription
  private AccountSearchSubcription?: Subscription

  public form = this.fb.group({
    id: ['', [Validators.required]],
    user_id: ['', [Validators.required]],
    model: ['', [Validators.required]],
    address: ['', [Validators.required]],
  })

  public search = new FormControl('')
  public searchAccount = new FormControl('')
  public userList = false;
  private interval: any;


  ngOnInit(): void {
    this.user = this.parent.user()
    this.read()
    this.accountService.params.role = 'user'
    this.accountService.params.limit = 5
    this.usersSubcription = this.accountService.users.subscribe((res => this.users = res))
    this.devicesSubcription = this.service.devices.subscribe((res => this.devices = res))
    this.deviceSubcription = this.service.device.subscribe((res => this.show(res)))
    this.dataSubcription = this.dataDeviceService.data.subscribe((res => {
      this.dataDevices = res;
    }))
    this.statusSubcription = this.service.status.subscribe((res => {
      this.status = res
      switch (res) {
        case StatusRequest.success:
          return this.onSuccess()
        case StatusRequest.failure:
          return this.onFailure()
      }
    }))
    this.searchSubcription = this.search.valueChanges.subscribe(res => {
      this.params.search = res ?? ''
      this.read()
    })
    this.AccountSearchSubcription = this.searchAccount.valueChanges.subscribe(res => {
      this.userList = true
      this.accountService.params.search = res ?? ''
      this.readAccount()
    });
  }

  public selectUser(user: IUser) {
    this.form.get('user_id')?.setValue(user.id ?? '')
    this.searchAccount.setValue(user.username ?? '')
    this.userList = false
  }

  public read(): void {
    if (this.user.role == 'user') {
      this.params.userID = this.user.id
    }
    this.service.read()
  }

  public create() {
    if (this.form.invalid) this.form.markAllAsTouched()
    var data: IDeviceForm = {
      id: this.form.get('id')?.value ?? '',
      user: this.form.get('user_id')?.value?.length ? this.form.get('user_id')?.value! : undefined,
      address: this.form.get('address')?.value ?? '',
      model: this.form.get('model')?.value ?? '',
    }
    this.service.create(data);
  }

  public find(id: string): void {
    this.service.find(id)
  }

  public detail(device: IDevice): void {
    this.currentDevice = device
    this.paramsData.deviceID = device.id
    this.dataDeviceService.read()
    this.mode = Mode.detail
    this.interval = setInterval(() => {
      this.dataDeviceService.read()
    }, 5000)
  }

  public update() {
    if (this.form.invalid) this.form.markAllAsTouched()
    var data: IDeviceForm = {
      id: this.form.get('id')?.value ?? '',
      user: this.form.get('user_id')?.value?.length ? this.form.get('user_id')?.value! : undefined,
      address: this.form.get('address')?.value ?? '',
      model: this.form.get('model')?.value ?? '',
    }
    this.service.update(data, this.currentDevice.id!)
  }

  public delete(id: string): void {
    this.service.delete(id)
  }

  public readAccount(): void {
    this.accountService.read()
  }

  public readData(params?: IParamDeviceData): void {
    this.paramsData.limit = params?.limit ?? this.paramsData.limit
    this.paramsData.offset = params?.offset ?? this.paramsData.offset
    this.paramsData.search = params?.search ?? this.paramsData.search
    this.paramsData.deviceID = params?.deviceID ?? ''
    this.dataDeviceService.read()
    this.mode == Mode.detail ? setTimeout(() => this.readData(this.paramsData), 5000) : this.dataDevices = { page: 0, total_page: 0, data: [] }
  }

  private show(data: IDevice) {
    this.form.get('id')?.setValue(data.id!)
    this.form.get('user_id')?.setValue(data.user?.id ?? '')
    this.form.get('address')?.setValue(data.address!)
    this.form.get('model')?.setValue(data.model!)
    this.searchAccount.setValue(data.user?.username!)
    this.currentDevice = data
    this.userList = false
    this.mode = Mode.update
  }

  private resetForm(): void {
    this.form.reset()
    this.searchAccount.reset()
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

  changeMode(mode: Mode): void {
    clearInterval(this.interval)
    this.resetForm()
    this.users = { page: 0, total_page: 0, data: [] }
    this.dataDevices = { page: 0, total_page: 0, data: [] }
    this.currentDevice = {}
    this.mode = mode
  }

  ngOnDestroy(): void {
    this.deviceSubcription?.unsubscribe()
    this.devicesSubcription?.unsubscribe()
    this.statusSubcription?.unsubscribe()
    this.searchSubcription?.unsubscribe()
    this.AccountSearchSubcription?.unsubscribe()
    this.usersSubcription?.unsubscribe()
  }
}
