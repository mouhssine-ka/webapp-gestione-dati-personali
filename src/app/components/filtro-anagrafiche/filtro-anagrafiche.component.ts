import { Component, EventEmitter, Output } from '@angular/core';
import { Filtro } from 'src/app/shared/interfaces/filtro';

@Component({
  selector: 'app-filtro-anagrafiche',
  templateUrl: './filtro-anagrafiche.component.html',
  styleUrls: ['./filtro-anagrafiche.component.css']
})
export class FiltroAnagraficheComponent {
  filtri: Filtro[] = [];
  filtriApplicati: Filtro[] = []
  maxNumFiltri = 10;

  @Output() filtriDaApplicare = new EventEmitter<Filtro[]>();

  constructor() { }

  rimuoviFiltro(filtro: Filtro) {
    const index = this.filtriApplicati.indexOf(filtro);

    if (index !== -1) {
      this.filtriApplicati.splice(index, 1);
      this.filtri.splice(index, 1)
      this.filtriDaApplicare.emit(this.filtriApplicati);
    }
    else {
      this.rimuoviCampo(filtro)
    }
  }

  rimuoviFiltri() {
    this.filtri = [];
    this.filtriApplicati = [];

    this.filtriDaApplicare.emit(this.filtriApplicati);
  }
  aggiungiFiltro() {
    if (this.filtri.length <= this.maxNumFiltri) {
      const nuovoFiltro: Filtro = { campo: '', campoFiltroSelezionato: false, valore: '' };
      this.filtri.push(nuovoFiltro);
    }
  }

  selezionaCampo(filtro: Filtro) {
    filtro.campoFiltroSelezionato = filtro.campo !== '';
  }

  rimuoviCampo(filtro: Filtro) {
    this.filtri = this.filtri.filter(x => x !== filtro);
  }

  applicaFiltro(filtro: Filtro) {
    if (!this.filtriApplicati.includes(filtro)) {
      this.filtriApplicati.push(filtro);
    }

    this.filtriDaApplicare.emit(this.filtriApplicati);
  }
}
