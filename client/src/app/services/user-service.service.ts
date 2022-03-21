import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Wallet } from '../interface/wallet';
import { baseURL } from 'src/environments/environment';
import { User } from '../interface/user';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http:HttpClient) { }

  getUserWallets(id:string){
    return this.http.get<string>(`${baseURL}/user/wallets/${id}`)
  }
  
}
