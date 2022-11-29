import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SessionService } from 'src/app/services/session.service';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { ResponseModel } from 'src/app/models/responseModel';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, private sessionService: SessionService, private router: Router, private service: HttpService) { }

  isLoginUser: boolean = false;
  loginUserName: string = "";
  openingBalance : number = 0;

  ngOnInit(): void {
    this.authService._isLoginUser.subscribe(
      (res) => {
        this.isLoginUser = res;
        if (res && this.sessionService.getLoggedInUser() !== null && this.sessionService.getLoggedInUser().id > 0) {
           this.loginUserName = this.sessionService.getLoggedInUser().fullName;
          // this.loginExposureLimit = this.sessionService.getLoggedInUser().exposureLimit;
          // this.loginBalance = this.sessionService.getLoggedInUser().assignCoin;
        }
      }
    )
  }

  getOpeningBalance() : void {
    let userId = this.sessionService.getLoggedInUser().id;
    this.service.get(`Account/GetOpeningBalance?UserId=${userId}`)
      .subscribe((response:ResponseModel) => {
        if(response.isSuccess == true && response.data != null){
          this.openingBalance = response.data;
        }
      });
  }

  userLogout(){
    this.authService.logout();
    this.router.navigateByUrl('/login');
    this.authService._isLoginUser.next(false);
  }

}
