import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {SiteDataService} from '../shared/services/site-data.service';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = this.siteDataService.title;

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private router: Router,
    private siteDataService: SiteDataService
  )
  {
    this.siteDataService.changeTitle(titleService, route);
  }

  ngOnInit(): void {
  }

  toStories() {
    console.log('to stories');
    this.router.navigate(['mes-ecrits']);
  }

  toProfile() {
    console.log('to profile');
    this.router.navigate(['profil']);
  }

  toContacts() {
    console.log('to contacts');
  }
}
