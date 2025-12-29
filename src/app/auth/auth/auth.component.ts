import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from '../../service/authservice.service';
import { toDoI } from '../../model/model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  standalone: false,
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent implements OnInit {
  authForm!: FormGroup;
  isSubmitted: boolean = false;
  loginMode: boolean = false;
  authObservable = new Observable<any>();
  constructor(
    private fb: FormBuilder,
    private authService: AuthserviceService
  ) {
    this.authForm = this.fb.group({
      email: [
        '',
        [
          Validators.email,
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  ngOnInit() {
    console.log('Auth Component Initialized');
  }

  toggleMode() {
    this.loginMode = !this.loginMode;
  }

  onSubmit(data: toDoI) {
    let email = this.authForm.value.email;
    let password = this.authForm.value.password;
    if(this.loginMode){
    this.authObservable=  this.authService.signInApi(email,password)
    }else{
      this.authObservable=  this.authService.signUpAPI(email, password)
    }
    this.authObservable.subscribe((res) => {
      console.log(res);
    });
  }

}
