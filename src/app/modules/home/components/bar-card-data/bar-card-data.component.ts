import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { IDevice } from 'src/app/shared/interfaces/device.interface';


@Component({
  selector: 'app-bar-card-data',
  templateUrl: './bar-card-data.component.html',
  styleUrls: ['./bar-card-data.component.css']
})
export class BarCardDataComponent {
  @Output() order = new EventEmitter<string>
  @Output() device = new EventEmitter<IDevice>
  @Input() title?: string;
  @Input() value?: string;
  @Input() valueDevice?: IDevice;
  @Input() dataBar?: ChartConfiguration<'bar'>['data'];
  @Input() devices?: IDevice[]

  public barChartOptions: ChartConfiguration<'bar'>['options'] = { responsive: false, animation: false };
  public barChartLegend = true;
  public barChartPlugins = [];

  dropdownOrder: boolean = false;
  dropdownDevice: boolean = false;

  onOrder(data: string): void {
    this.order.emit(data)
    this.toggleOrder()
  }

  toggleOrder(): void {
    this.dropdownOrder = !this.dropdownOrder
  }

  changeDevice(device: IDevice): void {
    this.device.emit(device)
    this.toggleDevice()
  }

  toggleDevice(): void {
    this.dropdownDevice = !this.dropdownDevice
  }
}
