import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { IDeviceData } from 'src/app/shared/interfaces/device-data.interface';
import { IPaginate, IParamDeviceData, StatusRequest } from 'src/app/shared/interfaces/utils.interface';
import { HomeModule } from '../home.module';
import { DeviceDataAPIService } from 'src/app/core/services/device-data.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceDataService {

  constructor(private service: DeviceDataAPIService) { }

  public params: IParamDeviceData = {
    limit: 10,
    offset: 0,
    search: '',
    deviceID: '',
  }

  private statusSubject: Subject<StatusRequest> = new Subject<StatusRequest>()
  public status: Observable<StatusRequest> = this.statusSubject.asObservable()

  private dataSubject: Subject<IPaginate<IDeviceData[]>> = new Subject<IPaginate<IDeviceData[]>>()
  public data: Observable<IPaginate<IDeviceData[]>> = this.dataSubject.asObservable()

  read(): void {
    this.service.read(this.params).subscribe({
      next: (res) => {
        this.dataSubject.next(res.data!)
        this.statusSubject.next(StatusRequest.success)
      },
      error: (_) => {
        this.dataSubject.next({ page: 0, total_page: 0, data: [] })
        this.statusSubject.next(StatusRequest.failure)
      },
    })
  }

}
