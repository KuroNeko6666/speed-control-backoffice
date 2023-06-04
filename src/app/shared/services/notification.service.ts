import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { SharedModule } from '../shared.module';
import { INotification } from '../interfaces/utils.interface';

@Injectable({
  providedIn: SharedModule
})
export class NotificationService {

  constructor() { }

  private duration: number = 2000
  private subject: BehaviorSubject<INotification[]> = new BehaviorSubject<INotification[]>([])
  public observer: Observable<INotification[]> = this.subject.asObservable()

  add(notification: INotification): void {
    var current = this.subject.getValue()
    var newItem: INotification = {
      id: uuidv4(),
      title: notification.title,
      message: notification.message,
      status: notification.status
    }
    var latest = [newItem, ...current]
    this.subject.next(latest)
    setInterval(() => this.delete(newItem.id ?? ''), this.duration)
  }

  delete(id: string){
    var current = this.subject.getValue()
    var latest = current.filter((value, _) => value.id != id)
    this.subject.next(latest);
  }
}


