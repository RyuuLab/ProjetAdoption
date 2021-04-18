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


  toCreate(animal: IAnimal): Observable<any> {
    return this.http.post(AUTH_API + 'creerAnimal', animal, httpOptions);
  }

}
