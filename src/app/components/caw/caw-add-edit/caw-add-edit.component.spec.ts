import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CawAddEditComponent } from './caw-add-edit.component';

describe('CawAddEditComponent', () => {
  let component: CawAddEditComponent;
  let fixture: ComponentFixture<CawAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CawAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CawAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
