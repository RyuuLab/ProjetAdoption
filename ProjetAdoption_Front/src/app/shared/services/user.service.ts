import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {TokenStorageService} from './token-storage.service';
import {IUser} from '../interfaces/user.interface';
import {Router} from '@angular/router';

const AUTH_API = 'http://localhost:8080/user/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: IUser;
  isAdmin: boolean = false;
  userLoad = new Subject<IUser>();
  autoSignUpDone = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    ) { }


  changePassword(user: IUser): Observable<any> {
    return this.http.put(AUTH_API + 'changePassword', user, httpOptions);
  }

  changeUsername(user: IUser): Observable<any> {
    return this.http.put(AUTH_API + 'changeUsername', user, httpOptions);
  }

  changeMail(user: IUser): Observable<any> {
    return this.http.put(AUTH_API + 'changeMail', user, httpOptions);
  }

  getUserAPI(id: number): Observable<any> {
    return this.http.get(AUTH_API + id, httpOptions);
  }

  getUser() {
    if (this.tokenStorageService.getUser()) {
      const id = this.tokenStorageService.getUser().id;
      this.getUserAPI(id).subscribe(
        data => {
          this.user = data;
          this.userLoad.next(this.user);
          this.autoSignUpDone.next(true);
          if (this.user.username === 'admin') {
              this.isAdmin = true;
          }
        }
      );
    } else {
      this.autoSignUpDone.next(true);
    }
  }

  updateUser() {
    this.userLoad.next(this.user);
  }

  signOut() {
    this.tokenStorageService.signOut();
    this.user = null;
    this.isAdmin = false;
    this.userLoad.next(null);
    this.router.navigate(['accueil']);
  }

  autoSignUp() {
    this.getUser();
  }


}
