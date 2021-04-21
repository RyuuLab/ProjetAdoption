import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {UserService} from '../shared/services/user.service';
import {PasswordValidator} from '../shared/validators/password.validator';
import {TokenStorageService} from '../shared/services/token-storage.service';
import {AuthService} from '../shared/services/auth.service';
import {ErrorMessage} from '@angular/compiler-cli/ngcc/src/execution/cluster/api';
import {ErrorMessageService} from '../shared/tools/error-message.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {
  @Input() isModal: number;
  @Input() modal: any;
  @Input() form: any;
  @Input() modalCompleted;
  formSignIn: any;
  formSignUp: any;
  formForgetPassword: any;
  sizeOfFormSignIn: number;
  sizeOfFormSignUp: number;
  sizeOfFormForgetPassword: number;
  colorProgressBar: string;
  errorMessage: string;
  successMessage: string;


  constructor(
    private tokenStorageService: TokenStorageService,
    private authService: AuthService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private passwordValidator: PasswordValidator,
    private errorMessageService: ErrorMessageService
  ) {
    this.formSignIn = this.formBuilder.group({
      penName: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]],
      mail: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
      confirmPassword: ['', []],
    });
    this.formSignUp = this.formBuilder.group({
      identifiant: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      passwordToConnect: ['', [
        Validators.required,
        Validators.minLength(6)
      ]]
    });
    this.formForgetPassword = this.formBuilder.group({
      identifiantOrMail: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
    });

    this.formSignIn.controls['confirmPassword'].setValidators(
      [Validators.required, PasswordValidator.confirmPasswordValidator(this.password)]);
    this.sizeOfFormSignIn = Object.keys(this.formSignIn.controls).length;
    this.sizeOfFormSignUp = Object.keys(this.formSignUp.controls).length;
    this.sizeOfFormForgetPassword = Object.keys(this.formForgetPassword.controls).length;
  }

  ngOnInit(): void {
    this.confirmFrom(this.formSignIn, this.sizeOfFormSignIn);
    this.confirmFrom(this.formSignUp, this.sizeOfFormSignUp);
    this.confirmFrom(this.formForgetPassword, this.sizeOfFormForgetPassword);
  }

  openFromOtherModal(isModal: number) {
    this.modalCompleted = 0;
    this.colorProgressBar = '';
    this.errorMessage = '';
    this.successMessage = '';
    this.isModal = isModal;
    this.formSignIn.reset();
    this.formSignUp.reset();
    this.formForgetPassword.reset();
  }

  onRegister() {
    if (this.formSignIn.valid) {
      this.authService.register(this.penName.value, this.mail.value, this.password.value).subscribe(
        data => {
          console.log(data);
          this.errorMessage = '';
          this.successMessage = 'Votre compte a été créé.';
          this.formSignIn.reset();
        },
        err => {
         this.errorMessage = this.errorMessageService.errorMessage(err.error.message);
        }
      );
    }
  }

  onConnect() {
    this.authService.login(this.identifiant.value, this.passwordToConnect.value).subscribe(
      data => {
        console.log('test');
        this.tokenStorageService.saveToken(data.accessToken);
        this.tokenStorageService.saveUser(data);
        this.userService.getUser();
        this.formSignUp.reset();
        this.modal.close();
      },
      err => {
        this.errorMessage = 'l\'identifiant ou le mot de passe incorrect.';
      }
    );
  }

  onForgetPassword() {
    console.warn('Mail send for reset password', this.formForgetPassword.value);
    this.formForgetPassword.reset();
  }

  get penName() { return this.formSignIn.get('penName'); }
  get mail() { return this.formSignIn.get('mail'); }
  get password() { return this.formSignIn.get('password'); }
  get confirmPassword() { return this.formSignIn.get('confirmPassword'); }
  get identifiant() { return this.formSignUp.get('identifiant'); }
  get passwordToConnect() { return this.formSignUp.get('passwordToConnect'); }
  get identifiantOrMail() { return this.formForgetPassword.get('identifiantOrMail'); }


  private confirmFrom(form: any, sizeOfForm: number) {
    form.statusChanges.subscribe(
      result => {
        let totalValid = 0;
        Object.keys(form.controls).forEach(key => {
          (form.get(key).valid ? totalValid++ : '');
        });
        this.modalCompleted = Math.round(totalValid / sizeOfForm * 100);
        this.colorProgressBar = (this.modalCompleted === 100 ? 'bg-success' : '');

      }
    );
  }
}
