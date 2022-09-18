import { Component, OnInit } from '@angular/core';
import { ResponseModel } from 'src/app/models/responseModel';
import { SportList } from 'src/app/models/sportList';
import { HttpService } from 'src/app/services/http.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-sport-header',
  templateUrl: './sport-header.component.html',
  styleUrls: ['./sport-header.component.scss']
})
export class SportHeaderComponent implements OnInit {

  constructor(private service : HttpService, private loaderService : LoaderService) { }

  sidebarList : SportList[] = [];

  getSportList(): void {
    this.service.get('exchange/GetSports')
    .subscribe((res:ResponseModel) => {
      if(res.data != null && res.isSuccess == true){
        this.sidebarList.push(...res.data);
      }
    });
  }

  ngOnInit(): void {
    this.getSportList();
  }

}
