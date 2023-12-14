import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaAnagraficheComponent } from './components/lista-anagrafiche/lista-anagrafiche.component';
import { DettagliAnagraficaComponent } from './components/dettagli-anagrafica/dettagli-anagrafica.component';
import { FiltroAnagraficheComponent } from './components/filtro-anagrafiche/filtro-anagrafiche.component';
import { FormsModule } from '@angular/forms';
import { AggiungiAnagraficaComponent } from './components/aggiungi-anagrafica/aggiungi-anagrafica.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    ListaAnagraficheComponent,
    DettagliAnagraficaComponent,
    FiltroAnagraficheComponent,
    AggiungiAnagraficaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
