import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodeFermeeComponent } from './periode-fermee.component';

describe('PeriodeFermeeComponent', () => {
  let component: PeriodeFermeeComponent;
  let fixture: ComponentFixture<PeriodeFermeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeriodeFermeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeriodeFermeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
