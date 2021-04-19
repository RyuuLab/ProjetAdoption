import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {SiteDataService} from '../shared/services/site-data.service';
import {IAnimal} from '../shared/interfaces/animal.interface';
import {AnimalService} from '../shared/services/animal.service';

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.scss']
})
export class AnimalListComponent implements OnInit {
  title = this.siteDataService.title;
  specieId: number;
  animals: IAnimal[];
  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private router: Router,
    private siteDataService: SiteDataService,
    private animalService: AnimalService
  ) {
    this.siteDataService.changeTitle(titleService, route);
  }

  ngOnInit(): void {
    this.specieId = +this.route.snapshot.paramMap.get('specieId');
    console.log(this.specieId);
    this.animalService.getAllBySpecie(this.specieId).subscribe(
      data => {
        console.log(data);
        this.animals = data;
      },
      err => {
        console.log(err);
        }
    );
  }

}
