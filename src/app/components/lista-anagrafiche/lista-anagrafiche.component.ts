import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { GestioneAnagraficaService } from 'src/app/shared/services/gestione-anagrafica.service';
import { Filtro } from 'src/app/shared/interfaces/filtro';

@Component({
  selector: 'app-lista-anagrafiche',
  templateUrl: './lista-anagrafiche.component.html',
  styleUrls: ['./lista-anagrafiche.component.css']
})
export class ListaAnagraficheComponent implements OnInit,AfterViewInit {

  listaAnagrafiche: any[] = [];
  anagraficheFiltrate: any[] = [];

  ordine: string = '';
  campoOrdine: string = '';

  mostraFrecceOrdine = true;

  @ViewChildren('highlightedRow')
  righeEvidenziate!: QueryList<ElementRef>;
  evidenzaTimeout?: Subscription;
  anagraficaModificataId: number | null = null;

  anagraficaAggiuntaId: number | undefined;

  mostraAnagraficheFiltrate = false;
  filtri: Filtro[] = [];
  @Output() filtroApplicato = new EventEmitter<Filtro>();
  
  constructor(private router: Router, private gestioneAnagrafica: GestioneAnagraficaService) {}

  ngOnInit() {
    this.loadlistaAnagrafiche();
    this.gestioneAnagrafica.anagraficaAggiunta$.subscribe((p) => { 
      this.anagraficaAggiuntaId = p; 
      this.loadlistaAnagrafiche(); 
      if(this.anagraficaAggiuntaId != null){
        this.evidenzaRiga(this.anagraficaAggiuntaId);
      }
    });
    
    this.gestioneAnagrafica.anagraficaModificata$.subscribe((anagraficaId: number | null) => {
      this.anagraficaModificataId = anagraficaId;
      if (this.anagraficaModificataId !== null) {
        this.evidenzaRiga(this.anagraficaModificataId);
      }
    });
  }

  ngAfterViewInit() {
    this.righeEvidenziate.changes.subscribe(() => {
    });
  }

  loadlistaAnagrafiche() {
    this.gestioneAnagrafica.getListaAnagrafiche().subscribe(data => {
      this.listaAnagrafiche = data;
      this.anagraficheFiltrate = data;
    });
    this.ordinaDati(this.campoOrdine);
  }

  navigaDettagliAnagrafica(id: number) {
    this.router.navigate(['anagrafica', id]);
  }

  eliminaAnagrafica(id: number) {
    this.gestioneAnagrafica.deleteAnagrafica(id).subscribe(
      () => {
        this.loadlistaAnagrafiche();
        if(this.getListaAttiva() == this.anagraficheFiltrate){
          this.anagraficheFiltrate.forEach(anagrafica => {
              if(anagrafica.id == id){
                this.anagraficheFiltrate = this.anagraficheFiltrate.filter(filtro => filtro.id !== id)
              } 
          });
        }
      }
    );
  }

  isAnagraficaModificata(anagraficaId: number): boolean {
    return this.anagraficaModificataId === anagraficaId;
  }
  isAnagraficaAggiunta(anagraficaId: number): boolean{
    return this.anagraficaAggiuntaId == anagraficaId;
  }

  private evidenzaRiga(id: number) {
    this.anagraficaModificataId = id;

    this.clearEvidenzaTimeout();
    this.evidenzaTimeout = timer(2500).subscribe(() => {
      this.rimuoviEvidenza();
    });
  }

  private rimuoviEvidenza() {
    this.anagraficaModificataId = null;
    this.anagraficaAggiuntaId = undefined;
  }

  private clearEvidenzaTimeout() {
    if (this.evidenzaTimeout) {
      this.evidenzaTimeout.unsubscribe();
      this.evidenzaTimeout = undefined;
    }
  }

  ordinaDati(campo: string) {
    if (campo === this.campoOrdine) {
      this.ordine = this.ordine === 'asc' ? 'desc' : 'asc';
    } else {
      this.ordine = 'asc';
      this.campoOrdine = campo;
    }
  
    const listaDaOrdinare: any[] = this.getListaAttiva();
  
    listaDaOrdinare.sort((a, b) => {
      const valA = (a[campo] || '').toString().toLowerCase();
      const valB = (b[campo] || '').toString().toLowerCase();
  
      if (valA === valB) {
        return 0;
      }
  
      if (valA === '' || valA === null || valA === undefined) {
        return this.ordine === 'asc' ? -1 : 1;
      }
  
      if (valB === '' || valB === null || valB === undefined) {
        return this.ordine === 'asc' ? 1 : -1;
      }
  
      return this.ordine === 'asc' ? (valA < valB ? -1 : 1) : (valA > valB ? -1 : 1);
    });
  }
  
  onfiltroApplicato(filtri: Filtro[]) {
    this.mostraAnagraficheFiltrate = true;
  
    this.anagraficheFiltrate = this.listaAnagrafiche.filter(persona =>
      filtri.every(({ campo, valore }) => {
        if (campo === "nome") {
          return filtri
            .filter(f => f.campo === "nome")
            .some(f => {
              const campoValue = persona[campo]?.toLowerCase();
              return campoValue && (campoValue === f.valore.toLowerCase() || campoValue.startsWith(f.valore.toLowerCase()));
            });
        } else {
          const campoValue = persona[campo]?.toLowerCase();
          if (valore === "") {
            return campoValue === null || campoValue === undefined;
          }
          return campoValue && (campoValue === valore.toLowerCase() || campoValue.startsWith(valore.toLowerCase()));
        }
      })
    );
  }
  
  getListaAttiva(){
    if(this.mostraAnagraficheFiltrate){
      return this.anagraficheFiltrate;
    }
    else{
      return this.listaAnagrafiche;
    }
  }
}
