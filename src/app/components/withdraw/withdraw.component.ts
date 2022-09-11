import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent implements OnInit {

  active = 1;

  constructor() { }

  ngOnInit(): void {
  }

  navChange($event:any){
  }

  activeIdChange($event:any){
  }

}
