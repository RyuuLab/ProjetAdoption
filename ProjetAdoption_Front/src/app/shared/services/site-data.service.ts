import { Injectable } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SiteDataService {
  title: string = 'Adopt Me!';
  titleTab: string = ' - Adopt Me';
  changeTitle(titleService: Title, route: ActivatedRoute) {
    titleService.setTitle(route.snapshot.data['title'] + this.titleTab);
  }
}
