import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { ResponseModel } from 'src/app/models/responseModel';
import { SessionService } from 'src/app/services/session.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-open-bets',
  templateUrl: './open-bets.component.html',
  styleUrls: ['./open-bets.component.scss']
})
export class OpenBetsComponent implements OnInit {

  @Input() eventId?: number;
  userId: number = this.sessionService.getLoggedInUser() ? this.sessionService.getLoggedInUser().id : 0;
  betListData: BetData[] = [];
  
  
  constructor(private activatedRoute: ActivatedRoute, private service: HttpService, private sessionService: SessionService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(paramsId => {
      this.eventId = this.eventId ? this.eventId : paramsId["eventId"];
      this.getOpenBetList();
    });
  }

  getOpenBetList() {
    debugger;
    this.service.get(`Common/GetOpenBetList?UserId=${this.userId}&EventId=${this.eventId}`)
      .subscribe((response: ResponseModel) => {
        if (response.isSuccess == true && response.data != null) {
          this.betListData.length = 0;
          this.betListData.push(...response.data);
        }
      });
  }

}

interface BetData {
  id: number,
  betId: string,
  sportId: number,
  eventId: number,
  event: string,
  marketId: number,
  market: string,
  selectionId: number,
  selection: string,
  oddsType: number,
  type: string,
  oddsRequest: number,
  amountStake: number,
  betType: number,
  placeTime: Date,
  matchedTime: Date,
  settleTime: Date,
  isSettlement: number,
  status: boolean,
  userId: number,
  updatedBy: any,
  updatedDate: any,
  resultType: any,
  resultAmount: number
}