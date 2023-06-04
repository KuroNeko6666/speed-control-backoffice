import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { SharedModule } from '../shared.module';
import { INotification } from '../interfaces/utils.interface';
import { Router } from '@angular/router';



@Injectable({
  providedIn: SharedModule
})
export class NavigationService {

  constructor(
    private router: Router
  ) { }

  private subject: Subject<string> = new Subject<string>()
  public observer: Observable<string> = this.subject.asObservable()

  to(path: string): void {
    this.router.navigateByUrl(path).then((_) => this.subject.next(path))
  }


}


