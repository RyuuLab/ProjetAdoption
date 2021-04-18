import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {SiteDataService} from '../shared/services/site-data.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private titleService: Title, private route: ActivatedRoute, private router: Router, private siteDataService: SiteDataService) {
    this.siteDataService.changeTitle(titleService, route);
  }

  ngOnInit(): void {
  }

  onBackToAccueil() {
    this.router.navigate(['/accueil']);
  }
}
