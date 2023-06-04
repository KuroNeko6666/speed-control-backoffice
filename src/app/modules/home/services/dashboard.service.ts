import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DashboardAPIService } from 'src/app/core/services/dashboard.service';
import { IDashboard } from 'src/app/shared/interfaces/dashboard.interface';
import { IParamDashboardData, IParamDashboardDevice, IParamDashboardUser, StatusRequest } from 'src/app/shared/interfaces/utils.interface';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private service: DashboardAPIService) { }

  public paramsUser: IParamDashboardUser = {
    orderBy: 'week',
    role: '',
  }

  public paramsDevice: IParamDashboardDevice = {
    orderBy: 'week',
    userID: '',
  }

  public paramsData: IParamDashboardData = {
    orderBy: 'week',
    userID: '',
    deviceID: '',
  }

  private statusSubject: Subject<StatusRequest> = new Subject<StatusRequest>()
  public status: Observable<StatusRequest> = this.statusSubject.asObservable()

  private userSub: Subject<IDashboard> = new Subject<IDashboard>()
  public user: Observable<IDashboard> = this.userSub.asObservable()

  private deviceSub: Subject<IDashboard> = new Subject<IDashboard>()
  public device: Observable<IDashboard> = this.deviceSub.asObservable()

  private dataSub: Subject<IDashboard> = new Subject<IDashboard>()
  public data: Observable<IDashboard> = this.dataSub.asObservable()




  dataUser(): void {
    this.service.user(this.paramsUser).subscribe({
      next: (res) => {
        this.userSub.next(res.data!)
      },
      error: (_) => {
        this.userSub.next({data: [], label: []})
      },
    })
  }

  dataDevice(): void {
    this.service.device(this.paramsDevice).subscribe({
      next: (res) => {
        this.deviceSub.next(res.data!)
      },
      error: (_) => {
        this.deviceSub.next({data: [], label: []})
      },
    })
  }

  dataData(): void {
    this.service.data(this.paramsData).subscribe({
      next: (res) => {
        this.dataSub.next(res.data!)
      },
      error: (_) => {
        this.dataSub.next({data: [], label: []})
      },
    })
  }

  countUser(role?: string): void {
    this.service.countUser(role ?? "").subscribe({
      next: (res) => {
        this.subUser.next(res.data!)
      },
      error: (_) => {
        this.subUser.next(0)
      },
    })
  }

  private subUser: Subject<number> = new Subject<number>()
  public dataCountUser: Observable<number> = this.subUser.asObservable()

  countDevice(role?: string): void {
    this.service.countDevice(role ?? "").subscribe({
      next: (res) => {
        this.subDevice.next(res.data!)
      },
      error: (_) => {
        this.subDevice.next(0)
      },
    })
  }

  private subDevice: Subject<number> = new Subject<number>()
  public dataCountDevice: Observable<number> = this.subDevice.asObservable()

  countData(role?: string): void {
    this.service.countData(role ?? "").subscribe({
      next: (res) => {
        this.subData.next(res.data!)
      },
      error: (_) => {
        this.subData.next(0)
      },
    })
  }

  private subData: Subject<number> = new Subject<number>()
  public dataCountData: Observable<number> = this.subData.asObservable()

  countDataUser(role?: string): void {
    this.service.countDataDeviceUser(role ?? "").subscribe({
      next: (res) => {
        this.subDataUser.next(res.data!)
      },
      error: (_) => {
        this.subDataUser.next(0)
      },
    })
  }

  private subDataUser: Subject<number> = new Subject<number>()
  public dataCountDataUser: Observable<number> = this.subDataUser.asObservable()

}
