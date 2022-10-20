import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  openMenu : boolean = false;

  constructor(private authService: AuthService, private sessionService: SessionService) { }

  isLoginUser: boolean = false;
  ngOnInit(): void {
    this.authService._isLoginUser.subscribe(
      (res) => {
        this.isLoginUser = res;
        //if (res && this.sessionService.getLoggedInUser() !== null && this.sessionService.getLoggedInUser().id > 0) {
          // this.loginUserName = this.sessionService.getLoggedInUser().fullName;
          // this.loginExposureLimit = this.sessionService.getLoggedInUser().exposureLimit;
          // this.loginBalance = this.sessionService.getLoggedInUser().assignCoin;
        //}
      }
    )
  }

}
