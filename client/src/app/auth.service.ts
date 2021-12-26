import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { baseURL } from 'src/environments/environment';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: Observable<User | null> | undefined;
  private userSubject: BehaviorSubject<User | null> | undefined;
  constructor( private http:HttpClient) {
    this.userSubject = new BehaviorSubject<User|null>
    (JSON.parse(localStorage.getItem('currentUser') || '{}')) ;
    this.user = this.userSubject.asObservable();

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
  

  public handleError(error?: HttpErrorResponse) {
    if (error?.error instanceof ErrorEvent) {
   
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error?.status}, ` +
        `body was: ${error?.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }

}


