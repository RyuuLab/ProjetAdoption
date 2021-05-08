import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IAnimal} from '../interfaces/animal.interface';

const AUTH_API = 'http://localhost:8080/animal/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  constructor(private http: HttpClient) { }


  getAllBySpecie(specieId: number): Observable<any> {
    return this.http.get(AUTH_API + specieId + '/animauxByEspece', httpOptions);
  }

  getCountAnimals(): Observable<any> {
    return this.http.get(AUTH_API + 'countAnimals', httpOptions);
  }

  getAllByAnimal(animalId: number): Observable<any> {
    return this.http.get(AUTH_API + animalId , httpOptions);
  }

  toCreate(animal: IAnimal): Observable<any> {
    return this.http.post(AUTH_API + 'creerAnimal', animal, httpOptions);
  }

  toUpadte(animal: IAnimal): Observable<any> {
    return this.http.put(AUTH_API + 'modifierAnimal', animal, httpOptions);
  }

}
