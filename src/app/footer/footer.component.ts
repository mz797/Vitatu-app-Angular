import { Component, OnInit } from '@angular/core';
import { User } from '../types/User.model';
import { UserService } from '../user-site/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  user:User;
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.user=this.userService.user
  }

}
