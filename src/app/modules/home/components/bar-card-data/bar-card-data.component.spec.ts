import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarCardDataComponent } from './bar-card-data.component';

describe('BarCardDataComponent', () => {
  let component: BarCardDataComponent;
  let fixture: ComponentFixture<BarCardDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarCardDataComponent]
    });
    fixture = TestBed.createComponent(BarCardDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
