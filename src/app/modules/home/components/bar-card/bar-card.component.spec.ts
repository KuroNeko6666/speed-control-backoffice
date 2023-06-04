import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarCardComponent } from './bar-card.component';

describe('BarCardComponent', () => {
  let component: BarCardComponent;
  let fixture: ComponentFixture<BarCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarCardComponent]
    });
    fixture = TestBed.createComponent(BarCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
