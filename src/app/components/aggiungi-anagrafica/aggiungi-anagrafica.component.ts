import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Anagrafica } from 'src/app/shared/models/anagrafica';
import { GestioneAnagraficaService } from 'src/app/shared/services/gestione-anagrafica.service';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-aggiungi-anagrafica',
  templateUrl: './aggiungi-anagrafica.component.html',
  styleUrls: ['./aggiungi-anagrafica.component.css']
})
export class AggiungiAnagraficaComponent implements OnInit {

  anagraficaForm!: FormGroup;
  mostraForm = false;
  anagrafica: Anagrafica = new Anagrafica;
  formSubmited = false;

  constructor(private gestioneAnagrafica: GestioneAnagraficaService) { }

  ngOnInit(): void {
    this.anagraficaForm = new FormGroup({
      nome: new FormControl(this.anagrafica.nome, [Validators.required, this.noWhiteSpaceValidator()]),
      cognome: new FormControl(this.anagrafica.cognome, [Validators.required, this.noWhiteSpaceValidator()]),
      email: new FormControl(this.anagrafica.email, [Validators.required, Validators.email]),
      indirizzo: new FormControl(this.anagrafica.indirizzo),
      localita: new FormControl(this.anagrafica.localita),
      comune: new FormControl(this.anagrafica.comune),
      provincia: new FormControl(this.anagrafica.provincia || null),
      note: new FormControl(this.anagrafica.note)
    });
  }

  noWhiteSpaceValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isWhitespace = (control.value || '').trim().length === 0;

      return isWhitespace ? { 'whitespace': true } : null;
    };
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

  onSubmit() {
    this.formSubmited = true;
    if (this.anagraficaForm.valid) {
      this.mostraFormAnagrafica();

      const Anagrafica: Anagrafica = this.anagraficaForm.value;
      this.gestioneAnagrafica.addAnagrafica(Anagrafica).subscribe();
    }
  }

  mostraFormAnagrafica() {
    if (!this.mostraForm) {
      this.formSubmited = false;
      this.anagraficaForm.reset();
    }
    this.mostraForm = !this.mostraForm;
  }
}
