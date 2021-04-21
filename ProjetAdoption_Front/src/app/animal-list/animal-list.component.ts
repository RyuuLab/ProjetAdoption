import { Component, OnInit } from '@angular/core';
import {DomSanitizer, Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {SiteDataService} from '../shared/services/site-data.service';
import {IAnimal} from '../shared/interfaces/animal.interface';
import {AnimalService} from '../shared/services/animal.service';
import {ImageService} from '../shared/services/image.service';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.scss']
})
export class AnimalListComponent implements OnInit {
  title = this.siteDataService.title;
  specieId: number;
  animals: IAnimal[];
  animalsAll: IAnimal[];
  isLoading: boolean;
  searchText: string;
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
    this.isLoading = true;
    this.specieId = +this.route.snapshot.paramMap.get('specieId');
    this.getAnimals();
  }

  transform(imageBase64: string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(imageBase64);
  }

  toAnimal(idAnimal: number) {
    this.router.navigate(['/animal', idAnimal]);
  }

  async getAnimals() {
    let i = 0;
    this.animalService.getAllBySpecie(this.specieId).subscribe(
      animals => {
        this.animals = animals;
        this.animalsAll = animals;
        this.animals.forEach(
          (animal, index) => {
            this.imageService.getImageByIdAnimal(animal.id_animal).subscribe(
              images => {
                animal.image = images;
                i++;
                if (i === this.animals.length) {this.isLoading = false; }
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
}
