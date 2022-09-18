import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResponseModel } from 'src/app/models/responseModel';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss']
})
export class TableRowComponent implements OnInit {

  constructor(private service : HttpService, private activatedRoute: ActivatedRoute) { }

  @Input() tableRowList : any[] = [];
  @Input() multiMarketPin : boolean = false;
  @Input() sportIcon : boolean = false;
  sportId:number = 0;
  

  setPinData:any = (marketId:number, isPinned:boolean) =>{
   
    this.service.get(`exchange/UpdateEventForPinned?marketId=${marketId}&isPinned=${isPinned}`)
    .subscribe((response:ResponseModel) => {
      if(response.data != null && response.isSuccess == true){
        this.tableRowList = this.tableRowList.map((x) => {
          x.marketId == marketId ? x.isPinnedMatch = isPinned : x.isPinnedMatch;
          return x;
        })
      }
    });
    
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(paramsId => {
      this.sportId = paramsId["id"];
    });
  }

}
