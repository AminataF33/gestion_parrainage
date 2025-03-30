import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImporterListeComponent } from './importer-liste.component';

describe('ImporterListeComponent', () => {
  let component: ImporterListeComponent;
  let fixture: ComponentFixture<ImporterListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImporterListeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImporterListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
