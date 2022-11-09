import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { signup } from 'src/app/model/signup';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  credential!: signup;
  constructor(private auth: AuthService, private router: Router) {
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.minLength(8)]),
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
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

  register() {
    if (this.signupForm.valid) {
      this.credential = {
        Name: this.signupForm.value['name'],
        Email: this.signupForm.value['email'],
        Username: this.signupForm.value['username'],
        Password: this.signupForm.value['password'],
      };
      this.auth.signup(this.credential);
      this.signupForm.reset();
    }
  }
}
