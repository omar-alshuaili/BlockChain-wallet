import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, QueryList } from '@angular/core';
import { Params } from '@angular/router';
import { catchError, tap,map } from 'rxjs';
import { Observable } from 'rxjs';
//import { baseURL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CryptoApiService {
  prices: any;

  constructor(private http:HttpClient) { }


  getData(coinName:string){
    

      return this.http.get<any>(`/crypto/${coinName}`,
      ).pipe( 
        tap((data) => console.log(this.http + JSON.stringify(data))),
        catchError(this.handlerError)
      );;
  }
  private handlerError(err: HttpErrorResponse) {
    console.log('Sky scanner faced an error, check it out >>>>> : ' + err.message);
    return err.message;
  }
}
