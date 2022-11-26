import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/types/User.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  @Input() user:User;
  @Output() userChangedEvent=new EventEmitter<void>();
  userForm:FormGroup;
  constructor(private fb:FormBuilder, private userService:UserService) { }

  ngOnInit(): void {
    console.log(this.user.Diabets);
    this.userForm=this.fb.group({
      name:[this.user.Name,Validators.required],
      age:[this.user.Age,[Validators.required,Validators.min(18)]],
      height:[this.user.Height,[Validators.required,Validators.min(130)]],
      weight:[this.user.Weight,[Validators.required,Validators.min(40)]],
      activity:[this.user.Activity,[Validators.required]],
      gender:[this.user.Gender==='Kobieta'?'Kobieta':'Mężczyzna',[Validators.required]],
      diabets:[this.user.Diabets?'true':'false',[Validators.required]],
      goal:[this.user.Goal,[Validators.required]]
    })
  }
  onSubmit(){
    console.log(this.userForm.value);
    this.userService.changeUser(
      new User(this.userForm.value.name,
        +this.userForm.value.age,
        +this.userForm.value.height,
        +this.userForm.value.weight,
        +this.userForm.value.activity,
        this.userForm.value.gender,
        JSON.parse(this.userForm.value.diabets.toLowerCase()),
        +this.userForm.value.goal)
    )
    this.userForm.reset();
    this.userChangedEvent.emit()
  }
}
