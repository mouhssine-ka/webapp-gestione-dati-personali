import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiungiAnagraficaComponent } from './aggiungi-anagrafica.component';

describe('AggiungiAnagraficaComponent', () => {
  let component: AggiungiAnagraficaComponent;
  let fixture: ComponentFixture<AggiungiAnagraficaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AggiungiAnagraficaComponent]
    });
    fixture = TestBed.createComponent(AggiungiAnagraficaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
