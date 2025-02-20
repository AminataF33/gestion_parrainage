import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GererPeriodeParrainageComponent } from './gerer-periode-parrainage.component';

describe('GererPeriodeParrainageComponent', () => {
  let component: GererPeriodeParrainageComponent;
  let fixture: ComponentFixture<GererPeriodeParrainageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GererPeriodeParrainageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GererPeriodeParrainageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
