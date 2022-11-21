import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CawDetailComponent } from './caw-detail.component';

describe('CawDetailComponent', () => {
  let component: CawDetailComponent;
  let fixture: ComponentFixture<CawDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CawDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CawDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
