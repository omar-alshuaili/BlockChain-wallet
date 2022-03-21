import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { CryptoApiService } from './services/crypto-api.service';
import {CryptoInterface} from './interface/CryptoInterface';
import * as $ from 'jquery';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit   {
  loadAPI: Promise<any>;

  constructor() {        
    this.loadAPI = new Promise((resolve) => {
        this.loadScript();
        resolve(true);
    });
}
    ngOnInit(): void {
        this.getCookie();
    }
//check for cookies
getCookie() {
    var match = document.cookie.match(RegExp('(?:^|;\\s*)' + 'opencoin.shop' + '=([^;]*)')); return match ? match[1] : null;
}



public loadScript() {        
    var isFound = false;
    var scripts = document.getElementsByTagName("script")
    for (var i = 0; i < scripts.length; ++i) {
        if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src')?.includes("loader")) {
            isFound = true;
        }
    }

    if (!isFound) {
        var dynamicScripts = ["../../assets/js/javascript.js"];

        for (var i = 0; i < dynamicScripts.length; i++) {
            let node = document.createElement('script');
            node.src = dynamicScripts [i];
            node.type = 'text/javascript';
            node.async = false;
            node.charset = 'utf-8';
            document.getElementsByTagName('head')[0].appendChild(node);
        }
        var dynamicScripts3 = ["https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js"];

        for (var i = 0; i < dynamicScripts3.length; i++) {
            let node = document.createElement('script');
            node.src = dynamicScripts3 [i];
            node.type = 'text/javascript';
            node.async = false;
            node.charset = 'utf-8';
            document.getElementsByTagName('head')[0].appendChild(node);
        }
        var dynamicScripts2 = ["../../assets/js/animations.js"];

        for (var i = 0; i < dynamicScripts2.length; i++) {
            let node = document.createElement('script');
            node.src = dynamicScripts2 [i];
            node.type = 'text/javascript';
            node.async = false;
            node.charset = 'utf-8';
            document.getElementsByTagName('head')[0].appendChild(node);
        }
        var dynamicScripts4 = ["https://s3.tradingview.com/tv.js"];

        for (var i = 0; i < dynamicScripts4.length; i++) {
            let node = document.createElement('script');
            node.src = dynamicScripts4 [i];
            node.type = 'text/javascript';
            node.async = false;
            node.charset = 'utf-8';
            document.getElementsByTagName('head')[0].appendChild(node);
        }
        

    }
 
}
    checkForCookie():Boolean{

        
        if(localStorage.getItem('cookies_policy') != null){
            return true
        }
        return false
    }

    setCookie(){
        localStorage.setItem('cookies_policy','true')
    }
  title = 'project300';
}