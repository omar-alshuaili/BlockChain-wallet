import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
private user : User | null = null;

constructor(private authService: AuthService){
  this.authService.user?.subscribe( user => this.user = user);
  console.log ('Here ' + this.user?.email)
}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let isLoggedIn = ! (this.user == null ) ;
    let isVerified = ! (this.user?.isVerified == true ) ;
    return (isLoggedIn && isVerified)

  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let isLoggedIn = ! (this.user == null ) ;
    let isVerified = ! (this.user?.isVerified == true ) ;
    return  (isLoggedIn && isVerified)
  }
  
}