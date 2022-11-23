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
  activityText:string
  goalText:string;
  editingUser=true;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.user;
    console.log(this.user);
    this.user.Activity===0? this.activityText='Prawie brak':
      (this.user.Activity===1?this.activityText='Lekka aktywność':
      (this.user.Activity===2?this.activityText='Umiarkowana aktywność':
      (this.user.Activity===3?this.activityText='Duża aktywność': this.activityText='Bardzo duża aktywność')));
    
    this.user.Goal===0?this.goalText='Schudnąć':
      (this.user.Goal===1?this.goalText='Utrzymać obecną wagę':this.goalText='Przytyć')
      
      console.log(this.goalText);

  }
  
}
