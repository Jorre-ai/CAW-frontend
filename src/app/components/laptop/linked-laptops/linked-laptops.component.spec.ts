import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkedLaptopsComponent } from './linked-laptops.component';

describe('LinkedLaptopsComponent', () => {
  let component: LinkedLaptopsComponent;
  let fixture: ComponentFixture<LinkedLaptopsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkedLaptopsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkedLaptopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
