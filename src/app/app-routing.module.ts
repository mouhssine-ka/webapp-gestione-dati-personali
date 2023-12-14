import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DettagliAnagraficaComponent } from './components/dettagli-anagrafica/dettagli-anagrafica.component';
import { ListaAnagraficheComponent } from './components/lista-anagrafiche/lista-anagrafiche.component';

const routes: Routes = [
  {
    path: '',
    component: ListaAnagraficheComponent
  },
  {
    path: 'lista-anagrafiche',
    component: ListaAnagraficheComponent
  },
  {
    path: 'anagrafica/:id',
    component: DettagliAnagraficaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
