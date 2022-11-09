import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { signup } from '../model/signup';
import { login } from '../model/login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  BaseUrl: String = 'http://localhost:8000/';

  constructor(private http: HttpClient, private router: Router) {}

  signup(credential: signup) {
    const header = new HttpHeaders().set('content-Type', 'application/json');
    this.http
      .post(this.BaseUrl + 'signup', credential, {
        headers: header,
      })
      .subscribe((Response: any) => {
        if (Response.success) {
          const username = credential['Username'];
          this.getuser(username);
        } else {
          alert(Response.msg);
        }
      });
  }

  login(credential: login) {
    const header = new HttpHeaders().set('content-Type', 'application/json');
    this.http
      .post(this.BaseUrl + 'login', credential, {
        headers: header,
      })
      .subscribe((Response: any) => {
        if (Response.success) {
          this.getuser(Response.msg);
        } else {
          alert(Response.msg);
        }
      });
  }

  getuser(username: String) {
    const header = new HttpHeaders().set('content-Type', 'application/json');
    this.http
      .get<any>(this.BaseUrl + 'user/' + username, {
        headers: header,
      })
      .subscribe((Response: any) => {
        if (Response.success) {
          localStorage.setItem('authId', Response.msg.Id);
          this.router.navigateByUrl('/');
        } else {
          alert(Response.msg);
        }
      });
  }

  getuserId(userid: String) {
    const header = new HttpHeaders().set('content-Type', 'application/json');
    return this.http.get<any>(this.BaseUrl + 'userId/' + userid, {
      headers: header,
    });
  }

  uploadImage(data: any) {
    return this.http.post(this.BaseUrl + 'upload', data);
  }

  checkAuth() {
    const userId: String = localStorage.getItem('authId') || '';
    if (userId) {
      return { success: true, userId: userId };
    }
    return { success: false, userId: userId };
  }
}
