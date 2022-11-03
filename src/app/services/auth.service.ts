import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { signup } from '../model/signup';
import { login } from '../model/login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  signup(credential: signup) {
    const header = new HttpHeaders().set('content-Type', 'application/json');
    this.http
      .post('http://localhost:8000/signup', credential, {
        headers: header,
      })
      .subscribe((Response: any) => {
        if (Response.success) {
          const username = credential['Username'];
          this.getuser(username);
          this.router.navigateByUrl('/');
        } else {
          alert(Response.msg);
        }
      });
  }

  login(credential: login) {
    const header = new HttpHeaders().set('content-Type', 'application/json');
    this.http
      .post('http://localhost:8000/login', credential, {
        headers: header,
      })
      .subscribe((Response: any) => {
        if (Response.success) {
          this.getuser(Response.msg);
          this.router.navigateByUrl('/');
        } else {
          alert(Response.msg);
        }
      });
  }

  getuser(username: String) {
    const header = new HttpHeaders().set('content-Type', 'application/json');
    this.http
      .get<any>('http://localhost:8000/user/' + username, {
        headers: header,
      })
      .subscribe((Response: any) => {
        if (Response.success) {
          localStorage.setItem('authId', Response.msg.Id);
          localStorage.getItem('authId');
        } else {
          alert(Response.msg);
        }
      });
  }
}
