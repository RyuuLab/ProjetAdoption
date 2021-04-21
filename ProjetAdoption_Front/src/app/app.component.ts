import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from './shared/services/user.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  autoSignUpSubscription: Subscription;
  showApp: boolean = false;
  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.autoSignUp();
    this.autoSignUpSubscription = this.userService.autoSignUpDone.subscribe(
      data => {
        this.showApp = data;
      }
    );
  }

  ngOnDestroy(): void {
    this.autoSignUpSubscription.unsubscribe();
  }

}
