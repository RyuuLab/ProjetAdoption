import {IImage} from './image.interface';
import {ICharacter} from './characte.interface';

export interface IAnimal {
  id_animal?: number;
  nom?: string;
  age?: number;
  sexe?: string;
  histoire?: string;
  couleur?: string;
  caractere?: string;
  idEspece?: number;
  adopte?: string;
  idRace?: number;
  image?: IImage[];
  character?: ICharacter[];
}

