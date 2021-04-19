import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IImage} from '../interfaces/image.interface';

const AUTH_API = 'http://localhost:8080/image/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  toCreate(images: IImage[]): Observable<any> {
    return this.http.post(AUTH_API + 'creerImage', images, httpOptions);
  }

  getImageById(idImage: number): Observable<any> {
    return this.http.get(AUTH_API + idImage, httpOptions);
  }

  getImageByIdAnimal(idAnimal: number): Observable<any> {
    return this.http.get(AUTH_API + idAnimal + '/imageByAnimal', httpOptions);
  }
}
