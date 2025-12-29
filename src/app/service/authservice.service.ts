import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../config/config';
import { authResponse } from '../model/model';
@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor(private http :HttpClient) {


    
   }

   signUpAPI(email:string, password:string){
    return this.http.post<authResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${config.API_KEY}`, {
      email: email,
      password: password,
      returnSecureToken: true
    });
   }

   signInApi(email:string,password:string){
 return this.http.post<authResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${config.API_KEY}`,
  {
  email: email,
  password: password,
  returnSecureToken:true
  }
 )
   }
}
