import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DietService } from 'src/app/diet/diet.service';
import { Diet } from 'src/app/types/Diet.model';
import { User } from 'src/app/types/User.model';

@Component({
  selector: 'app-diet-history-product',
  templateUrl: './diet-history-product.component.html',
  styleUrls: ['./diet-history-product.component.css'],
})
export class DietHistoryProductComponent implements OnInit {
  @Input() product: Diet;
  showDetails = false;
  @Output() deleteEvent = new EventEmitter<string>();
  @Output() editEvent = new EventEmitter<string>();
  @Input() user: User;
  userWW: number;
  userWBT: number;
  constructor(private dietService: DietService) {}

  ngOnInit(): void {
    if (this.user.Diabets) {
      this.userWW = +(this.product.Carbohydrates / 10).toFixed(2);
      this.userWW = +(
        (this.product.Protein * 4 + this.product.Fat * 9) /
        100
      ).toFixed(2);
    }
  }
  onDelete(id: string): void {
    console.log();
    this.dietService.deletePost(this.product.IdDiet);
    this.deleteEvent.emit(id);
  }
  onEdit() {
    console.log(this.product);
    this.editEvent.emit(this.product.IdDiet);
  }
}
