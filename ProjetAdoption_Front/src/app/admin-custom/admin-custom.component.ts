import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {SpeciesService} from '../shared/services/species.service';
import {RaceService} from '../shared/services/race.service';
import {CharacterService} from '../shared/services/character.service';
import {ISpecies} from '../shared/interfaces/species.interface';
import {IRace} from '../shared/interfaces/race.interface';
import {ICharacter} from '../shared/interfaces/characte.interface';

@Component({
  selector: 'app-admin-custom',
  templateUrl: './admin-custom.component.html',
  styleUrls: ['./admin-custom.component.scss']
})
export class AdminCustomComponent implements OnInit {
  formSpecies: any;
  formSepecifications: any;
  formRace: any;
  species: ISpecies[];
  races: IRace[];
  characters: ICharacter[];
  defaultSpecies = 'default';
  defaultRace = 'default';
  defaultChara = 'default';
  selectedSpecies: boolean;
  selectedRace: boolean;
  selectedChara: boolean;

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
    this.formRace = this.formBuilder.group({
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
    this.selectedSpecies = false;
    this.selectedRace = false;
    this.selectedChara = false;
  }

  createSpecie() {
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
    this.speciesService.toDelete(this.formSpecies.value.selectedSpecie).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }

  createRace() {
    this.raceService.toCreate({
      idEspece: this.formSpecies.value.selectedSpecie,
      nom_race: this.formRace.value.newRace
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
    this.raceService.toUpdate({
      id_race: this.formRace.value.selectedRace,
      nom_race: this.formRace.valueRace
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
    this.raceService.toDelete(this.formRace.value.selectedRace).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }

  createChara() {
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
    this.characterService.toDelete(this.formSepecifications.value.selectedChara).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }

  selectSpecies() {
    if (this.formSpecies.value.selectedSpecie !== 'default') {
      console.log(this.formSpecies.value.selectedSpecie);
      this.selectedSpecies = true;
    } else {
      this.selectedSpecies = false;
    }
  }

  selectRace() {
    if (this.formRace.value.selectedRace !== 'default') {
      console.log(this.formRace.value.selectedRace);
      this.selectedRace = true;
    } else {
      this.selectedRace = false;
    }
  }

  selectChara() {
    if (this.formSepecifications.value.selectedChara !== 'default') {
      console.log(this.formSepecifications.value.selectedChara);
      this.selectedChara = true;
    } else {
      this.selectedChara = false;
    }
  }
}
