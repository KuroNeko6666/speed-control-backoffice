import { Component, OnDestroy, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { IDashboard } from 'src/app/shared/interfaces/dashboard.interface';
import { ChartConfiguration } from 'chart.js';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { DeviceService } from '../../services/device.service';
import { IDevice } from 'src/app/shared/interfaces/device.interface';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  constructor(
    private service: DashboardService,
    private auth: AuthService,
    private deviceService: DeviceService,
  ) { }


  user: IUser = {}
  interval?: any;

  dataUser: IDashboard = { data: [], label: [] }
  public devices: IDevice[] = []
  public device: IDevice = {}
  public userBarData?: ChartConfiguration<'bar'>['data'] = { labels: [], datasets: [] }
  public deviceBarData?: ChartConfiguration<'bar'>['data'] = { labels: [], datasets: [] }
  public dataBarData?: ChartConfiguration<'bar'>['data'] = { labels: [], datasets: [] }
  public countUser: number = 0
  public countDevice: number = 0
  public countData: number = 0
  public countDataUser: number = 0


  public paramsUser = this.service.paramsUser
  public paramsDevice = this.service.paramsDevice
  public paramsData = this.service.paramsData

  ngOnInit(): void {
    this.user = this.auth.find()
    if (this.user.role == 'user') {
      this.deviceService.params.userID = this.user.id
      this.deviceService.params.limit = 10000
      this.deviceService.read()
      this.deviceService.devices.subscribe(res => this.devices = res.data!)
    }
    this.getData()
    this.service.user.subscribe(res => {
      this.userBarData = this.setBar(res, 'user')
    })

    this.service.device.subscribe(res => {
      this.deviceBarData = this.setBar(res, 'device')
    })

    this.service.data.subscribe(res => {
      this.dataBarData = this.setBar(res, 'data device')
    })

    this.service.dataCountUser.subscribe(res => this.countUser = res)
    this.service.dataCountDevice.subscribe(res => this.countDevice = res)
    this.service.dataCountData.subscribe(res => this.countData = res)
    this.service.dataCountDataUser.subscribe(res => this.countDataUser = res)
  }

  setBar(data: IDashboard, label: string): ChartConfiguration<'bar'>['data'] {
    return {
      labels: data.label?.reverse(),
      datasets: [
        { data: data.data.reverse(), label: label, backgroundColor: 'rgb(30, 144, 255)' },
      ]
    };
  }


  changeOrderUser(order: string) {
    this.paramsUser.orderBy = order
    this.service.dataUser()
  }

  changeOrderDevice(order: string) {
    this.paramsDevice.orderBy = order
    this.service.dataDevice()
  }

  changeOrderData(order: string) {
    this.paramsData.orderBy = order
    this.service.dataData()
  }

  changeDeviceData(device: IDevice) {
    this.paramsData.deviceID = device.id
    this.device = device
    this.service.dataData()
  }

  getData() {
    this.service.dataUser()
    this.service.dataDevice()
    this.service.dataData()
    this.service.countUser()
    this.service.countData()
    this.service.countDevice(this.user.role == 'user' ? this.user.id : undefined)
    this.service.countDataUser(this.user.role == 'user' ? this.user.id : undefined)
    this.interval = setInterval(() => {
      this.service.dataUser()
      this.service.dataDevice()
      this.service.dataData()
      this.service.countUser()
      this.service.countData()
      this.service.countDevice(this.user.role == 'user' ? this.user.id : undefined)
      this.service.countDataUser(this.user.role == 'user' ? this.user.id : undefined)
    }, 3000)
  }


  ngOnDestroy(): void {
    clearInterval(this.interval)
  }

}
