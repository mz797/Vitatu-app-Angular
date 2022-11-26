import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent implements OnInit {
  inputValue:string='';
  @Input() searchInput:string='';
  @Output() searchInputChange=new EventEmitter<string>();
  // @Output() inputEvent = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }
  onInputChange():void{
    this.searchInputChange.emit(this.searchInput)
    // this.inputEvent.emit(this.inputValue);
  }

}
