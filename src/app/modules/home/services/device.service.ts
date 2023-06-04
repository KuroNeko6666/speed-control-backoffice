import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { IDevice, IDeviceForm } from 'src/app/shared/interfaces/device.interface';
import { IPaginate, IParamDevices, IParamUsers, StatusRequest } from 'src/app/shared/interfaces/utils.interface';
import { HomeModule } from '../home.module';
import { DeviceAPIService } from 'src/app/core/services/device.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private service: DeviceAPIService) { }

  public params: IParamDevices = {
    limit: 10,
    offset: 0,
    search: '',
    userID: '',
  }

  private statusSubject: Subject<StatusRequest> = new Subject<StatusRequest>()
  public status: Observable<StatusRequest> = this.statusSubject.asObservable()

  private devicesSubject: Subject<IPaginate<IDevice[]>> = new Subject<IPaginate<IDevice[]>>()
  public devices: Observable<IPaginate<IDevice[]>> = this.devicesSubject.asObservable()

  private deviceSubject: Subject<IDevice> = new Subject<IDevice>()
  public device: Observable<IDevice> = this.deviceSubject.asObservable()

  create(data: IDeviceForm): void {
    this.statusSubject.next(StatusRequest.loading)
    var formData = new FormData()
    formData.append('id', data.id!)
    formData.append('model', data.model!)
    formData.append('address', data.address!)
    formData.append('user_id', data.user!)
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

  update(data: IDeviceForm, id: string): void {
    this.statusSubject.next(StatusRequest.loading)
    var formData = new FormData()
    formData.append('id', data.id!)
    formData.append('model', data.model!)
    formData.append('address', data.address!)
    if (data.user != undefined) {
        formData.append('user_id', data.user!)
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
    console.log(this.params.userID);
    this.service.read(this.params).subscribe({
      next: (res) => {
        this.devicesSubject.next(res.data!)
      },
      error: (_) => {
        this.devicesSubject.next({ page: 0, total_page: 0, data: [] })
        this.statusSubject.next(StatusRequest.failure)
      },
    })
  }

  find(id: string): void {
    this.statusSubject.next(StatusRequest.loading)
    this.service.find(id).subscribe({
      next:(res) => {
        this.deviceSubject.next(res.data!)
        this.statusSubject.next(StatusRequest.initial)
      },
      error: (_) => {
        this.statusSubject.next(StatusRequest.failure)
      }
    })
  }

}
