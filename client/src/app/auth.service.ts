import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { baseURL } from 'src/environments/environment';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  verify(email:string):Observable<any|null> {
    return this.http.get(baseURL+'/verify/'+ email)
  }
 
  public user?: Observable<User | null>;
  private userSubject: BehaviorSubject<User | null> | undefined
  constructor(private http:HttpClient,private activatedRoute: ActivatedRoute,private router:Router) {

    this.userSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.user = this.userSubject.asObservable();

    if (this.userSubject.value == null || this.userSubject.value._id == undefined) {
      this.userSubject.next(null)
    }
  }

  public get userValue(): User | null {
    return this.userSubject!.value;
  }

   getUser(email: any) {
    return this.http.get<User>(`${baseURL}rs/user/isVerified/:${email}`)
   }
   public login(email: string, password: string): Observable<any> {

    return this.http.post<any>(`${baseURL}/api/user/login`, { email: email, password: password }).
    pipe(map(user => {
     localStorage.setItem('currentUser', JSON.stringify(user))
     this.userSubject?.next(user);
    return user;}
    ))
  }

  public register(email: any,password:any,userName:any):Observable<any>{
    return this.http.post<any>(`${baseURL}/api/user/register`,
      { email: email, password: password,name:userName }
    )

   }
  

  

}


