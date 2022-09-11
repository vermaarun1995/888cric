import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountInfoComponent } from './components/account-info/account-info.component';
import { DepositComponent } from './components/deposit/deposit.component';
import { FullmarketComponent } from './components/fullmarket/fullmarket.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MyBetsComponent } from './components/my-bets/my-bets.component';
import { SettingsComponent } from './components/settings/settings.component';
import { StatementsComponent } from './components/statements/statements.component';
import { WithdrawComponent } from './components/withdraw/withdraw.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'fullmarket', component: FullmarketComponent },
  { path: 'my-bets', component: MyBetsComponent },
  { path: 'deposit', component: DepositComponent },
  { path: 'withdraw', component: WithdrawComponent },
  { path: 'statements', component: StatementsComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'account-info', component: AccountInfoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
