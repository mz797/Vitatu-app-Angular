import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  userForm=this.fb.group({
    name:['',Validators.required],
    age:['',[Validators.required,Validators.min(18)]],
    height:['',[Validators.required,Validators.min(130)]],
    weight:['',[Validators.required,Validators.min(45)]],
    activity:['',[Validators.required]],
    gender:['',[Validators.required]],
    diabets:['',[Validators.required]],
    goal:['',[Validators.required]]
  })
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
  }
  onSubmit(){

  }
}
