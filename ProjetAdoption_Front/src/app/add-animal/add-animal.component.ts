import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {SpeciesService} from '../shared/services/species.service';
import {RaceService} from '../shared/services/race.service';
import {CharacterService} from '../shared/services/character.service';
import {ISpecies} from '../shared/interfaces/species.interface';
import {IRace} from '../shared/interfaces/race.interface';
import {ICharacter} from '../shared/interfaces/characte.interface';
import {AnimalService} from '../shared/services/animal.service';

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
  constructor(private formBuilder: FormBuilder,
              private speciesService: SpeciesService,
              private raceService: RaceService,
              private characterService: CharacterService,
              private animalService: AnimalService
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
    console.log(this.createAnimalForm);
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

    }).subscribe(
        data => {
          console.log(data);
        },
        err => {
          console.log(err);
        }
    );
  }
}
