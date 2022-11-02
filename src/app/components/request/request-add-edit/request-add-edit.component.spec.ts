import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestAddEditComponent } from './request-add-edit.component';

describe('RequestAddEditComponent', () => {
  let component: RequestAddEditComponent;
  let fixture: ComponentFixture<RequestAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
