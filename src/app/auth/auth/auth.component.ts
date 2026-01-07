import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from '../../service/authservice.service';
import { toDoI } from '../../model/model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NotificationserviceService } from '../../service/notification/notificationservice.service';

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
  notificationMessage!: any
  authObservable = new Observable<any>();
  constructor(
    private fb: FormBuilder,
    private authService: AuthserviceService,
    private route :Router,
    private notificationService: NotificationserviceService
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

  if (this.loginMode) {
    this.authObservable = this.authService.signInApi(email, password);
  } else {
    this.authObservable = this.authService.signUpAPI(email, password);
  }

  this.authObservable.subscribe({
    next: (res) => {
      this.notificationService.showSuccess(`${this.loginMode ? 'Login' : 'Sign Up'} Successfully`);
      console.log('Authentication response:', res);

      this.authForm.reset();
if(this.loginMode){
      this.route.navigate(['/list']);
}    },
    error: (err) => {
      this.notificationService.showError('Authentication Failed');
      console.error(err);
    }
  });
}


}
