import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {SiteDataService} from '../shared/services/site-data.service';
import {UserService} from '../shared/services/user.service';
import {IUser} from '../shared/interfaces/user.interface';
import {Subscription} from 'rxjs';
import {FormBuilder, Validators} from '@angular/forms';
import {FormService} from '../shared/services/form.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AnimalService} from '../shared/services/animal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  title = this.siteDataService.title;
  user: IUser;
  numberStory: number;
  userSubscription: Subscription;
  isAdmin: boolean;
  formAdopt: any;
  countAnimals: number;

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private router: Router,
    private siteDataService: SiteDataService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private formService: FormService,
    private modalService: NgbModal,
    private animalService: AnimalService
  ) {
    this.siteDataService.changeTitle(titleService, route);
    this.formAdopt = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mail: ['', Validators.required],
      tel: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.user = this.userService.user;
    this.verifAdmin();
    this.userSubscription = this.userService.userLoad.subscribe(
      user => {
        this.user = user;
        this.verifAdmin();
      }
    );
    this.animalService.getCountAnimals().subscribe(
      data => {
        this.countAnimals = data;
      }
    );
  }


  toProfile() {
    console.log('to profile');
    this.router.navigate(['profil']);
  }

  toAdmin() {
    console.log('to contacts');
    this.router.navigate(['menu-admin']);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  toSpecies() {
    this.router.navigate(['liste-especes']);
  }

  toInfo(modalAdopt: TemplateRef<any>) {
    this.modalService.open(modalAdopt, {centered: true});
  }

  sendFormAdopt(modal: any) {
    this.formService.toCreateForm({
      nom: this.formAdopt.value.firstName,
      prenom: this.formAdopt.value.lastName,
      mail: this.formAdopt.value.mail,
      tel: this.formAdopt.value.tel,
      message: this.formAdopt.value.message
    }).subscribe(
      data => {
        console.log(data);
        modal.close();
      }
    );
  }

  verifAdmin() {
    if (this.user) {
      if (this.user.username === 'admin') {
        this.isAdmin = true;
        console.log(this.isAdmin);
      }
    }
    else {
      this.isAdmin = false;
    }
  }
}
