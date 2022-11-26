import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDietProductComponent } from './edit-diet-product.component';

describe('EditDietProductComponent', () => {
  let component: EditDietProductComponent;
  let fixture: ComponentFixture<EditDietProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDietProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDietProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
