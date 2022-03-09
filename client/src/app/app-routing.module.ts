import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GetStartedComponent } from './get-started/get-started.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { WalletComponent } from './wallet/wallet.component';
import { AuthGuard  } from './core/auth.guard.service';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
const routes: Routes = [
  { path: '', component: HomeComponent ,children:[
    { path: 'login', component: LoginComponent },
    { path: 'singup', component: GetStartedComponent },
  ]},
  
  { path: 'about', component: AboutComponent },
  { path: 'verify', component: VerifyEmailComponent },
  { path: 'dashboard', component: DashboardComponent ,children:[
    { path: 'wallets' , component: WalletComponent},
    { path: 'profile' , component: ProfileComponent}
],canActivate: [AuthGuard],canActivateChild:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


 }
