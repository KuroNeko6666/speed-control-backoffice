import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBase } from 'src/app/shared/interfaces/base.interface';
import { IDeviceData } from 'src/app/shared/interfaces/device-data.interface';
import { IPaginate, IParamDeviceData } from 'src/app/shared/interfaces/utils.interface';
import { environment } from 'src/environments/environment.development';
import { CoreModule } from '../core.module';

@Injectable({
  providedIn: CoreModule
})
export class DeviceDataAPIService {

  constructor(private http: HttpClient) { }

  env = environment.deviceData

  read(data: IParamDeviceData): Observable<IBase<IPaginate<IDeviceData[]>>> {
    var params: HttpParams = this.params(data)
    return this.http.get<IBase<IPaginate<IDeviceData[]>>>(this.env.read, {params: params, headers: this.headers});
  }

  private params(data: IParamDeviceData) {
    var params: HttpParams = new HttpParams()
    .set('search', data.search!)
    .append('limit', data.limit!)
    .append('offset', data.offset!)
    .append('device_id', data.deviceID!)
    return params
  }

  get token(): string {
    return localStorage.getItem("token") ?? ''
  }

  get headers(): {} {
    return {
      "Authorization" : "Bearer " + this.token
    }
  }

}
