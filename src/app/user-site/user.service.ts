import { Injectable } from '@angular/core';
import { User } from '../types/User.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user = new User('Ala', 34, 168, 58, 1.375, 'Kobieta', true, 1);

  changeUser(newUser:User){
    this.user=newUser
  }
}
