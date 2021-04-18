import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {SpeciesService} from '../shared/services/species.service';
import {RaceService} from '../shared/services/race.service';
import {CharacterService} from '../shared/services/character.service';
import {ISpecies} from '../shared/interfaces/species.interface';
import {IRace} from '../shared/interfaces/race.interface';
import {ICharacter} from '../shared/interfaces/characte.interface';
import {AnimalService} from '../shared/services/animal.service';
import {ImageService} from "../shared/services/image.service";
import {DomSanitizer} from "@angular/platform-browser";
import {IImage} from "../shared/interfaces/image.interface";
import {ValeurService} from "../shared/services/valeur.service";

@Component({
  selector: 'app-add-animal',
  templateUrl: './add-animal.component.html',
  styleUrls: ['./add-animal.component.scss']
})
export class AddAnimalComponent implements OnInit {
  createAnimalForm: FormGroup;
  images = [];
  defaultSpecies = 'default';
  defaultRace = 'default';
  species: ISpecies[];
  races: IRace[];
  characters: ICharacter[];
  selectedSpecies: boolean;
  image: any;
  constructor(private formBuilder: FormBuilder,
              private speciesService: SpeciesService,
              private raceService: RaceService,
              private characterService: CharacterService,
              private animalService: AnimalService,
              private imageService: ImageService,
              private sanitizer: DomSanitizer,
              private valeurService: ValeurService
  ) {
    this.createAnimalForm = this.formBuilder.group({
      name: [],
      age: [],
      sex: [],
      story: [],
      color: [],
      character: [],
      species: [],
      race: [],
      file: [],
      fileSource: [],
      specifications: this.formBuilder.array([this.createSpecifications()])
    });
  }

  ngOnInit(): void {
    this.speciesService.getAll().subscribe(
        data => {
          this.species = data;
        },
        err => {
          console.log(err);
        }
    );
  }

  onFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      const filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          this.images.push(event.target.result);
          this.createAnimalForm.patchValue({
            fileSource: this.images
          });
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  get specifications() {
    return this.createAnimalForm.get('specifications') as FormArray;
  }

  createSpecifications() {
    return this.formBuilder.group({
      specificationName: ['default'],
      specificationValue: ['']
    });
  }

  addSpecifications() {
    this.specifications.push(this.createSpecifications());
  }

  deleteSpecifications(index) {
    this.specifications.removeAt(index);
  }

  removeImg(index: number) {
    this.images.splice(index, 1);
    this.createAnimalForm.patchValue({
      fileSource: this.images
    });
    console.log(this.createAnimalForm);
  }

  selectSpecies() {
    this.specifications.clear();
    this.addSpecifications();
    if (this.defaultSpecies !== 'default') {
      this.selectedSpecies = true;
      this.raceService.getAll(+this.createAnimalForm.value.species).subscribe(
          data => {
            this.races = data;
          },
          err => {
            console.log(err);
          }
      );
      this.characterService.getAll(+this.createAnimalForm.value.species).subscribe(
          data => {
            this.characters = data;
          },
          err => {
            console.log(err);
          }
      );
      this.defaultRace = 'default';
    } else {
      this.selectedSpecies = false;
    }
  }

  create() {
   this.animalService.toCreate({
     nom: this.createAnimalForm.value.name,
     age: this.createAnimalForm.value.age,
     sexe: this.createAnimalForm.value.sex,
     histoire: this.createAnimalForm.value.story,
     couleur: this.createAnimalForm.value.color,
     caractere: this.createAnimalForm.value.character,
     idEspece: this.createAnimalForm.value.species,
     idRace: this.createAnimalForm.value.race,
      }).subscribe(
          data => {
            this.uploadImages(data);
            this.saveSpecifications(data);
          },
          err => {
            console.log(err);
          }
      );
  }

  transform(imageBase64: string){
    this.imageService.getImageById(1).subscribe(
        data => {
          console.log(data.image);
          this.transform(data.image);
        },
        err => {
          console.log(err);
        }
    );
    return this.image = this.sanitizer.bypassSecurityTrustResourceUrl(imageBase64);
  }

  uploadImages(data: any) {
    const images: IImage[] = [];
    this.createAnimalForm.value.fileSource.forEach(element =>
        images.push({
          idAnimal: data.id_animal,
          image: element
        })
    );
    this.imageService.toCreate(images).subscribe(
        image => {
          console.log(data);
        },
        err => {
          console.log(err);
        }
    );
  }

  saveSpecifications(data: any) {
    const valeurs: ICharacter[] = [];
    this.createAnimalForm.value.specifications.forEach(element => {
          if (element.specificationName !== 'default' && element.specificationValue !== '') {
            valeurs.push({
              id_animal: data.id_animal,
              id_caracteristique: element.specificationName,
              valeur: element.specificationValue
            });
          }
        }
    );
    console.log(valeurs);
    if (valeurs.length > 0) {
      this.valeurService.toCreate(valeurs).subscribe(
          valeur => {
            console.log(valeur);
          },
          err => {
            console.log(err);
          }
      );
  }
  }
}
