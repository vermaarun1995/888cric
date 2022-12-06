import { Component, OnInit, Input } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { UserData } from 'src/app/models/userData';
import { HttpService } from 'src/app/services/http.service';
import { ResponseModel } from 'src/app/models/responseModel';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-depositpayment',
  templateUrl: './depositpayment.component.html',
  styleUrls: ['./depositpayment.component.scss']
})
export class DepositpaymentComponent implements OnInit {

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

    let depositData = {
      "id": 0,
      "UserId": parseInt(this.depositForm.value.userId),
      "Amount":0,
      "ReferenceNumber":"",
      "UpiId":""
    };
  }

}

export class UpiData
{
    id: number;
    upiId : string;
    isActive : boolean;

    constructor(private upiData : UpiData){
        this.id = upiData.id;
        this.upiId = upiData.upiId;
        this.isActive = upiData.isActive;
    }

}
