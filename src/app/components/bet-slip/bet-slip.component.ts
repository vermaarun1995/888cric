import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map } from 'rxjs';
import { ResponseModel } from 'src/app/models/responseModel';
import { StackLimit } from 'src/app/models/stackLimit';
import { HttpService } from 'src/app/services/http.service';
import { LoaderService } from 'src/app/services/loader.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SessionService } from 'src/app/services/session.service';
import { betData } from '../fullmarket/match-odds/match-odds.component';


@Component({
  selector: 'app-bet-slip',
  templateUrl: './bet-slip.component.html',
  styleUrls: ['./bet-slip.component.scss']
})
export class BetSlipComponent implements OnInit, OnChanges {

  @Input() sportId?: number;
  @Input() stackLimitList: StackLimit[] = [];
  @Input() setBetData?: betData;
  @Input() isUserLogin?: boolean;
  @Input() inPlay?: boolean;
  @Output() closeBetSlip = new EventEmitter<any>();


  userId: number = this.sessionService.getLoggedInUser() ? this.sessionService.getLoggedInUser().id : 0;

  profitLossPrice: number = 0;
  amountStake: number = 0;
  oddsRequest: number = 0;

  constructor(private service: HttpService, private fb: FormBuilder, private loaderService : LoaderService, private sessionService: SessionService, private notification: NotificationService,) {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.amountStake = this.setBetData?.amountStake ? this.setBetData.amountStake : 0;
    this.oddsRequest = this.setBetData?.oddsRequest ? this.setBetData.oddsRequest : 0;
    // if(this.setBetData?.betPrice){
    //   this.placeBetData.betPrice = this.setBetData.betPrice;
    // }
    // if(this.setBetData?.batName){
    //   this.placeBetData.batName = this.setBetData.batName;
    // }
  }


  ngOnInit(): void {

  }

  amountStakeChange(event: any) {
    this.amountStake = event;
    this.setBidPriceData(this.amountStake);
  }

  setBidPriceData(stackAmount?: number) {
    this.amountStake = stackAmount ? stackAmount : 0;
    this.profitLossPrice = (this.oddsRequest * this.amountStake) - this.amountStake

  }

  changeBetPrice(type: string) {
    // if (type == 'plus') {
    //   if (this.placeBetData.betPrice > 20) {
    //     this.placeBetData.betPrice += 1;
    //   } else if (this.placeBetData.betPrice > 10) {
    //     this.placeBetData.betPrice = this.placeBetData.betPrice + 0.5;
    //   } else {
    //     this.placeBetData.betPrice = this.placeBetData.betPrice + 0.2;
    //   }
    // }
    // if (type == 'minus') {
    //   if (this.placeBetData.betPrice > 1) {
    //     if (this.placeBetData.betPrice > 20) {
    //       this.placeBetData.betPrice -= 1;
    //     } else if (this.placeBetData.betPrice > 10) {
    //       this.placeBetData.betPrice = this.placeBetData.betPrice - 0.5;
    //     } else {
    //       this.placeBetData.betPrice = this.placeBetData.betPrice - 0.2;
    //     }
    //   }
    // }
    // this.placeBetData.betPrice = parseFloat(this.placeBetData.betPrice.toFixed(2))
  }

  saveMatchOdds() {

    if (!this.isUserLogin) {
      return;
    }
    let placeBetData = {
      "id": 0,
      "sportId": Number(this.sportId),
      "EventId": Number(this.setBetData?.EventId),
      "event": this.setBetData?.event,
      "MarketId": this.setBetData?.MarketId,
      "market": this.setBetData?.market,
      "selection": this.setBetData?.selection,
      "OddsType": this.setBetData?.OddsType,
      "type": this.setBetData?.type,
      "oddsRequest": this.setBetData?.oddsRequest,
      "amountStake": this.amountStake,
      "betType": this.setBetData?.betType,
      "isSettlement": this.setBetData?.isSettlement,
      "userId": this.userId,
      "SelectionId": this.setBetData?.selectionId
    };

    this.service.post('BetApi/SaveBets', placeBetData)
      .subscribe((response: ResponseModel) => {
        if (response.isSuccess == true) {
          alert(response.message);
          //this.notification.showSuccess(response.message);
          //this.closeOrderRow();
          //this.getBackLayAmount();
          //this.betService._getBetData.next(this.betService.getMarketList());
        } else {
          alert(response.message);
          //this.notification.showError(response.message);
        }
        this.loaderService.isLoading.next(false);
      });
  }

  closeWindow() {
    this.closeBetSlip.emit(true);
  }

}
