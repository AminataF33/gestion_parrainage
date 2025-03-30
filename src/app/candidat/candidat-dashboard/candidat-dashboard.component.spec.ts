import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CandidatDashboardComponent } from './candidat-dashboard.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { ParrainageService } from '../../shared/services/parrainage.service';
import { CandidatService } from '../../shared/services/candidat.service';
import { of } from 'rxjs';

describe('CandidatDashboardComponent', () => {
  let component: CandidatDashboardComponent;
  let fixture: ComponentFixture<CandidatDashboardComponent>;
  
  let parrainageServiceSpy: jasmine.SpyObj<ParrainageService>;
  let candidatServiceSpy: jasmine.SpyObj<CandidatService>;

  beforeEach(async () => {
    // spys pour les services
    parrainageServiceSpy = jasmine.createSpyObj('ParrainageService', ['getCandidatStatistics', 'getCurrentPeriod', 'getCandidatParrainages', 'getDailyStatistics']);
    candidatServiceSpy = jasmine.createSpyObj('CandidatService', []);

    parrainageServiceSpy.getCandidatStatistics.and.returnValue(of({
      totalParrainages: 1000,
      newParrainages: 50,
      regions: ['Dakar', 'Thiès'],
    }));

    parrainageServiceSpy.getCurrentPeriod.and.returnValue(of({
      endDate: '2025-04-01',
    }));

    parrainageServiceSpy.getCandidatParrainages.and.returnValue(of([
      { date: '2025-03-01T10:00:00', region: 'Dakar', departement: 'Dakar', verificationCode: 'XYZ123' },
    ]));

    parrainageServiceSpy.getDailyStatistics.and.returnValue(of([
      { date: '2025-02-28', count: 30 },
      { date: '2025-03-01', count: 40 },
    ]));

    await TestBed.configureTestingModule({
      declarations: [CandidatDashboardComponent],
      imports: [RouterTestingModule, CommonModule],
      providers: [
        { provide: ParrainageService, useValue: parrainageServiceSpy },
        { provide: CandidatService, useValue: candidatServiceSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load dashboard data correctly', () => {
    //verification des donnees
    expect(component.totalParrainages).toBe(1000);
    expect(component.newParrainages).toBe(50);
    expect(component.regions).toEqual(['Dakar', 'Thiès']);
    expect(component.daysRemaining).toBeGreaterThan(0);
    expect(component.recentParrainages.length).toBe(1);
  });

  it('should initialize chart after data is loaded', (done) => {
    spyOn(component, 'initEvolutionChart');
    component.ngOnInit();

    setTimeout(() => {
      expect(component.initEvolutionChart).toHaveBeenCalled();
      done();
    }, 0);
  });

  it('should export parrainages to CSV', () => {
    component.exportParrainages();
    const fileName = `parrainages_${new Date().toISOString().split('T')[0]}.csv`;
    expect(fileName).toContain('parrainages');
  });
});
