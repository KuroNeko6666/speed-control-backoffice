import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBase } from 'src/app/shared/interfaces/base.interface';
import { IDashboard } from 'src/app/shared/interfaces/dashboard.interface';
import { environment } from 'src/environments/environment.development';
import { CoreModule } from '../core.module';
import { IParamDashboardData, IParamDashboardDevice, IParamDashboardUser } from 'src/app/shared/interfaces/utils.interface';

@Injectable({
  providedIn: CoreModule
})
export class DashboardAPIService {

  constructor(private http: HttpClient) { }

  env = environment.dashboard

  user(data: IParamDashboardUser): Observable<IBase<IDashboard>> {
    var params = this.paramsUser(data)
    return this.http.get<IBase<IDashboard>>(this.env.user, { params: params, headers: this.headers });
  }

  device(data: IParamDashboardDevice): Observable<IBase<IDashboard>> {
    var params = this.paramsDevice(data)
    return this.http.get<IBase<IDashboard>>(this.env.device, { params: params, headers: this.headers });
  }

  data(data: IParamDashboardData): Observable<IBase<IDashboard>> {
    var params = this.paramsData(data)
    return this.http.get<IBase<IDashboard>>(this.env.data, { params: params, headers: this.headers });
  }

  countUser(role: string): Observable<IBase<number>> {
    var params = {'role': role}
    return this.http.get<IBase<number>>(this.env.countUser, { params: params, headers: this.headers });
  }

  countDevice(userID: string): Observable<IBase<number>> {
    var params = {'user_id': userID}
    return this.http.get<IBase<number>>(this.env.countDevice, { params: params, headers: this.headers });
  }

  countData(deviceID: string): Observable<IBase<number>> {
    var params = {'device_id': deviceID}
    return this.http.get<IBase<number>>(this.env.countData, { params: params, headers: this.headers });
  }

  countDataDeviceUser(userID: string): Observable<IBase<number>> {
    var params = {'user_id': userID}
    return this.http.get<IBase<number>>(this.env.countDataUser, { params: params, headers: this.headers });
  }



  get token(): string {
    return localStorage.getItem("token") ?? ''
  }

  get headers(): {} {
    return {
      "Authorization" : "Bearer " + this.token
    }
  }

  private paramsData(data: IParamDashboardData) {
    var params: HttpParams = new HttpParams()
    .set('order_by', data.orderBy!)
    .append('device_id', data.deviceID!)
    .append('user_id', data.userID!)
    return params
  }

  private paramsDevice(data: IParamDashboardDevice) {
    var params: HttpParams = new HttpParams()
    .set('order_by', data.orderBy!)
    .append('user_id', data.userID!)
    return params
  }

  private paramsUser(data: IParamDashboardUser) {
    var params: HttpParams = new HttpParams()
    .set('order_by', data.orderBy!)
    .append('role', data.role!)
    return params
  }

}


