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
  @Output() deleteEvent = new EventEmitter<void>();

  constructor(private dietService: DietService) {}

  ngOnInit(): void {}
  clog(n: number) {
    console.log();
  }
  onDelete() {
    // console.log(this.product);
    this.dietService.deletePost(this.product.IdDiet);
    this.deleteEvent.emit();
  }
}
