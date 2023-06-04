import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-dropdown',
  templateUrl: './input-dropdown.component.html',
  styleUrls: ['./input-dropdown.component.css']
})
export class InputDropdownComponent {
  @Output() select = new EventEmitter<string>
  @Input() title?: string
  @Input() value?: string
  @Input() option: string[] = []

  dropdownOrder: boolean = false;

  onSelect(data: string): void {
    this.select.emit(data)
    this.toggle()
  }

  toggle(): void {
    this.dropdownOrder = !this.dropdownOrder
  }
}
