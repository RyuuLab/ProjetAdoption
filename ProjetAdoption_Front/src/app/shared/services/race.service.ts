import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IRace} from '../interfaces/race.interface';

const AUTH_API = 'http://localhost:8080/race/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RaceService {

  constructor(private http: HttpClient) { }


  toCreate(race: IRace): Observable<any> {
    return this.http.post(AUTH_API + 'creerRace', race, httpOptions);
  }

  toUpdate(race: IRace): Observable<any> {
    return this.http.put(AUTH_API + 'modifierRace', race, httpOptions);
  }

  toDelete(idRace: number): Observable<any> {
    return this.http.delete(AUTH_API + idRace + '/supprimerRace', httpOptions);
  }
}
