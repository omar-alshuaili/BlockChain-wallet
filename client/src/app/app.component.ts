import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { CryptoApiService } from './crypto-api.service';
import {CryptoInterface} from './CryptoInterface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project300';
}