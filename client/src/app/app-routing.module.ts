import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './user-dashboard/dashboard/dashboard.component';
import { GetStartedComponent } from './get-started/get-started.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './user-dashboard/profile/profile.component';
import { WalletComponent } from './user-dashboard/wallet/wallet.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { AuthGuard } from './core/auth.guard';
import { SellAndBuyComponent } from './user-dashboard/sell-and-buy/sell-and-buy.component';
import { SendComponent } from './user-dashboard/send/send.component';
import { RequestComponent } from './user-dashboard/request/request.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: GetStartedComponent },
  { path: 'reset', component: ForgetPasswordComponent },
  { path: 'verify', component: VerifyEmailComponent },
  {
    path: 'dashboard', component: DashboardComponent, children: [
      { path: 'wallets', component: WalletComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'buyandsell', component: SellAndBuyComponent },
      { path: 'send', component: SendComponent },
      { path: 'request', component: RequestComponent },


    ], canActivate: [AuthGuard], canActivateChild: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
