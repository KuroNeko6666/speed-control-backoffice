import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-bar-card',
  templateUrl: './bar-card.component.html',
  styleUrls: ['./bar-card.component.css']
})
export class BarCardComponent {

  @Output() order = new EventEmitter<string>
  @Input() title?: string;
  @Input() value?: string;
  @Input() dataBar?: ChartConfiguration<'bar'>['data'];

  public barChartOptions: ChartConfiguration<'bar'>['options'] = { responsive: false, animation: false };
  public barChartLegend = true;
  public barChartPlugins = [];

  dropdownOrder: boolean = false;

  onOrder(data: string): void {
    this.order.emit(data)
    this.toggleOrder()
  }

  toggleOrder(): void {
    this.dropdownOrder = !this.dropdownOrder
  }

}
