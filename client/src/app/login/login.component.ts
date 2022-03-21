import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../interface/user';

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
    //google log
    this.loadExternalScript('https://apis.google.com/js/client:platform.js');
    if (localStorage.getItem('access_token')) {
      this.router.navigate(['dashboard/profile']);
      return ;
    }
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
  

  
  this.authService.login(this.email.value,this.password.value).subscribe({  
      next: ()=> {
        this.router.navigate(['dashboard/profile']);
      },
      
    error: (err) => {
      this.message = err.error

    }
  }); 
    
  

}

public loadExternalScript(url: string) {
  const body = <HTMLDivElement> document.body;
  const script = document.createElement('script');
  script.innerHTML = '';
  script.src = url;
  script.async = true;
  script.defer = true;
  body.appendChild(script);
}


}


