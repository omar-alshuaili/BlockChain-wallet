import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoginComponent } from '../login/login.component';
import { User } from '../interface/user';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.css']
})
export class GetStartedComponent implements OnInit {
  @ViewChild('terms') terms?: ElementRef;

  form!: FormGroup;
  accepted?: boolean= true;
user?:User;
  showError: boolean = false;
  message!: string;
  created: boolean = false;

  constructor( private authService:AuthService,private route :Router) { }

  ngOnInit(): void {this.form = new FormGroup({
    email: new FormControl(null, [
      Validators.minLength(4),
      Validators.required,
      Validators.email,
    ]),
    firstname: new FormControl(null, [
      Validators.minLength(3),
      Validators.required,
    ]),
    lastname: new FormControl(null, [
      Validators.minLength(3),
      Validators.required,
    ]),
    password: new FormControl(null, [
      Validators.minLength(6),
      Validators.required,
    ]),
    confirmPassword: new FormControl(null, [
      Validators.minLength(6),
      Validators.required,
    ]),
  })

}
get email():any {
  return this.form?.get('email');
}
get firstname():any {
  return this.form?.get('firstname');
}
get lastname():any {
  return this.form?.get('lastname');
}
get password():any {
  return this.form?.get('password');
}
get confirmPassword():any {
  return this.form?.get('confirmPassword');
}
signup(){
  

  
  if(this.confirmPassword.value != this.password.value) {
    this.showError = true

    
    return;
  }
  else{
    this.showError = false
  }

  
      this.authService.register(this.email.value,this.password.value,this.firstname.value,this.lastname.value).subscribe({  
        next: () => this.route.navigate([`verify`],{queryParams:{
          email:this.email.value
        }}) ,
        error: (err) => {
          console.log(err.error);
          this.message =  err.error
        }

      }); 
  }
}


