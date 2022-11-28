import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../user-site/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() loggedIn: boolean;
  @Output() featureSelected = new EventEmitter<string>();

  ngOnInit(): void {}
  onSelect(feature: string): void {
    this.featureSelected.emit(feature);
  }
}
