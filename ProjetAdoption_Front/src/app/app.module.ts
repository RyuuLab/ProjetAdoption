import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ConnexionComponent } from './connexion/connexion.component';
import { ProfileComponent } from './profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AddAnimalComponent } from './add-animal/add-animal.component';
import { AdminCustomComponent } from './admin-custom/admin-custom.component';
import { MenuAdminComponent } from './menu-admin/menu-admin.component';
import { SpeciesListComponent } from './species-list/species-list.component';
import { AnimalListComponent } from './animal-list/animal-list.component';
import { AnimalComponent } from './animal/animal.component';
import {LoadingSpinnerComponent} from './shared/loading-spinner/loading-spinner.component';
import {FilterPipe} from './shared/tools/filter.pipe';
import { ShareModule } from 'ngx-sharebuttons';

// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    PageNotFoundComponent,
    ConnexionComponent,
    ProfileComponent,
    AddAnimalComponent,
    AdminCustomComponent,
    MenuAdminComponent,
    SpeciesListComponent,
    AnimalListComponent,
    AnimalComponent,
    LoadingSpinnerComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    ShareModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
