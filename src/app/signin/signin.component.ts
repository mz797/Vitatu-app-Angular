import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user-site/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  incorrectData:boolean;
  @Output() userLoggedIn = new EventEmitter<void>();
  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.incorrectData=false;
    this.signinForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  onSubmit():void {
    console.log(this.signinForm);
    if (
      this.signinForm.get('name').value === 'admin' &&
      this.signinForm.get('password').value === 'admin'
    ) {
      this.userService.login();
      this.userLoggedIn.emit();
    }
    else{
this.incorrectData=true;
    }
  }
}
