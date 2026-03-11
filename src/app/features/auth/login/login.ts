import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login{
  email: string = '';
  password: string = '';

  authService=inject(AuthService);
  router=inject(Router);

  login(){

  const credentials = {
    email:this.email,
    password:this.password
  }

  this.authService.login(credentials).subscribe({

    next:(response:any)=>{

      const token = response.token;

      localStorage.setItem("token", token);

      const role = this.authService.getUserRole();

      if(role === "ROLE_ADMIN"){
        this.router.navigate(['/admin/dashboard']);
      }
      else{
        this.router.navigate(['/company/dashboard']);
      }

    },

    error:(err)=>{
      console.log("Login failed",err);
      const msg= err?.error?.message || "Login Failed";
      alert(msg);
    }

  })

}

}
