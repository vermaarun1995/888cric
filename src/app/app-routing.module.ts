import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountInfoComponent } from './components/account-info/account-info.component';
import { AllsportHighlightComponent } from './components/allsport-highlight/allsport-highlight.component';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { DepositComponent } from './components/deposit/deposit.component';
import { FullmarketComponent } from './components/fullmarket/fullmarket.component';
import { HomeComponent } from './components/home/home.component';
import { InplayComponent } from './components/inplay/inplay.component';
import { LoginComponent } from './components/login/login.component';
import { MyBetsComponent } from './components/my-bets/my-bets.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { StatementsComponent } from './components/statements/statements.component';
import { WithdrawComponent } from './components/withdraw/withdraw.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: InplayComponent },
  { path: 'inplay', component: InplayComponent },
  { path: 'allsport-highlight/:id', component: AllsportHighlightComponent },
  { path: 'fullmarket/:marketId/:eventId/:sportId', component: FullmarketComponent},
  { path: 'my-bets', component: MyBetsComponent },
  { path: 'deposit', component: DepositComponent },
  { path: 'withdraw', component: WithdrawComponent },
  { path: 'statements', component: StatementsComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'account-info', component: AccountInfoComponent },
  { path: 'changepassword', component: ChangepasswordComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
