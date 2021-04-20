import { Component, OnInit } from '@angular/core';
import {DomSanitizer, Title} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ValeurService} from '../shared/services/valeur.service';
import {AnimalService} from '../shared/services/animal.service';
import {ImageService} from '../shared/services/image.service';
import {IAnimal} from '../shared/interfaces/animal.interface';
import {forkJoin} from 'rxjs';
import {CommentService} from '../shared/services/comment.service';
import {RespCommentService} from '../shared/services/resp-comment.service';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.scss']
})
export class AnimalComponent implements OnInit {
  animal: IAnimal;
  comment = false;
  comments = [false, false];
  textarea = ['', ''];
  username = ['', ''];
  formAdopt: any;
  animalId: number;
  isLoading: boolean;
  constructor(  private titleService: Title,
                private route: ActivatedRoute,
                private formBuilder: FormBuilder,
                private modalService: NgbModal,
                private valeurService: ValeurService,
                private animalService: AnimalService,
                private imageService: ImageService,
                private sanitizer: DomSanitizer,
                private commentService: CommentService,
                private respCommentService: RespCommentService
  ) {
    this.formAdopt = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      tel: [''],
      address: [''],
      city: [''],
      zipCode: [''],
      appartOrMaison: [''],
      jardin: ['']
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.animalId = +this.route.snapshot.paramMap.get('animalId');
    this.getAnimal();
  }

  sendComment(username: any, textarea: any) {
    console.log(username);
    console.log(textarea);
    this.commentService.toCreate({
      idAnimal: this.animalId,
      username,
      commentaire: textarea
    }).subscribe(
      data => {
        console.log(data);
      }
    );
  }


  sendResComment(username: any, textarea: any) {
    console.log(username);
    console.log(textarea);
    this.respCommentService.toCreate({
      idCommentaire: 2,
      idAnimal: this.animalId,
      username,
      reponseCom: textarea
    }).subscribe(
      data => {
        console.log(data);
      }
    );
  }

  sendFormAdopt(modal: any) {
    console.log(this.formAdopt);
    modal.close();
  }

  openModalFormAdopt(modalAdopt) {
    this.modalService.open(modalAdopt, { centered: true });
  }

  transform(imageBase64: string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(imageBase64);
  }

  getAnimal() {
    forkJoin({
      animal:  this.animalService.getAllByAnimal(this.animalId),
      animalChara: this.valeurService.getByAnimal(this.animalId),
      animalImage:  this.imageService.getImageByIdAnimal(this.animalId)
    }).subscribe( data => {
      this.animal = data.animal;
      this.animal.character = data.animalChara;
      this.animal.image = data.animalImage;
      this.isLoading = false;
    });
    }
}
