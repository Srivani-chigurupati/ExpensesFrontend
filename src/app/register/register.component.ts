import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../Services/auth.service';
import { CommonModule } from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService,private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: matchingFields('password', 'confirmPassword') });
  }

  onSubmit() {
    delete this.registerForm.value.confirmPassword;
    this.authService.register(this.registerForm.value).subscribe((response:any) => {
      console.log('response - ', response);
      // localStorage.setItem('token', response['token']);
      // localStorage.setItem('username', response['username']);
      this.router.navigate(['/login']);

    });
  }
}

function matchingFields(field1: string, field2: string) {
  return (form: FormGroup) => {
    if (form.controls[field1].value !== form.controls[field2].value) {
      return { mismatchedFields: true };
    }
    return null;
  };
}