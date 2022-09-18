import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { map } from 'rxjs';
import { StackLimit } from 'src/app/models/stackLimit';
import { HttpService } from 'src/app/services/http.service';
import { betData } from '../fullmarket/match-odds/match-odds.component';


@Component({
  selector: 'app-bet-slip',
  templateUrl: './bet-slip.component.html',
  styleUrls: ['./bet-slip.component.scss']
})
export class BetSlipComponent implements OnInit, OnChanges {

  @Input() stackLimitList : StackLimit[] = [];
  @Input() setBetData? : betData;
  @Input() isUserLogin?: boolean;
  @Input() inPlay?: boolean;
  @Output() closeBetSlip = new EventEmitter<any>();

  placeBetData : betData = {
    eventName : "",
    betType : "back",
    batName : "",
    betPrice : 0
  }

  bidStackPrice : number = 0;
  profitLossPrice : number = 0;

  constructor(private service : HttpService) {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.setBetData?.betPrice){
      this.placeBetData.betPrice = this.setBetData.betPrice;
    }
    if(this.setBetData?.batName){
      this.placeBetData.batName = this.setBetData.batName;
    }
    //console.log(this.setBetData);
  }
  

  ngOnInit(): void {
    
  }

  setBidPriceData(stackAmount:number){
    this.bidStackPrice = stackAmount;

    if(this.setBetData?.betPrice){
      this.profitLossPrice = (this.setBetData.betPrice * stackAmount) - stackAmount
    }

    

  }

  changeBetPrice(type:string){
    if (type == 'plus') {
      if (this.placeBetData.betPrice > 20) {
        this.placeBetData.betPrice += 1;
      } else if (this.placeBetData.betPrice > 10) {
        this.placeBetData.betPrice = this.placeBetData.betPrice + 0.5;
      } else {
        this.placeBetData.betPrice = this.placeBetData.betPrice + 0.2;
      }
    }
    if (type == 'minus') {
      if (this.placeBetData.betPrice > 1) {
        if (this.placeBetData.betPrice > 20) {
          this.placeBetData.betPrice -= 1;
        } else if (this.placeBetData.betPrice > 10) {
          this.placeBetData.betPrice = this.placeBetData.betPrice - 0.5;
        } else {
          this.placeBetData.betPrice = this.placeBetData.betPrice - 0.2;
        }
      }
    }
    this.placeBetData.betPrice = parseFloat(this.placeBetData.betPrice.toFixed(2))
  }

  closeWindow(){
    this.closeBetSlip.emit(true);
  }

}
