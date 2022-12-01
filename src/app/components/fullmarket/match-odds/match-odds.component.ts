import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/models/responseModel';
import { StackLimit } from 'src/app/models/stackLimit';
import { AuthService } from 'src/app/services/auth.service';
import { BetService } from 'src/app/services/getBet.service';
import { HttpService } from 'src/app/services/http.service';
import { LoaderService } from 'src/app/services/loader.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-match-odds',
  templateUrl: './match-odds.component.html',
  styleUrls: ['./match-odds.component.scss']
})
export class MatchOddsComponent implements OnInit {

  @Input() sportId?: number;
  @Input() matchOddsData?: any[];
  @Input() isUserLogin?: boolean;
  @Input() inPlay?: boolean;
  @Input() marketId?: number;
  userId: number = this.sessionService.getLoggedInUser() ? this.sessionService.getLoggedInUser().id : 0;

  @ViewChild('stackAmountEle') stackAmountEle?: ElementRef;
  @ViewChild('oddRequestEle') oddRequestEle?: ElementRef;
  @ViewChild('acc') getNgbAccordion?: NgbAccordion;


  stackData?: Observable<StackLimit[]>;
  stackLimitList: StackLimit[] = [];

  OldBidData: any[] = [];
  BidData: any[] = [];
  BidDataNew: any[] = [];

  exEventId?: number;
  selectionId: number = 0;
  selectedIndex?: number;
  betType?: number;
  selectedValue?: number;
  runnerName?: string;


  bidPriceInput: number = 0;
  bidOddPrice: number = 0;
  oddBook: boolean = false;

  constructor(
    private service: HttpService,
    private sessionService: SessionService,
    private notification: NotificationService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private betService: BetService,
    private loaderService: LoaderService
  ) {
    this.authService._isLoginUser.subscribe((res) => this.isUserLogin = res);
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  closeBetSlipType($event:boolean){
    if($event === true){
      this.getNgbAccordion?.collapse("toggle-1");
    }
  }

  setBetData?: betData;

  setBetPrice(EventId :number, event:string, MarketId:number, market:string, selection:string, selectionId:number, type:number,oddsRequest:number, amountStake:number, betType:number){
    this.setBetData = {
      sportId: this.sportId,
      EventId: EventId,
      event: event,
      MarketId: MarketId,
      market: market,
      selection: selection,
      selectionId: selectionId,
      OddsType: 1,
      type: type ? 'lay' : 'back',
      oddsRequest: oddsRequest,
      amountStake: amountStake,
      betType: betType,
      isSettlement: 2
    }   
  }

  getBackLayAmount() {
    this.service.get(`BetApi/GetBackAndLayBetAmount?UserId=${this.userId}&marketId=${this.marketId}&SportId=${this.sportId}`)
      .subscribe((response: ResponseModel) => {
        if (response.isSuccess == true && response.data != null) {
          this.BidData = JSON.parse(response.data);
          this.BidDataNew = JSON.parse(JSON.stringify(this.BidData));
        }
      });
  }

  ngOnInit() {
    this.service.get('Setting/GetStakeLimit').subscribe(res =>{
      if(res.data != null && res.isSuccess == true){
        this.stackLimitList = res.data;
      }
    });

    this.activatedRoute.params.subscribe(paramsId => {
      this.sportId = this.sportId ? this.sportId : paramsId["sportId"];
      this.marketId = this.marketId ? this.marketId : paramsId["marketId"];
      this.getBackLayAmount();
    });


  }


}


export interface betData {
  sportId?: number;
  EventId?: number;
  event?: string;
  MarketId?: number;
  market?: string;
  selection?: string;
  selectionId?: number;
  OddsType?: number;
  type?: string;
  oddsRequest?: number;
  amountStake?: number;
  betType?: number;
  isSettlement?: number;
}

