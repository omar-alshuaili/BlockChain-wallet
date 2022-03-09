import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AuthService} from '../auth.service'
@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {
  email:string | undefined 
  constructor(private _ActiveRouter : ActivatedRoute,private _AuthService:AuthService) {
    this.email = this._ActiveRouter.snapshot.paramMap.get('email')!
    console.log(this.email);
   }

  ngOnInit(): void {
    
    
  }
  keytab(event:any){
    let nextInput = event.srcElement.nextElementSibling; // get the sibling element

    var target = event.target || event.srcElement;
    var id = target.id
   

    if(nextInput == null && nextInput.maxLength != 0)  // check the maxLength from here
        return;
    else
        nextInput.focus();   // focus if not null
  }
  doVerification(one:string,two:string,three:string,four:string){
   this._AuthService.verify(';').subscribe(()=>{
     next:()=> console.log(1);
     
   })
    
  }

}
