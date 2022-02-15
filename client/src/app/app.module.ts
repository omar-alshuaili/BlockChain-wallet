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
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { WalletComponent } from './wallet/wallet.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent,
    GetStartedComponent,
    AboutComponent,
    HomeComponent,
    WalletComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
