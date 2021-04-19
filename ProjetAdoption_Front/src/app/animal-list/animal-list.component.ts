import { Component, OnInit } from '@angular/core';
import {DomSanitizer, Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {SiteDataService} from '../shared/services/site-data.service';
import {IAnimal} from '../shared/interfaces/animal.interface';
import {AnimalService} from '../shared/services/animal.service';
import {ImageService} from '../shared/services/image.service';

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
    private animalService: AnimalService,
    private imageService: ImageService,
    private sanitizer: DomSanitizer
  ) {
    this.siteDataService.changeTitle(titleService, route);
  }

  ngOnInit(): void {
    this.specieId = +this.route.snapshot.paramMap.get('specieId');
    console.log(this.specieId);
    this.animalService.getAllBySpecie(this.specieId).subscribe(
      animals => {
        this.animals = animals;
        this.animals.forEach(
          animal => {
            this.imageService.getImageByIdAnimal(animal.id_animal).subscribe(
              images => {
                animal.image = images;
                console.log(this.animals);
              }
            );
          }
        );
      },
      err => {
        console.log(err);
        }
    );
  }

  transform(imageBase64: string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(imageBase64);
  }

}
