import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.scss']
})
export class AnimalComponent implements OnInit {
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  comment = false;
  comments = [false, false];
  textarea = ['', ''];
  username = ['', ''];
  formAdopt: any;
  constructor(  private titleService: Title,
                private route: ActivatedRoute,
                private formBuilder: FormBuilder,
                private modalService: NgbModal) {
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
  }

  sendComment(username: any, textarea: any) {
    console.log(username);
    console.log(textarea);
  }

  sendFormAdopt(modal: any) {
    console.log(this.formAdopt);
    modal.close();
  }

  openModalFormAdopt(modalAdopt) {
    this.modalService.open(modalAdopt, { centered: true });
  }
}
