import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {UserService} from '../shared/services/user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.scss']
})
export class MenuAdminComponent implements OnInit {
  changeTemplate: boolean;
  formSave: FormGroup;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
    if (!this.userService.isAdmin) {
      this.router.navigate(['accueil']);
    }
  }

  ngOnInit(): void {
    this.changeTemplate = true;
  }

  saveForm(event: FormGroup) {
    this.formSave = event;
  }
}
