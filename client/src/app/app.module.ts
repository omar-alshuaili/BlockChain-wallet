import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import {HttpClientModule} from '@angular/common/http';
import { GetStartedComponent } from './get-started/get-started.component';
import { SafeHtmlPipe } from './user-dashboard/profile/profile.pipe';
import { HomeComponent } from './home/home.component';
import { WalletComponent } from './user-dashboard/wallet/wallet.component';
import { DashboardComponent } from './user-dashboard/dashboard/dashboard.component';
import { ProfileComponent } from './user-dashboard/profile/profile.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { SellAndBuyComponent } from './user-dashboard/sell-and-buy/sell-and-buy.component';
import { SendComponent } from './user-dashboard/send/send.component';
import { RequestComponent } from './user-dashboard/request/request.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component'


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent,
    GetStartedComponent,
    SafeHtmlPipe,
    HomeComponent,
    WalletComponent,
    DashboardComponent,
    ProfileComponent,
    VerifyEmailComponent,
    SellAndBuyComponent,
    SendComponent,
    RequestComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
