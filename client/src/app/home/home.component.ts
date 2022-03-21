import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CryptoApiService } from '../services/crypto-api.service';
import { CryptoInterface } from '../interface/CryptoInterface';
import { GetStartedComponent } from '../get-started/get-started.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit  {
  data:CryptoInterface[]=[]
  coin1?:number
  coin2?:number
  coin3?:number
  coinList  = ['BTC','XRP','ENS']
  form: any;
  showForm:boolean = false;
  signup : boolean = false;
  login : boolean = false;
  coinName :string = 'BTCUSD'
  @ViewChild(LoginComponent) logComp:any;
  @ViewChild(GetStartedComponent) signComp:any;


  constructor(
    private api : CryptoApiService, 
    private activeRoute : ActivatedRoute, 
    public router: Router,
    private Authform?:ElementRef){

    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.minLength(4),
        Validators.required,
        Validators.email,
      ]),

      })
      
    this.coinList.forEach(element => {  
      this.api.getData(element).subscribe({  
        next: c => this.data.push(c[0]) ,
        complete: () => this.readData(),
        
});
})
  console.log(this.router.url);
  if(this.router.url != null && this.router.url.length > 1){
    let authForms= this.Authform?.nativeElement.querySelector('.center-form')
    authForms.classList.remove('hide'); 
  }


}
  ngOnInit(): void {
    this.loadExternalScript('https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js');

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

  showOverForm(form:number){
    if(form ==1){

      this.showForm = true;
      this.signup = true;
    }
  }

  onCoinChange(name:string){
    this.coinName = name
    this.loadExternalScript('https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js')
  }
  //load script
public loadExternalScript(url: string) {

  const body = <HTMLDivElement> document.querySelector('.card-body2');
  const script = document.createElement('script');
  var isFound = false;
    var scripts = document.getElementsByTagName("script")
    for (var i = 0; i < scripts.length; ++i) {
        if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src')?.includes("loader")) {
           body.removeChild(script)
        }
    }
  script.innerHTML = `{
    "symbol": "COINBASE:${this.coinName}",
    "width": "100%",
    "height": "100%",
    "dateRange": "12M",
    "colorTheme": "light",
    "trendLineColor": "rgba(41, 98, 255, 1)",
    "underLineColor": "rgba(41, 98, 255, 0.3)",
    "underLineBottomColor": "rgba(41, 98, 255, 0)",
    "isTransparent": true,
    "autosize": true,
    "largeChartUrl": ""
      }`;
  script.src = url;
  script.async = true;
  script.defer = true;
  body.appendChild(script);


}


}
  

