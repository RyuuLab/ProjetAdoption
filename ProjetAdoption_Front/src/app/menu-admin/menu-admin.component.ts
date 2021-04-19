import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.scss']
})
export class MenuAdminComponent implements OnInit {
  changeTemplate: boolean;
  formSave: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.changeTemplate = true;
  }

  saveForm(event: FormGroup) {
    this.formSave = event;
  }
}
