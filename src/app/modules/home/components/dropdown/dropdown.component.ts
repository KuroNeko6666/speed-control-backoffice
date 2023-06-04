import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent {
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
