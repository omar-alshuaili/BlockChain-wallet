import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { baseURL } from 'src/environments/environment';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 


  verify(otp:string,email:string):Observable<any|null> {
    console.log(otp);
    
    return this.http.post<any>(`${baseURL}/api/user/verify/${email}`,
      { otp: otp}
    )
  }
 
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private http:HttpClient,private activatedRoute: ActivatedRoute,private router:Router) {
    this.userSubject = new BehaviorSubject<User>(null!);
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    console.log(this.userSubject.value);
    
    
    return this.userSubject.value;
  }

   getUser(id:string):Observable<User> {
    return this.http.get<User>(`${baseURL}/api/user/${id}`)
   }


  uploadPic(file: FormData) {
    return this.http.post(`${baseURL}/api/user/upload`,file)
  }

  getPic(id: string) {
   return this.http.get(`${baseURL}/api/user/getpic/${id}`)
 }


   public login(email: string, password: string): Observable<any> {

    return this.http.post<any>(`${baseURL}/api/user/login`, { email: email, password: password })
    .pipe(map(user => {
      console.log(user.jwtToken);
      this.userSubject?.next(user);
      console.log(this.userValue);
      
      this.startRefreshTokenTimer();
      console.log(1);
      localStorage.setItem('access_token', user.jwtToken);      
      this.router.navigate(['/dashboard']);
      
      return true;

  }));

  }
  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }


  logout() {
    this.stopRefreshTokenTimer();
    this.userSubject?.next(null!);
    localStorage.removeItem('access_token');
    this.router.navigate(['/']);
}

refreshToken() {
  return this.http.post<any>(`${baseURL}/api/user/refresh-token`, {}, { withCredentials: true })
      .pipe(map((user) => {
          this.userSubject?.next(user);
          this.startRefreshTokenTimer();
          return user;
      }));
}





  public register(email: any,password:any,firstName:any,lastName:string):Observable<any>{
    return this.http.post<any>(`${baseURL}/api/user/register`,
      { email: email, password: password,firstName:firstName,lastName:lastName }
    )

   }
  

   // helper methods

   private refreshTokenTimeout:any;

   private startRefreshTokenTimer() {
       // parse json object from base64 encoded jwt token
      
       const jwtToken = JSON.parse(atob(this.userValue!.jwtToken!.split('.')[1]));

       // set a timeout to refresh the token a minute before it expires
       const expires = new Date(jwtToken.exp * 1000);
       const timeout = expires.getTime() - Date.now() - (60 * 1000);
       this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
   }

   private stopRefreshTokenTimer() {
       clearTimeout(this.refreshTokenTimeout!);
   }

}


