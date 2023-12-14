import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Anagrafica } from 'src/app/shared/models/anagrafica';
import { GestioneAnagraficaService } from 'src/app/shared/services/gestione-anagrafica.service';

@Component({
  selector: 'app-dettagli-anagrafica',
  templateUrl: './dettagli-anagrafica.component.html',
  styleUrls: ['./dettagli-anagrafica.component.css']
})
export class DettagliAnagraficaComponent implements OnInit {

  isReadOnly = true;
  formSubmited = false;
  anagraficaForm!: FormGroup;

  anagrafica: Anagrafica = new Anagrafica;
  anagraficaId: number = -1;
  originalAnagrafica: Anagrafica = new Anagrafica;

  @ViewChild('inputField') inputField!: ElementRef;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gestioneAnagrafica: GestioneAnagraficaService
  ) { }

  ngOnInit(): void {
    this.loadDettagliAnagrafica();

    this.anagraficaForm = new FormGroup({
      nome: new FormControl('', [Validators.required, this.noWhiteSpaceValidator()]),
      cognome: new FormControl('', [Validators.required, this.noWhiteSpaceValidator()]),
      email: new FormControl('', [Validators.required, Validators.email]),
      indirizzo: new FormControl(''),
      localita: new FormControl(''),
      comune: new FormControl(''),
      provincia: new FormControl(null),
      note: new FormControl('')
    });

  }

  onModificaCompletata(anagraficaId: number) {
    this.router.navigate(['/lista-anagrafiche']);
  }

  loadDettagliAnagrafica() {
    const anagraficaIdString = this.route.snapshot.paramMap.get('id');
    if (anagraficaIdString !== null) {
      this.anagraficaId = +anagraficaIdString;
      this.gestioneAnagrafica.getAnagraficaById(this.anagraficaId).subscribe(data => {
        this.anagrafica = data;
        this.anagraficaForm.patchValue({
          nome: this.anagrafica.nome,
          cognome: this.anagrafica.cognome,
          email: this.anagrafica.email,
          indirizzo: this.anagrafica.indirizzo,
          localita: this.anagrafica.localita,
          comune: this.anagrafica.comune,
          provincia: this.anagrafica.provincia,
          note: this.anagrafica.note
        });
      });
    }
  }

  noWhiteSpaceValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isWhitespace = (control.value || '').trim().length === 0;
      return isWhitespace ? { 'whitespace': true } : null;
    }
  }

  tornaIndietro() {
    this.gestioneAnagrafica.notificaModifica(-1);
    this.router.navigate(['lista-anagrafiche']);
  }

  modificaDati() {
    this.isReadOnly = false;

    if (!this.isReadOnly) {
      this.inputField.nativeElement.focus();
    }
  }

  anullaModifica() {
    this.isReadOnly = true;
    this.anagraficaForm.reset();
    this.loadDettagliAnagrafica()
  }
  
  onSubmit() {
    this.formSubmited = true;

    if (this.anagraficaForm.valid) {
      const campiModificati: { [key: string]: any } = {};
      for (const chiave in this.anagraficaForm.controls) {
        const control = this.anagraficaForm.controls[chiave];

        if (control.dirty && control.value !== (this.anagrafica as any)[chiave]) {
          campiModificati[chiave] = control.value;
        }
      }

      if (Object.keys(campiModificati).length > 0) {
        this.gestioneAnagrafica.editAnagrafica(this.anagraficaId, campiModificati as Anagrafica).subscribe((id) => {
          this.isReadOnly = true;
        });
        this.router.navigate(['']);
      }

      this.isReadOnly = true;
    }
  }

  get nome() {
    return this.anagraficaForm.get('nome');
  }
  get cognome() {
    return this.anagraficaForm.get('cognome');
  }
  get email() {
    return this.anagraficaForm.get('email');
  }
}
