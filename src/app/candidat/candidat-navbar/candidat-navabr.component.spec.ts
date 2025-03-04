import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatNavbarComponent } from './candidat-navbar.component';

describe('CandidatNavabrComponent', () => {
  let component: CandidatNavbarComponent;
  let fixture: ComponentFixture<CandidatNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidatNavbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CandidatNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
