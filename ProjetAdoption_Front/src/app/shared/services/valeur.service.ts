import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IImage} from "../interfaces/image.interface";
import {Observable} from "rxjs";
import {ICharacter} from "../interfaces/characte.interface";

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
}
