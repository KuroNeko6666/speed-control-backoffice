import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBase } from 'src/app/shared/interfaces/base.interface';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { IPaginate, IParamDevices, IParamUsers } from 'src/app/shared/interfaces/utils.interface';
import { environment } from 'src/environments/environment.development';
import { CoreModule } from '../core.module';

@Injectable({
  providedIn: CoreModule
})
export class DeviceAPIService {

  constructor(private http: HttpClient) { }

  env = environment.device

  create(data: FormData): Observable<IBase<string>> {
    return this.http.post<IBase<string>>(this.env.create, data, {headers: this.headers});
  }

  update(data: FormData, id: string): Observable<IBase<string>> {
    var params: HttpParams = this.paramsID(id)
    return this.http.put<IBase<string>>(this.env.update, data, {params: params, headers: this.headers});
  }

  delete(id: string): Observable<IBase<string>> {
    var params: HttpParams = this.paramsID(id)
    return this.http.delete<IBase<string>>(this.env.delete, {params: params, headers: this.headers});
  }

  read(data: IParamDevices): Observable<IBase<IPaginate<IUser[]>>> {
    var params: HttpParams = this.params(data)
    return this.http.get<IBase<IPaginate<IUser[]>>>(this.env.read, {params: params, headers: this.headers});
  }

  find(id: string): Observable<IBase<IUser>> {
    var params: HttpParams = this.paramsID(id)
    return this.http.get<IBase<IUser>>(this.env.find, {params: params, headers: this.headers});
  }

  private paramsID(id: string): HttpParams {
    var params: HttpParams = new HttpParams()
    .set('id', id)
    return params
  }

  private params(data: IParamDevices) {


    var params: HttpParams = new HttpParams()
    .set('search', data.search!)
    .append('limit', data.limit!)
    .append('offset', data.offset!)
    .append('user_id', data.userID!)
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
