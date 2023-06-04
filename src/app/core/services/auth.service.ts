import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBase } from 'src/app/shared/interfaces/base.interface';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { environment } from 'src/environments/environment.development';
import { CoreModule } from '../core.module';
import { ILogin, IResLogin } from 'src/app/shared/interfaces/auth.interface';

@Injectable({
  providedIn: CoreModule
})
export class AuthService {

  constructor(private http: HttpClient) { }

  env = environment.auth

  login(data: FormData): Observable<IBase<IResLogin>> {
    return this.http.post<IBase<IResLogin>>(this.env.login, data);
  }

  register(data: FormData): Observable<IBase<string>> {
    return this.http.post<IBase<string>>(this.env.login, data);
  }

  forgot(data: FormData): Observable<IBase<string>> {
    return this.http.put<IBase<string>>(this.env.forgot, data);
  }

  logout(): Observable<IBase<string>> {
    return this.http.delete<IBase<string>>(this.env.login);
  }

  check(): Observable<IBase<string>> {
    return this.http.get<IBase<string>>(this.env.check, { headers: this.headers });
  }

  save(data: IResLogin): void {
    localStorage.setItem("user", JSON.stringify(data.user))
    localStorage.setItem("token", data.token)
  }

  delete(): void {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
  }

  find(): IUser {
    var user: IUser = JSON.parse(localStorage.getItem("user")!)
    return user
  }

  get token(): string {
    return localStorage.getItem("token") ?? ''
  }

  get headers(): HttpHeaders {
    var headers = new HttpHeaders().set("Authorization", "Bearer " + this.token)
    return headers
  }

}


