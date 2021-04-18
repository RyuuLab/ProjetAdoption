import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ICharacter} from '../interfaces/characte.interface';

const AUTH_API = 'http://localhost:8080/caracteristique/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  constructor(private http: HttpClient) { }

  toCreate(charachter: ICharacter): Observable<any> {
    return this.http.post(AUTH_API + 'creerCaracteristique', charachter, httpOptions);
  }

  toUpdate(charachter: ICharacter): Observable<any> {
    return this.http.put(AUTH_API + 'modifierCaracteristique', charachter, httpOptions);
  }

  toDelete(idCaracteristique: number): Observable<any> {
    return this.http.delete(AUTH_API + idCaracteristique + '/supprimerCaracteristique', httpOptions);
  }
}
