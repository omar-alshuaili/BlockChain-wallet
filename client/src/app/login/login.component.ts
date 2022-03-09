import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('email') emailValue?: ElementRef;
  @ViewChild('password') passwordValue?: ElementRef;
  form!: FormGroup;
  showError: boolean = false;
  message: string = '';
  isVerified?: User =undefined;

  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
    email: new FormControl(null, [
      Validators.minLength(4),
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl(null, [
      Validators.minLength(6),
      Validators.required,
    ]),
    })
}
get email():any {
  return this.form?.get('email');
}
get password():any {
  return this.form?.get('password');
}




  login(){
    if(this.form.invalid){
      this.showError = true;
      return 
    }
    this.authService.getUser(this.email.value).subscribe({
      next:(u)=> this.isVerified = u,
      complete:()=>this.canLogIn()
    
    })
    if(!this.canLogIn()) {
      console.log('please verify your email first');
     return;
    }

    else{
  

  
  this.authService.login(this.email.value,this.password.value).subscribe({  
      next: ()=> alert('user logged in'),
      
    error: (err) => (this.message =  err.error)(this.showError = true)}); 
    
  }
  this.router.navigate(['/dashboard'])
}

canLogIn():boolean{
  if(this.isVerified?.isVerified == false ){
    return false
  }
  else{
    
    return true
  }
}
}


