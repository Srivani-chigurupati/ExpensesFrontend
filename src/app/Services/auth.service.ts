import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl:string = 'https://localhost:44370/api/Auth';

  constructor(private http:HttpClient) { 

  }
  register(user:any){
    return this.http.post(`${this.baseUrl}/register`,user);
  }
  login(user:any){
    return this.http.post(`${this.baseUrl}/login`,user);
  }

  get gerUserName(){
    return localStorage.getItem('username');
  }

  get isAutenticated(){
    return !!localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }
}
