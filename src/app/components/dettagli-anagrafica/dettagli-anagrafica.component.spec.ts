import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DettagliAnagraficaComponent } from './dettagli-anagrafica.component';

describe('DettagliAnagraficaComponent', () => {
  let component: DettagliAnagraficaComponent;
  let fixture: ComponentFixture<DettagliAnagraficaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DettagliAnagraficaComponent]
    });
    fixture = TestBed.createComponent(DettagliAnagraficaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
