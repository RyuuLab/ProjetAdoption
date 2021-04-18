import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {SiteDataService} from '../shared/services/site-data.service';
import {FormBuilder, Validators} from '@angular/forms';
import {UserService} from '../shared/services/user.service';
import {AuthService} from '../shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;
  editPassword: boolean = false;
  btnEditPenName: boolean = false;
  btnEditMail: boolean = false;
  btnEditPersonnalInformations = false;
  @ViewChild('password') password: ElementRef;
  @ViewChild('penName') penName: ElementRef;
  @ViewChild('mail') mail: ElementRef;
  @ViewChild('firstName') firstName: ElementRef;
  formUser: any;
  formPersonalInformations: any;

  constructor(private titleService: Title,
              private route: ActivatedRoute,
              private siteDataService: SiteDataService,
              private formBuilder: FormBuilder,
              private userService: UserService
  ) {
    this.siteDataService.changeTitle(titleService, route);
    this.user = this.userService.user;
    this.formUser = this.formBuilder.group({
      penName: [''],
      mail: [''],
      password: [''],
      confirmPassword: [''],
    });
    this.formPersonalInformations = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      address: [''],
      city: [''],
      zipCode: ['']
    });
  }

  ngOnInit(): void {
  }

  toChangeImage() {

  }

  openEditPassword() {
    this.editPassword = true;
    setTimeout(() => this.password.nativeElement.focus());
  }

  savePassword() {
    console.warn('You have savePassword', this.formUser.value.password);
  }

  cancelPassword() {
    this.editPassword = false;
  }

  openEditPenName() {
    this.btnEditPenName = true;
    setTimeout(() => this.penName.nativeElement.focus());
  }

  savePenName() {
    console.warn('You have savePenName', this.formUser.value.penName);
    this.btnEditPenName = false;
  }

  cancelPenName() {
    this.btnEditPenName = false;
  }

  openEditMail() {
    this.btnEditMail = true;
    setTimeout(() => this.mail.nativeElement.focus());
  }

  saveMail() {
    console.warn('You have saveMail', this.formUser.value.mail);
    this.btnEditMail = false;
  }

  cancelMail() {
    this.btnEditMail = false;
  }

  openEditPersonnaleInformations() {
    this.btnEditPersonnalInformations = true;
    setTimeout(() => this.firstName.nativeElement.focus());
  }

  cancelPersonnaleInformations() {
    this.btnEditPersonnalInformations = false;
    this.firstName.nativeElement.disable();
  }

  savePersonnaleInformations() {
    console.warn('You have savePersonnaleInformations', this.formPersonalInformations.value);
    this.btnEditPersonnalInformations = false;
  }
}
