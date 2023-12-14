import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Anagrafica } from '../models/anagrafica';

@Injectable({
    providedIn: 'root'
})
export class GestioneAnagraficaService {
    private urlDatiAnagraficali = 'http://localhost:3000/persone';

    private anagraficaModificataSource = new BehaviorSubject<number | null>(null);
    anagraficaModificata$ = this.anagraficaModificataSource.asObservable();

    private anagraficaAggiuntaSource = new Subject<number | undefined>();
    anagraficaAggiunta$ = this.anagraficaAggiuntaSource.asObservable();

    constructor(private http: HttpClient) { }

    notificaModifica(anagraficaId: number) {
        this.anagraficaModificataSource.next(anagraficaId);
    }

    getListaAnagrafiche(): Observable<Anagrafica[]> {
        return this.http.get<any[]>(this.urlDatiAnagraficali);
    }

    getAnagraficaById(id: number): Observable<Anagrafica> {
        return this.http.get<Anagrafica>(`${this.urlDatiAnagraficali}/${id}`);
    }

    addAnagrafica(anagrafica: Anagrafica): Observable<Anagrafica> {
        return this.http.post<Anagrafica>(this.urlDatiAnagraficali, anagrafica).pipe(tap((p) => { this.anagraficaAggiuntaSource.next(p.id); }));
    }

    deleteAnagrafica(index: number): Observable<any> {
        return this.http.delete(this.urlDatiAnagraficali + "/" + index);
    }

    editAnagrafica(id: number, anagrafica: Anagrafica): Observable<Anagrafica> {
        this.notificaModifica(id);
        return this.http.patch<Anagrafica>(this.urlDatiAnagraficali + "/" + id, anagrafica);
    }
}
