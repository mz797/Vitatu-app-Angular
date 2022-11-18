import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Diet } from 'src/app/types/Diet.model';
import { DietService } from '../diet.service';

@Component({
  selector: 'app-diet-product',
  templateUrl: './diet-product.component.html',
  styleUrls: ['./diet-product.component.css'],
})
export class DietProductComponent implements OnInit {
  @Input() product: Diet;
  showDetails = false;
  @Output() deleteEvent = new EventEmitter<string>();

  constructor(private dietService: DietService) {}

  ngOnInit(): void {}
  onDelete(id:string) {
    console.log();
    this.dietService.deletePost(this.product.IdDiet);
    this.deleteEvent.emit(id);
  }
}
