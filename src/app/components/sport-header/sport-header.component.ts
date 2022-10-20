import { Component, OnInit } from '@angular/core';
import { ResponseModel } from 'src/app/models/responseModel';
import { SportList } from 'src/app/models/sportList';
import { HttpService } from 'src/app/services/http.service';
import { LoaderService } from 'src/app/services/loader.service';
import { AuthService } from 'src/app/services/auth.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-sport-header',
  templateUrl: './sport-header.component.html',
  styleUrls: ['./sport-header.component.scss']
})
export class SportHeaderComponent implements OnInit {

  constructor(private service : HttpService, private loaderService : LoaderService, private authService: AuthService, private sessionService: SessionService) { }

  sidebarList : SportList[] = [];
  isLoginUser: boolean = false;

  getSportList(): void {
    this.service.get('exchange/GetSports')
    .subscribe((res:ResponseModel) => {
      if(res.data != null && res.isSuccess == true){
        this.sidebarList.push(...res.data);
      }
    });
    this.authService._isLoginUser.subscribe(
      (res) => {
        this.isLoginUser = res;
        // if (res && this.sessionService.getLoggedInUser() !== null && this.sessionService.getLoggedInUser().id > 0) {
        //   // this.loginUserName = this.sessionService.getLoggedInUser().fullName;
        //   // this.loginExposureLimit = this.sessionService.getLoggedInUser().exposureLimit;
        //   // this.loginBalance = this.sessionService.getLoggedInUser().assignCoin;
        // }
      }
    )
  }

  ngOnInit(): void {
    this.getSportList();
  }

}
