import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  title = 'pixelmate';
  login!: FormGroup;
  credential!: any;
  constructor(private http: HttpClient) {
    this.login = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  call() {
    console.log('s');

    if (this.login.valid) {
      this.credential = {
        email: this.login.value['email'],
        password: this.login.value['password'],
      };
      this.login.reset();
    }
    try {
      this.http.get('http://localhost:8080/').subscribe((res) => {
        console.log(res);
      });
    } catch (error) {
      console.log(error);
    }
  }
  send() {
    console.log('crediential set');

    this.credential = {
      email: this.login.value['email'],
      password: this.login.value['password'],
    };
    this.login.reset();

    try {
      this.http
        .post('http://localhost:8080/send', this.credential)
        .subscribe((res) => {
          console.log(res);
          console.log('get daata');
        });
    } catch (error) {
      console.log(error);
    }
  }

  ngOnInit(): void {}
}
