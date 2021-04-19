import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {ProfileComponent} from './profile/profile.component';
import {AuthGuard} from './shared/services/auth-guard';
import {AddAnimalComponent} from './add-animal/add-animal.component';
import {AdminCustomComponent} from './admin-custom/admin-custom.component';
import {MenuAdminComponent} from './menu-admin/menu-admin.component';
import {SpeciesListComponent} from './species-list/species-list.component';
import {AnimalListComponent} from './animal-list/animal-list.component';
import {AnimalComponent} from './animal/animal.component';

const routes: Routes = [
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: 'accueil', component: HomeComponent, data: {title: 'Accueil'}  },
  { path: 'profil', component: ProfileComponent, data: {title: 'Profil'}  },
  { path: 'ajouter-animal', component: AddAnimalComponent, data: {title: 'Ajouter un animal'}  },
  { path: 'admin-custom', component: AdminCustomComponent, data: {title: 'Admin custom'}  },
  { path: 'menu-admin', component: MenuAdminComponent, data: {title: 'Menu admin'}  },
  { path: 'liste-especes', component: SpeciesListComponent, data: {title: 'Liste d\'especes'}  },
  { path: 'liste-animaux/:specieId', component: AnimalListComponent, data: {title: 'Liste d\'animaux'}  },
  { path: 'animal', component: AnimalComponent, data: {title: 'Animal'}  },
  { path: 'page-introuvable', component: PageNotFoundComponent, data: {title: 'Page introuvable'} },
  { path: '**', redirectTo: 'page-introuvable', pathMatch: 'full'}
  // { path: 'profil', component: ProfileComponent, canActivate: [AuthGuard], data: {title: 'Profil'}  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
