import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { AuthService } from '../Services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [MatCard,MatFormField,MatInput,MatButton,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginData = {
    Username: '',  
    password: ''
  }

  constructor(private auth:AuthService,private router:Router) { }

  

 login(){
    console.log(this.loginData);
    this.auth.login(this.loginData).subscribe((data:any)=>{
      console.log(data);
      localStorage.setItem('token',data.token);
      localStorage.setItem('username',data.username);
      this.router.navigate(['/entries']);
   }, (error: any) => {
    // Handle error response
    if (error.error && error.error.error) {
      alert(error.error.error);
    } else {
      alert('An unexpected error occurred');
    }
  });
      //alert(error.error.Message);
      //console.log(error.error.Message);

 }

}
