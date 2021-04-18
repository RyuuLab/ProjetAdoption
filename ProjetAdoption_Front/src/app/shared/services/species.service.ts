import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ISpecies} from '../interfaces/species.interface';
import {Observable} from 'rxjs';

const AUTH_API = 'http://localhost:8080/espece/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SpeciesService {
  constructor(private http: HttpClient) { }


  toCreate(species: ISpecies): Observable<any> {
    return this.http.post(AUTH_API + 'creerEspece', species, httpOptions);
  }

  toUpdate(species: ISpecies): Observable<any> {
    return this.http.put(AUTH_API + 'modifierEspece', species, httpOptions);
  }
}
