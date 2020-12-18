import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  successMessage: string = '';
  errorMessages: string[] = [];

  constructor(
    private service: AuthService,
    private formBuilder: FormBuilder
  ){}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(){
    this.form = this.formBuilder.group({
      name: [ '', Validators.required ],
      email: [ '', [ Validators.required, Validators.email ] ],
      password: [ '', [ Validators.required, Validators.minLength ] ]
    });
  }

  submitForm(){
    this.registerFormUser();
  }

  registerFormUser(){
    const user: User = new User(this.form.value.name, this.form.value.email, this.form.value.password);
    
    this.service.register(user)
      .subscribe(successResponse =>  {
          this.successfullRegistration();
      }, failureResponse => {
        this.failedRegistration(failureResponse);
      });
  }

  successfullRegistration(){
    this.successMessage = "Registration done successfully!";
    this.errorMessages = [];
    this.form.reset();
  }

  failedRegistration(response: any){
    this.errorMessages = response.error.errors;
    this.successMessage = '';
  }



  

}
