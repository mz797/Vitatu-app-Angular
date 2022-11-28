import { EventEmitter, Injectable, Output } from '@angular/core';
import { User } from '../types/User.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user = new User('Ala', 34, 168, 58, 1.375, 'Kobieta', true, 1);
  signedin=false;
  @Output() userWasLoggedout=new EventEmitter<void>();

  changeUser(newUser:User){
    this.user=newUser
  }
  login(){
    this.signedin=true;
  }
  logout(){
    this.signedin=false;
    this.userWasLoggedout.emit();
  }
}
