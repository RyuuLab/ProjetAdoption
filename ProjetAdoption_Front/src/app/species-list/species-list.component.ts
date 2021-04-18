import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {SiteDataService} from '../shared/services/site-data.service';

@Component({
  selector: 'app-species-list',
  templateUrl: './species-list.component.html',
  styleUrls: ['./species-list.component.scss']
})
export class SpeciesListComponent implements OnInit {
  title = this.siteDataService.title;
  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private router: Router,
    private siteDataService: SiteDataService
  ) {
    this.siteDataService.changeTitle(titleService, route);
  }

  ngOnInit(): void {
  }
}
