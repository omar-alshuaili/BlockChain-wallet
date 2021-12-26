import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

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

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
    email: new FormControl(null, [
      Validators.minLength(4),
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
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
    else{
  

  
      this.authService.login(this.email.value,this.password.value).subscribe({  
      next: ()=> alert('user logged in'),
      
      error: (err) => (this.message =  err.error)(this.showError = true)}); 
    }
}

}
