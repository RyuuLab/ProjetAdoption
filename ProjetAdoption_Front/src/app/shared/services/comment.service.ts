import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IImage} from '../interfaces/image.interface';
import {Observable} from 'rxjs';
// @ts-ignore
import {IComment} from '../interfaces/comment.interface';

const AUTH_API = 'http://localhost:8080/commentaire/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private http: HttpClient) { }

  toCreate(comment: IComment): Observable<any> {
    return this.http.post(AUTH_API + 'creerCommentaire', comment, httpOptions);
  }
}
