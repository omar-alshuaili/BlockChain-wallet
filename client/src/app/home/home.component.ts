import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CryptoApiService } from '../crypto-api.service';
import { CryptoInterface } from '../CryptoInterface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent   {
  data:CryptoInterface[]=[]
  coin1?:number
  coin2?:number
  coin3?:number
  coinList  = ['BTC','XRP','ENS']
  form: any;
  constructor(private api : CryptoApiService){
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.minLength(4),
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),

      })
      
    this.coinList.forEach(element => {  
      this.api.getData(element).subscribe({  
        next: c => this.data.push(c[0]) ,
        complete: () => this.readData(),
        
});
})

}





readData(){
for(let i in this.data){
 if(this.data[i].name === 'Bitcoin'){
     this.coin1 = this.data[i].price_usd;
  }
  else if(this.data[i].name === 'ENS'){
      this.coin2 = this.data[i].price_usd;
  }
  else {
      this.coin3 = this.data[i].price_usd;
      }
 }

}

}
  

