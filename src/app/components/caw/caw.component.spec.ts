import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CawComponent } from './caw.component';

describe('CawComponent', () => {
  let component: CawComponent;
  let fixture: ComponentFixture<CawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CawComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
