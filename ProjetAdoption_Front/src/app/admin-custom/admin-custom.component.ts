import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {SpeciesService} from '../shared/services/species.service';
import {RaceService} from "../shared/services/race.service";
import {CharacterService} from "../shared/services/character.service";

@Component({
  selector: 'app-admin-custom',
  templateUrl: './admin-custom.component.html',
  styleUrls: ['./admin-custom.component.scss']
})
export class AdminCustomComponent implements OnInit {
  formSpecies: any;
  formSepecifications: any;
  formRaces: any;

  constructor(private formBuilder: FormBuilder,
              private speciesService: SpeciesService,
              private raceService: RaceService,
              private characterService: CharacterService
  ) {
    this.formSpecies = this.formBuilder.group({
      newSpecie: [],
      selectedSpecie: [],
      valueSpecie: [],
    });
    this.formRaces = this.formBuilder.group({
      newRace: [],
      selectedRace: [],
      valueRace: [],
    });
    this.formSepecifications = this.formBuilder.group({
      newChara: [],
      selectedChara: [],
      valueChara: [],
    });
  }

  ngOnInit(): void {
  }

  createSpecie() {
    console.log(this.formSpecies);
    this.speciesService.toCreate({
      nom_espece: this.formSpecies.value.newSpecie
    }).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }

  updateSpecie() {
    console.log(this.formSpecies);
    this.speciesService.toUpdate({
      id_espece: this.formSpecies.value.selectedSpecie,
      nom_espece: this.formSpecies.valueSpecie
    }).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }

  deleteSpecie() {
    console.log(this.formSpecies);
  }

  createRace() {
    console.log(this.formRaces);
    this.raceService.toCreate({
      idEspece: this.formSpecies.value.selectedSpecie,
      nom_race: this.formRaces.value.newRace
    }).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }

  updateRace() {
    console.log(this.formRaces);
    this.raceService.toUpdate({
      id_race: this.formRaces.value.selectedRace,
      nom_race: this.formRaces.valueRace
    }).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }

  deleteRace() {
    console.log(this.formRaces);
  }

  createChara() {
    console.log(this.formSepecifications);
    this.characterService.toCreate({
      id_espece: this.formSpecies.value.selectedSpecie,
      nom_caracteristique: this.formSepecifications.newChara
    }).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }

  updateChara() {
    console.log(this.formSepecifications);
    this.characterService.toUpdate({
      id_caracteristique: this.formSepecifications.value.selectedChara,
      nom_caracteristique: this.formSepecifications.valueChara
    }).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }

  deleteChara() {
    console.log(this.formSepecifications);
  }
}
