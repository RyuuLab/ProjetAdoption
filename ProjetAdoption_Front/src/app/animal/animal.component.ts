import { Component, OnInit } from '@angular/core';
import {DomSanitizer, Title} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ValeurService} from '../shared/services/valeur.service';
import {AnimalService} from '../shared/services/animal.service';
import {ImageService} from '../shared/services/image.service';
import {IAnimal} from '../shared/interfaces/animal.interface';
import {forkJoin} from 'rxjs';
import {CommentService} from '../shared/services/comment.service';
import {RespCommentService} from '../shared/services/resp-comment.service';
import {DatePipe, formatDate} from '@angular/common';
import {FormService} from '../shared/services/form.service';
import {IImage} from '../shared/interfaces/image.interface';
import {IRace} from '../shared/interfaces/race.interface';
import {RaceService} from '../shared/services/race.service';
import {UserService} from '../shared/services/user.service';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.scss']
})
export class AnimalComponent implements OnInit {
  animal: IAnimal;
  comment = false;
  comments = [false, false];
  textarea = [];
  username = [];
  images = [];
  formAdopt: any;
  animalId: number;
  isLoading: boolean;
  usernameAddComment: string;
  textareaAddComment: string;
  isAdmin: boolean;
  isUploadImage: boolean;
  races: IRace[];

  constructor(private titleService: Title,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private modalService: NgbModal,
              private valeurService: ValeurService,
              private animalService: AnimalService,
              private imageService: ImageService,
              private sanitizer: DomSanitizer,
              private commentService: CommentService,
              private respCommentService: RespCommentService,
              private formService: FormService,
              private raceService: RaceService,
              private userService: UserService
 ) {
    this.formAdopt = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mail: ['', Validators.required],
      tel: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required],
      appartOrMaison: ['', Validators.required],
      jardin: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.isAdmin = false;
    this.isLoading = true;
    this.animalId = +this.route.snapshot.paramMap.get('animalId');
    this.getAnimal();
  }

  sendComment(username: any, textarea: any) {
    this.commentService.toCreate({
      idAnimal: this.animalId,
      username,
      commentaire: textarea
    }).subscribe(
      data => {
        this.usernameAddComment = '';
        this.textareaAddComment = '';
        this.comment = false;
        this.commentService.getCommentByIdAnimal(this.animalId).subscribe(
          comments => {
            this.animal.comments = comments;
          }
        );
      }
    );
  }


  sendResComment(username: any, textarea: any, idComment: number) {
    this.respCommentService.toCreate({
      idCommentaire: idComment,
      idAnimal: this.animalId,
      username,
      reponseCom: textarea
    }).subscribe(
      data => {
        this.animal.comments.find(
        comment => comment.id_commentaire === idComment).tabReponse = data;
        this.username[idComment] = '';
        this.textarea[idComment] = '';
        this.comments[idComment] = false;
      }
    );
  }

  sendFormAdopt(modal: any) {
    this.formService.toCreate({
      nom : this.formAdopt.value.firstName,
      prenom : this.formAdopt.value.lastName,
      mail : this.formAdopt.value.mail,
      telephone : this.formAdopt.value.tel,
      adresse : this.formAdopt.value.address + ', ' + this.formAdopt.value.city + ', ' + this.formAdopt.value.zipCode,
      habitat : this.formAdopt.value.appartOrMaison,
      jardin : this.formAdopt.value.jardin
    }).subscribe(
        data => {
          modal.close();
        }
    );
  }

  openModalFormAdopt(modalAdopt) {
    this.modalService.open(modalAdopt, {centered: true});
  }

  transform(imageBase64: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(imageBase64);
  }

  getAnimal() {
    forkJoin({
      animal: this.animalService.getAllByAnimal(this.animalId),
      animalChara: this.valeurService.getByAnimal(this.animalId),
      animalImage: this.imageService.getImageByIdAnimal(this.animalId),
      animalComment: this.commentService.getCommentByIdAnimal(this.animalId)
    }).subscribe(data => {
      this.animal = data.animal;
      this.animal.character = data.animalChara;
      this.animal.image = data.animalImage;
      this.animal.comments = data.animalComment;
      this.animal.comments.forEach(comment => comment.date_creation = formatDate(comment.date_creation, 'dd/MM/yyyy hh:mm', 'en-US'));
      this.animal.comments.forEach(comment => comment.tabReponse.forEach(
        respComment => respComment.date_creation =  formatDate(respComment.date_creation, 'dd/MM/yyyy hh:mm', 'en-US')));
      this.isLoading = false;
      while (this.isUploadImage) {
        console.log(this.isUploadImage);
        this.isUploadImage = false;
        console.log('done');
      }
      this.verifAdmin();
      console.log('getAnimal');
    });
  }

  verifAdmin() {
    if (this.userService.isAdmin) {
      this.isAdmin = this.userService.isAdmin;
      this.getRaces(this.animal.idEspece);
    }
  }

  updateAnimal() {
    this.isUploadImage = true;
    if (this.images.length > 0) {
      const images: IImage[] = [];
      this.images.forEach(element =>
        images.push({
          idAnimal: this.animalId,
          image: element
        })
      );
      this.imageService.toCreate(images).subscribe(
        image => {
          this.isUploadImage = true;
          this.getAnimal();
          this.images = [];
          if (this.animal.character.length > 0) {
            this.valeurService.toCreate(this.animal.character).subscribe(
              valeur => {
                this.animalService.toUpadte(this.animal).subscribe(
                  data => {
                    this.getAnimal();
                  }
                );
              },
              err => {
                console.log(err);
              }
            );
          } else {
            this.animalService.toUpadte(this.animal).subscribe(
              data => {
                this.getAnimal();
              }
            );
          }
        },
        err => {
          console.log(err);
        }
      );
    } else {
      if (this.animal.character.length > 0) {
        console.log('coucou');
        this.valeurService.toUpdate(this.animal.character).subscribe(
          valeur => {
            this.animalService.toUpadte(this.animal).subscribe(
              data => {
                this.getAnimal();
              }
            );
          },
          err => {
            console.log(err);
          }
        );
      } else {
        this.animalService.toUpadte(this.animal).subscribe(
          data => {
            this.getAnimal();
          }
        );
      }
    }
  }

  removeImgAdd(index: number) {
    this.images.splice(index, 1);
  }

  removeImg(idImage: number) {
    this.imageService.deleteImage(idImage).subscribe(
      data => {
        this.animal.image.splice(this.animal.image.indexOf(this.animal.image.find(image => image.id_image === idImage)), 1);
      }
    );
  }

  onFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      const filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          this.images.push(event.target.result);
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  getRaces(idSpecie: number) {
    this.raceService.getAll(idSpecie).subscribe(
      data => {
        this.races = data;
      },
      err => {
        console.log(err);
      }
    );
  }
}
