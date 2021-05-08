import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {

  errorMessage(errorMessage: string) {
    console.log(errorMessage);
    switch (errorMessage) {
      case 'Error: Username is already taken!':
        return 'Le pseudo est déjà utilisé.';
        break;
      case 'Error: Email is already in use!':
        return 'Le mail déjà utilisé.';
        break;
      default:
        return 'Une erreur s\'est produite, veuillez réessayer.';
        break;
    }
  }
}
