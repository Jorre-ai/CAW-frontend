import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaptopAddEditComponent } from './laptop-add-edit.component';

describe('AddEditComponent', () => {
  let component: LaptopAddEditComponent;
  let fixture: ComponentFixture<LaptopAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaptopAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaptopAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
