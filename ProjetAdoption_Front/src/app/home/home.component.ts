import {Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {SiteDataService} from '../shared/services/site-data.service';
import {UserService} from '../shared/services/user.service';
import {IUser} from '../shared/interfaces/user.interface';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  title = this.siteDataService.title;
  user: IUser;
  numberStory: number;
  userSubscription: Subscription;
  isAdmin: boolean;

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private router: Router,
    private siteDataService: SiteDataService,
    private userService: UserService,
  ) {
    this.siteDataService.changeTitle(titleService, route);
  }

  ngOnInit(): void {
    this.user = this.userService.user;
    this.userSubscription = this.userService.userLoad.subscribe(
      user => {
        this.user = user;
        if (this.user) {
          if (this.user.username === 'admin') {
            this.isAdmin = true;
          }
        }
        else {
          this.isAdmin = false;
        }
      }
    );
  }

  toStories() {
    console.log('to stories');
    this.router.navigate(['liste-especes']);
  }

  toProfile() {
    console.log('to profile');
    this.router.navigate(['profil']);
  }

  toAdmin() {
    console.log('to contacts');
    this.router.navigate(['menu-admin']);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
