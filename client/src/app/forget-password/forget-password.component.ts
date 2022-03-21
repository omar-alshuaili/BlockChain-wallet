import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  form: any;
  correct : boolean =false
  mess! : string 
  codeCorrect : boolean = false

  constructor(private auth : AuthService,private router : Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.minLength(4),
        Validators.required,
        Validators.email,
      ]),
      code: new FormControl(null, [
        Validators.minLength(4),
        Validators.required,
      ]),
      newPass: new FormControl(null, [
        Validators.minLength(6),
        Validators.required,
      ]),
      confirmNewPass: new FormControl(null, [
        Validators.minLength(6),
        Validators.required,
      ])
  })
  }
  get email():any {
    return this.form?.get('email');
  }
  get code():any {
    return this.form?.get('code');
  }
  get confirmNewPass():any {
    return this.form?.get('confirmNewPass');
  }
  get newPass():any {
    return this.form?.get('newPass');
  }

  checkemail(){
    this.auth.getUserByEmail(this.email.value).subscribe({
      next:(m)=>{
        console.log(m);
        
        this.mess =  JSON.stringify(m);
        this.correct = true
      },
      error:(e)=>{
        console.log(e.error);
        
      }
    })
  }

  reset(){
    if(this.correct !=false){

      
    this.auth.resetPass(this.email.value,this.code.value).subscribe({
      next:()=>{
        this.codeCorrect = true
      }
      ,
      error:(e)=>{
        this.codeCorrect = false

        this.mess = e.error
        console.log(e.error);

      }
    })
  }
  


  }

  confirmReset(){
    this.auth.setNewPassword(this.email.value,this.newPass.value).subscribe({
      next:(e)=>{
          console.log(e);
          this.auth.logout()
          
      },
      error:(e)=>{
console.log(e);

      }
    })
  }
}