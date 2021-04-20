import { Component, OnInit } from '@angular/core';
import {DomSanitizer, Title} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ValeurService} from '../shared/services/valeur.service';
import {AnimalService} from '../shared/services/animal.service';
import {ImageService} from '../shared/services/image.service';
import {IAnimal} from '../shared/interfaces/animal.interface';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.scss']
})
export class AnimalComponent implements OnInit {
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  animal: IAnimal;
  comment = false;
  comments = [false, false];
  textarea = ['', ''];
  username = ['', ''];
  formAdopt: any;
  animalId: number;
  isLoading: boolean;
  constructor(  private titleService: Title,
                private route: ActivatedRoute,
                private formBuilder: FormBuilder,
                private modalService: NgbModal,
                private valeurService: ValeurService,
                private animalService: AnimalService,
                private imageService: ImageService,
                private sanitizer: DomSanitizer
  ) {
    this.formAdopt = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      tel: [''],
      address: [''],
      city: [''],
      zipCode: [''],
      appartOrMaison: [''],
      jardin: ['']
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.animalId = +this.route.snapshot.paramMap.get('animalId');
    this.animalService.getAllByAnimal(this.animalId).subscribe(
      animal => {
        this.animal = animal;
        this.valeurService.getByAnimal(this.animalId).subscribe(
          chara => {
            this.animal.character = chara;
            this.imageService.getImageByIdAnimal(this.animalId).subscribe(
              images => {
                this.animal.image = images;
                this.isLoading = false;
                console.log(this.animal);
              }
            );
          }
        );
      }
    );
  }

  sendComment(username: any, textarea: any) {
    console.log(username);
    console.log(textarea);
  }

  sendFormAdopt(modal: any) {
    console.log(this.formAdopt);
    modal.close();
  }

  openModalFormAdopt(modalAdopt) {
    this.modalService.open(modalAdopt, { centered: true });
  }

  transform(imageBase64: string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(imageBase64);
  }
}
