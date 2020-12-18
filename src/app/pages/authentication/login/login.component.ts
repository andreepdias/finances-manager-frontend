import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  successMessage: string = '';
  errorMessages: string[] = [];

  constructor(
    private service: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(){
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submitForm(){
    this.logInFormUser();
  }

  logInFormUser(){
    const email = this.form.value.email;
    const password = this.form.value.password;

    console.log("login component: email: " + email + " pass: " + password);
    

    this.service.login(email, password)
      .subscribe(successResponse => {
        this.sucessfulLogin(successResponse);
      }, errorResponse => {
        this.failedLogin();
      });
  }

  sucessfulLogin(response: any){
    const accessToken = JSON.stringify(response);
    localStorage.setItem('access_token', accessToken);
    this.router.navigate(['']);
  }

  failedLogin(){
    console.log("Failed login :(");
    this.errorMessages = ['Login attempt failed.']
  }
}
