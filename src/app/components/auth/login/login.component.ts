  import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { login } from 'src/app/model/login';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  title = 'pixelmate';
  loginForm!: FormGroup;
  credential!: login;
  constructor(private auth: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('authId')) {
      this.router.navigateByUrl('/');
    }
  }

  continue() {
    if (this.loginForm.valid) {
      this.credential = {
        Username: this.loginForm.value['username'],
        Email: this.loginForm.value['email'],
        Password: this.loginForm.value['password'],
      };
      this.auth.login(this.credential);
      this.loginForm.reset();
    }
  }
}
