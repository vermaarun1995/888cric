import { Component, OnInit } from '@angular/core';
import { NgbNavConfig } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-inplay',
  templateUrl: './inplay.component.html',
  styleUrls: ['./inplay.component.scss']
})
export class InplayComponent implements OnInit {

  constructor(private service: HttpService, config: NgbNavConfig) {
    config.destroyOnHide = false;
    config.roles = false;
  }

  inplayData: any;
  todayData: any;
  tomorrowData: any;


  getInPlayData = (data?: any[]) => {
    if (data && data.length > 0) {
      return Array(
        {
          "sportName": "Soccer",
          "oddsData": data.filter((x) => { return x.eid == "1" })
        },
        {
          "sportName": "Tennis",
          "oddsData": data.filter((x) => { return x.eid == "2" })
        },
        {
          "sportName": "Cricket",
          "oddsData": data.filter((x) => { return x.eid == "4" })
        }
      )
    }
    return [];
  }

  ngOnInit(): void {
    this.service.get('exchange/GetInPlaySportEvents').subscribe(res => {
      if (res != null) {
        this.inplayData = this.getInPlayData(res.data.sportsEventModelInPlay);
      } else {
        this.inplayData = [];
      }
    })
  }

}
