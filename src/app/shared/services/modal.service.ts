import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { SharedModule } from '../shared.module';
import { IModal, INotification } from '../interfaces/utils.interface';

@Injectable({
  providedIn: SharedModule
})
export class NotificationService {

  constructor() { }

  private subject: BehaviorSubject<IModal> = new BehaviorSubject<IModal>({})
  public observer: Observable<IModal> = this.subject.asObservable()

  add(notification: IModal): void {
    var current = this.subject.getValue()

  }

}


