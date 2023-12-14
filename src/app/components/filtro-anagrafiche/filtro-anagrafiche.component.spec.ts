import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroAnagraficheComponent } from './filtro-anagrafiche.component';

describe('FiltroAnagraficheComponent', () => {
  let component: FiltroAnagraficheComponent;
  let fixture: ComponentFixture<FiltroAnagraficheComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FiltroAnagraficheComponent]
    });
    fixture = TestBed.createComponent(FiltroAnagraficheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
