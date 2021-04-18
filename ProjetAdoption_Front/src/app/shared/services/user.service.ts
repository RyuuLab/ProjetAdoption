import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {TokenStorageService} from './token-storage.service';
import {IUser} from '../interfaces/user.interface';

const AUTH_API = 'http://localhost:8080/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: IUser;
  userLoad = new Subject<IUser>();

  constructor(private http: HttpClient, private tokeStorageService: TokenStorageService) { }


  changePasswordAPI(user: IUser): Observable<any> {
    return this.http.put(AUTH_API + 'test', {
      user
    }, httpOptions);
  }

  getUser() {
    this.user = this.tokeStorageService.getUser();
    this.userLoad.next(this.user);
    console.log(this.user);
  }

  signOut() {
    this.tokeStorageService.signOut();
    this.getUser();
  }

  autoSignUp() {
    this.getUser();
  }
}
