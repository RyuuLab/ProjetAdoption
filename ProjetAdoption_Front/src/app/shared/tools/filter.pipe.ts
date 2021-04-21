import { Pipe, PipeTransform } from '@angular/core';
import {IAnimal} from '../interfaces/animal.interface';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
    searchText = searchText.toLowerCase();
    console.log(items);
    return items.filter( it => {
      return it.nom.toLowerCase().includes(searchText) ||
        it.sexe.toLowerCase().includes(searchText) ||
        it.caractere.toLowerCase().includes(searchText) ||
        it.couleur.toLowerCase().includes(searchText) ||
        it.adopte.toLowerCase().includes(searchText) ||
        it.age.toString().includes(searchText) ||
        it.nom_race.toLowerCase().includes(searchText);
    });
  }
}
