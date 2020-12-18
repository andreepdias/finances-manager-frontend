import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { User } from '../pages/authentication/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL: string = environment.apiURLBase + '/users';
  tokenURL: string = environment.apiURLBase + environment.tokenURL;

  clientId: string = environment.clientId;
  clientSecret: string = environment.clientSecret;

  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(
    private http: HttpClient
  ) { }

  isAuthenticated(){
    const token = this.getToken();
    if(token){
      const isExpirated = this.jwtHelper.isTokenExpired(token);
      return !isExpirated;
    }
    return false;
  }

  register(user: User){
    return this.http.post(this.apiURL, user);
  }

  login(email: string, password: string){    
    console.log("email: " + email + " pass: " + password);
    const params = new HttpParams()
      .set('username', email)
      .set('password', password)
      .set('grant_type', 'password');
    
    const headers = {
      'Authorization': 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`),
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    

    return this.http.post(this.tokenURL, params.toString(), { headers });
  }

  logout(){
    localStorage.removeItem('access_token');
  }

  getToken(){
    const tokenString = localStorage.getItem('access_token');
    if(tokenString){
      const token = JSON.parse(tokenString).access_token;
      return token;
    }
    return null;
  }
}
