import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() sidebar = new EventEmitter<void>()

  onSidebar(): void {
    this.sidebar.emit()
  }
}
