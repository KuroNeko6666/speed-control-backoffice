import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { INotification, StatusNotification } from '../../interfaces/utils.interface';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  constructor(private service : NotificationService){}

  public list: INotification[] = []
  public status = {
    success : StatusNotification.success,
    failure : StatusNotification.failure,
    warning : StatusNotification.warning,
  }

  ngOnInit(): void {
    this.service.observer.subscribe(res => this.list = res)
  }
}
