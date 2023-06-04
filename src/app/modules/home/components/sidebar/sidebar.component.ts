import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { NavigationService } from 'src/app/shared/services/navigation.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(
    private navigate: NavigationService,
    private auth: AuthService,
    private router: Router,
  ){}

  @Output() sidebar = new EventEmitter<void>()
  @Output() logout = new EventEmitter<void>()

  public currentPath: string = '';
  public user :IUser = {}

  ngOnInit(): void {
    this.currentPath = this.router.url == '/auth/login' ? '/home/dashboard' : this.router.url
    this.user = this.auth.find()
    this.navigate.observer.subscribe(res => this.currentPath = res)
  }

  toggle(): void {
    this.sidebar.emit()
  }

  onLogout(): void {
    this.logout.emit()
  }

  to(path: string): void {
    this.navigate.to(path)
  }


}
