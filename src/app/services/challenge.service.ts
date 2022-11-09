import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { challenge } from '../model/challenge';
import { challengeOnGoing } from '../model/challengeOnGoing';
import { challengeCompleted } from '../model/challengeCompleted';

@Injectable({
  providedIn: 'root',
})
export class ChallengeService {
  BaseUrl: String = 'http://localhost:8000/';

  constructor(private http: HttpClient, private router: Router) {}

  exploreChallenge() {
    const header = new HttpHeaders().set('content-Type', 'application/json');
    return this.http.get<challenge>(this.BaseUrl + 'challenge', {
      headers: header,
    });
  }

  viewChallenge(id: String) {
    const header = new HttpHeaders().set('content-Type', 'application/json');
    return this.http.get<challenge>(this.BaseUrl + 'challenge/' + id, {
      headers: header,
    });
  }

  acceptChallenge(id: String, userId: String) {
    const header = new HttpHeaders().set('content-Type', 'application/json');
    this.http
      .post(
        this.BaseUrl + 'acceptChallenge',
        { Id: id, Username: userId },
        { headers: header }
      )
      .subscribe((Response: any) => {
        if (Response.success) {
          this.router.navigateByUrl('/challenge');
        } else {
          alert(Response.msg);
        }
      });
  }

  getOnGoingChallenge(id: String) {
    const header = new HttpHeaders().set('content-Type', 'application/json');
    return this.http.get<challengeOnGoing>(
      this.BaseUrl + 'acceptChallenge/' + id,
      {
        headers: header,
      }
    );
  }

  progressChallenge(projectData: any) {
    const header = new HttpHeaders().set('content-Type', 'application/json');
    return this.http.put(this.BaseUrl + 'acceptChallenge', projectData, {
      headers: header,
    });
  }

  completeChallenge(id: String) {
    const header = new HttpHeaders().set('content-Type', 'application/json');
    this.http
      .post(
        this.BaseUrl + 'completeChallenge',
        { Id: id },
        {
          headers: header,
        }
      )
      .subscribe((Response: any) => {
        if (Response.success) {
          this.router.navigateByUrl('/');
        } else {
          alert(Response.msg);
        }
      });
  }

  getCompletedChallenge(userid: String) {
    const header = new HttpHeaders().set('content-Type', 'application/json');
    return this.http.get<challengeCompleted>(
      this.BaseUrl + 'completeChallenge/' + userid,
      {
        headers: header,
      }
    );
  }

  viewCompletedChallenge(userid: String, id: String) {
    const header = new HttpHeaders().set('content-Type', 'application/json');
    return this.http.get<challengeCompleted>(
      this.BaseUrl + 'viewCompleteChallenge/' + userid + '/' + id,
      {
        headers: header,
      }
    );
  }
}
