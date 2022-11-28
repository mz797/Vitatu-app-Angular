import { Component, OnInit } from '@angular/core';
import { User } from './types/User.model';
import { UserService } from './user-site/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  title = 'KalkulatorKaloriii';
  loadedFeature = 'diet';
  user:User;
  loggedIn:boolean;
  constructor(private userService:UserService){}
  ngOnInit(): void {
    this.user=this.userService.user
    this.loggedIn=this.userService.signedin;
    this.userService.userWasLoggedout.subscribe(()=>{
      this.loggedIn=this.userService.signedin;
    })
    
  }
  onNavigate(feature: string):void {
    this.loadedFeature = feature;
  }
  onLoggedIn():void{
    this.loggedIn=this.userService.signedin;
  }
}
