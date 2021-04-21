import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {SiteDataService} from '../shared/services/site-data.service';
import {FormBuilder, Validators} from '@angular/forms';
import {UserService} from '../shared/services/user.service';
import {AuthService} from '../shared/services/auth.service';
import {PasswordValidator} from '../shared/validators/password.validator';
import {ErrorMessageService} from '../shared/tools/error-message.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: any;
  editPassword: boolean = false;
  btnEditPenName: boolean = false;
  btnEditMail: boolean = false;
  btnEditPersonnalInformations = false;
  formUser: any;
  formPersonalInformations: any;
  sizeOfFormUser: number;
  errorMessage: string;
  successMessage: string;
  userSubscription: Subscription;
  isLoading: boolean = false;
  @ViewChild('password') password: ElementRef;
  @ViewChild('penName') penName: ElementRef;
  @ViewChild('mail') mail: ElementRef;
  @ViewChild('firstName') firstName: ElementRef;

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private siteDataService: SiteDataService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private errorMessageService: ErrorMessageService
  ) {
    this.siteDataService.changeTitle(titleService, route);
    this.user = this.userService.user;
    this.formUser = this.formBuilder.group({
      penName: [this.user.username, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]],
      mail: [this.user.email, [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
      confirmPassword: [''],
    });
    this.formPersonalInformations = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      address: [''],
      city: [''],
      zipCode: ['']
    });
    this.formUser.controls['confirmPassword'].setValidators(
      [Validators.required, PasswordValidator.confirmPasswordValidator(this.passwordF)]);
    this.sizeOfFormUser = Object.keys(this.formUser.controls).length;
  }

  ngOnInit(): void {
    this.userSubscription = this.userService.userLoad.subscribe(
      user => {
        this.user = user;
      }
    );
  }

  toChangeImage() {}

  openEditPassword() {
    this.editPassword = true;
    setTimeout(() => this.password.nativeElement.focus());
  }

  savePassword() {
    this.resetMessage();
    this.isLoading = true;
    this.userService.changePassword({
      id_user: this.user.id_user,
      username: this.user.username,
      email: this.user.email,
      password: this.formUser.value.password
    }).subscribe(
      data => {
        console.log(data);
        this.successMessage = 'Votre mot de passe a été changé.';
        this.formUser.controls['password'].setValue('');
        this.formUser.controls['confirmPassword'].setValue('');
        this.deleteSuccessMessage();
        this.isLoading = false;
      },
      err => {
        console.log(err);
        this.errorMessage = this.errorMessageService.errorMessage('');
        this.deleteErrorMessage();
        this.isLoading = false;
      }
    );
    this.editPassword = false;
  }

  cancelPassword() {
    this.editPassword = false;
    this.formUser.controls['password'].setValue('');
    this.formUser.controls['confirmPassword'].setValue('');
  }

  openEditPenName() {
    this.btnEditPenName = true;
    setTimeout(() => this.penName.nativeElement.focus());
  }

  savePenName() {
    this.resetMessage();
    this.isLoading = true;
    this.userService.changeUsername({
      id_user: this.user.id_user,
      username: this.formUser.value.penName,
      email: this.user.email,
    }).subscribe(
      data => {
        console.log(data);
        this.userService.user.username = this.formUser.value.penName;
        this.userService.updateUser();
        this.successMessage = 'Votre nom de plume a été changé.';
        this.deleteSuccessMessage();
        this.isLoading = false;
        this.btnEditPenName = false;
      },
      err => {
        console.log(err);
        this.errorMessage = this.errorMessageService.errorMessage(err.error.message);
        this.deleteErrorMessage();
        this.isLoading = false;
        setTimeout(() => this.penName.nativeElement.focus());
      }
    );

  }

  cancelPenName() {
    this.btnEditPenName = false;
    this.formUser.get('penName').setValue(this.userService.user.username);
  }

  openEditMail() {
    this.btnEditMail = true;
    setTimeout(() => this.mail.nativeElement.focus());
  }

  saveMail() {
    this.resetMessage();
    this.isLoading = true;
    console.log(this.formUser.value.mail);
    this.userService.changeMail({
      id_user: this.user.id_user,
      username: this.user.username,
      email: this.formUser.value.mail,
    }).subscribe(
      data => {
        console.log(data);
        this.userService.user.email = this.formUser.value.mail;
        this.userService.updateUser();
        this.successMessage = 'Votre adresse mail a été changé.';
        this.deleteSuccessMessage();
        this.isLoading = false;
        this.btnEditMail = false;
      },
      err => {
        console.log(err);
        this.errorMessage = this.errorMessageService.errorMessage(err.error.message);
        this.deleteErrorMessage();
        this.isLoading = false;
        setTimeout(() => this.mail.nativeElement.focus());
      }
    );
  }

  cancelMail() {
    this.btnEditMail = false;
    this.formUser.get('mail').setValue(this.userService.user.email);
  }

  openEditPersonnaleInformations() {
    this.btnEditPersonnalInformations = true;
    setTimeout(() => this.firstName.nativeElement.focus());
  }

  cancelPersonnaleInformations() {
    this.btnEditPersonnalInformations = false;
  }

  savePersonnaleInformations() {
    console.warn('You have savePersonnaleInformations', this.formPersonalInformations.value);
    this.btnEditPersonnalInformations = false;
  }

  get penNameF() { return this.formUser.get('penName'); }
  get mailF() { return this.formUser.get('mail'); }
  get passwordF() { return this.formUser.get('password'); }
  get confirmPasswordF() { return this.formUser.get('confirmPassword'); }

  deleteSuccessMessage() {
    setTimeout(() => {
      this.successMessage = '';
    }, 4000);
  }

  deleteErrorMessage() {
    setTimeout(() => {
      this.errorMessage = '';
    }, 12000);
  }

  resetMessage() {
    this.errorMessage = '';
    this.successMessage = '';
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
