import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElecteurParrainComponent } from './electeur-parrain.component';

describe('ElecteurParrainComponent', () => {
  let component: ElecteurParrainComponent;
  let fixture: ComponentFixture<ElecteurParrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElecteurParrainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElecteurParrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
