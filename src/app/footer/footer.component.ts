import { Component, Input, OnInit } from '@angular/core';
import { User } from '../types/User.model';
import { UserService } from '../user-site/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  @Input() nutritionalValues: {
    kcal: number;
    carbo: number;
    fat: number;
    protein: number;
  };
  @Input() procentageMacros: {
    kcal: number;
    carbo: number;
    fat: number;
    protein: number;
  };
  @Input() user: User;
  constructor() {}

  ngOnInit(): void {
    
  }
  
}
