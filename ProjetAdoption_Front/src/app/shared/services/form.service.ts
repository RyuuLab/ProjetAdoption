import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IFormAdoption} from '../interfaces/formAdoption';

const AUTH_API = 'http://localhost:8080/formulaire_adoption/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FormService {
  constructor(private http: HttpClient) { }

  toCreate(form: IFormAdoption): Observable<any> {
    return this.http.post(AUTH_API + 'creerFormulaire_adoption', form, httpOptions);
  }
}
