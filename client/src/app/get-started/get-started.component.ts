import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { LoginComponent } from '../login/login.component';
import { User } from '../user';

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

  constructor( private authService:AuthService) { }

  ngOnInit(): void {this.form = new FormGroup({
    email: new FormControl(null, [
      Validators.minLength(4),
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    name: new FormControl(null, [
      Validators.minLength(6),
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
get name():any {
  return this.form?.get('name');
}
get password():any {
  return this.form?.get('password');
}
get confirmPassword():any {
  return this.form?.get('confirmPassword');
}
signup(){
  
  if(this.terms?.nativeElement['checked'] == true){
    this.accepted = true

  
  }
  else{
    this.accepted = false
    console.log(2);

    return

  }
  if(this.form.invalid){
    this.showError = true;
    console.log(2);
  }
  
  if(this.confirmPassword.value != this.password.value) {
    this.showError = true
    console.log(1);
    
    return;
  }
  else{
    this.showError = false
  }

  
      this.authService.register(this.email.value,this.password.value,this.name.value).subscribe({  
      next: () => alert('you can log in now ..') ,
      error: (err) => (this.message =  err.error)(this.showError = true)}); 
  }
}


