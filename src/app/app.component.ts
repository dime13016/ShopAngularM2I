import { Component } from '@angular/core';
import {User} from "./model/User";
import {AuthenticationService} from "./authentication.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userLogin:User = {userName: "", password:""};

  currentUser:User;

  constructor(private authenticationService:AuthenticationService, private modalService:NgbModal,
              private router: Router) {
    this.currentUser = authenticationService.getCurrentUser();
  }

  login() {
    this.authenticationService.login(this.userLogin).subscribe(
        user => {
          if (user) {
            this.currentUser = user;
            this.modalService.dismissAll();
          }
        }
    );
  }

  logout() {
    this.authenticationService.logout();
    this.currentUser = null;
    this.router.navigate(['/']);
  }

  openModal(modal) {
    this.modalService.open(modal);
  }


}
