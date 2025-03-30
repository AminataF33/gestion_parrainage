import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< HEAD:src/app/accueil/accueil.component.spec.ts
import { AccueilComponent } from './accueil.component';
=======
import { CandidatNavbarComponent } from './candidat-navbar.component';
>>>>>>> 7d81ad896a903c73784d35cbde9c28b87c46e6d1:src/app/candidat/candidat-navbar/candidat-navabr.component.spec.ts

describe('AccueilComponent', () => {
  let component: AccueilComponent;
  let fixture: ComponentFixture<AccueilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccueilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
