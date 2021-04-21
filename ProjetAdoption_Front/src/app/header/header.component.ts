import {Component, Input, OnInit, OnDestroy} from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {SiteDataService} from '../shared/services/site-data.service';
import {UserService} from '../shared/services/user.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: any;
  isAuthenticated = false;
  userSubscription: Subscription;
  closeResult: string;
  isModal: number;
  modalCompleted: number;
  title = this.siteDataService.title;
  constructor(private modalService: NgbModal,
              private siteDataService: SiteDataService,
              private userService: UserService,
              private router: Router
  ) {
  }


  ngOnInit(): void {
    this.userSubscription = this.userService.userLoad.subscribe(
      user => {
        this.user = user;
        this.isAuthenticated = !!this.user;
      }
    );
    this.userService.autoSignUp();
  }

  open(content, isModal: number) {
    this.modalCompleted = 0;
    this.isModal = isModal;
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  signOut() {
    this.userService.signOut();
    this.router.navigate(['accueil']);
    console.log(this.isAuthenticated);
    this.isAuthenticated = !this.user;
    this.userService.userLoad.next(null);
  }
}
