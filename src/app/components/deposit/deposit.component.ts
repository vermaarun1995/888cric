import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ResponseModel } from 'src/app/models/responseModel';
import { UserData } from 'src/app/models/userData';
import { HttpService } from 'src/app/services/http.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss']
})
export class DepositComponent implements OnInit {

  depositAmount : number = 0;
  referenceNum: string ='';

  setAmountData(amount:number){
    this.depositAmount = amount;
  }

  userData? : UserData;
  upiData? : UpiData;
  depositForm: FormGroup;
  @Input() userId?: number;
  constructor(private sessionService : SessionService, private service: HttpService, private fb: FormBuilder) {
    this.depositForm = this.fb.group({
      userId: [this.userId],
      amount: [''],
      referenceNumber: [''],
      upiId: ['']
    })
   }

  ngOnInit(): void {
    this.userData = this.sessionService.getLoggedInUser();
    this.getActiveUpiId();
  }

  getActiveUpiId() : void {
    this.service.get(`Common/GetActiveUpi`)
      .subscribe((response:ResponseModel) => {
        if(response.isSuccess == true && response.data !== null){
          this.upiData = <UpiData>response.data;
        }
      });
  }

  saveDeposit(){
debugger;
    let depositData = {
      "id": 0,
      "UserId": this.userData?.id as Number,
      "Amount":this.depositAmount,
      "ReferenceNumber":this.referenceNum,
      "UpiId":this.upiData?.upiId
    };

    this.service.post('Setting/SaveDeposit', depositData)
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
        //this.loaderService.isLoading.next(false);
      });
  }

}

interface UpiData
{
    id: number;
    upiId : string;
    isActive : boolean;

}