import { Component, OnInit } from '@angular/core';
import { User } from '../types/User.model';
import { UserService } from './user.service';

@Component({
  selector: 'app-user-site',
  templateUrl: './user-site.component.html',
  styleUrls: ['./user-site.component.css'],
})
export class UserSiteComponent implements OnInit {
  user: User;
  activityText: string;
  goalText: string;
  editingUser = false;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.setUserValues();
  }
  onUserChangedEvent() {
    this.setUserValues();
    this.editingUser = false;
  }
  setUserValues() {
    this.user = this.userService.user;
    this.user.Activity === 1.2
      ? (this.activityText = 'Prawie brak')
      : this.user.Activity === 1.375
      ? (this.activityText = 'Lekka aktywność')
      : this.user.Activity === 1.55
      ? (this.activityText = 'Umiarkowana aktywność')
      : this.user.Activity === 1.725
      ? (this.activityText = 'Duża aktywność')
      : (this.activityText = 'Bardzo duża aktywność');
    this.user.Goal === 0
      ? (this.goalText = 'Schudnąć')
      : this.user.Goal === 1
      ? (this.goalText = 'Utrzymać obecną wagę')
      : (this.goalText = 'Przytyć');
  }
  onLogout():void {
    this.userService.logout();
  }
}
