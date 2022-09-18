import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { SportHeaderComponent } from './components/sport-header/sport-header.component';
import { AuthService } from './services/auth.service';
import { BetService } from './services/getBet.service';
import { HttpService } from './services/http.service';
import { SessionService } from './services/session.service';
import { FullmarketComponent } from './components/fullmarket/fullmarket.component';
import { MatchOddsComponent } from './components/fullmarket/match-odds/match-odds.component';
import { MyBetsComponent } from './components/my-bets/my-bets.component';
import { DepositComponent } from './components/deposit/deposit.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WithdrawComponent } from './components/withdraw/withdraw.component';
import { StatementsComponent } from './components/statements/statements.component';
import { LoginComponent } from './components/login/login.component';
import { BetSlipComponent } from './components/bet-slip/bet-slip.component';
import { OpenBetsComponent } from './components/open-bets/open-bets.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AccountInfoComponent } from './components/account-info/account-info.component';
import { InplayComponent } from './components/inplay/inplay.component';
import { TableRowComponent } from './components/table-row/table-row.component';
import { AllsportHighlightComponent } from './components/allsport-highlight/allsport-highlight.component';
import { ThousandSuffixesPipe } from './helpers/thousand-suffixes.pipe';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SportHeaderComponent,
    FooterComponent,
    HomeComponent,
    FullmarketComponent,
    MatchOddsComponent,
    MyBetsComponent,
    DepositComponent,
    WithdrawComponent,
    StatementsComponent,
    LoginComponent,
    BetSlipComponent,
    OpenBetsComponent,
    SettingsComponent,
    AccountInfoComponent,
    InplayComponent,
    TableRowComponent,
    AllsportHighlightComponent,
    ThousandSuffixesPipe,
    ChangepasswordComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [AuthService, HttpService, SessionService, BetService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
