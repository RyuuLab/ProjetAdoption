import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ICharacter} from '../interfaces/characte.interface';

const AUTH_API = 'http://localhost:8080/valeur/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ValeurService {

  constructor(private http: HttpClient) { }

  toCreate(valeurs: ICharacter[]): Observable<any> {
    return this.http.post(AUTH_API + 'creerValeur', valeurs, httpOptions);
  }

  getByAnimal(idAnimal): Observable<any> {
    return this.http.get(AUTH_API + 'animal/' + idAnimal, httpOptions);
  }

  toUpdate(valeurs: ICharacter[]): Observable<any> {
    return this.http.put(AUTH_API + 'modifierValeur', valeurs, httpOptions);
  }

}
