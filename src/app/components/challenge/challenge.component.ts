import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ChallengeService } from 'src/app/services/challenge.service';
import { Router } from '@angular/router';
import { challengeOnGoing } from 'src/app/model/challengeOnGoing';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css'],
})
export class ChallengeComponent implements OnInit {
  id!: string;
  challengeInfo!: challengeOnGoing;
  cindex = 0;

  constructor(
    private auth: AuthService,
    private challenge: ChallengeService,
    private router: Router
  ) {
    const data = this.auth.checkAuth();
    if (!data.success) {
      this.router.navigateByUrl('/login');
    }

    this.challenge
      .getOnGoingChallenge(data.userId)
      .subscribe((Response: any) => {
        if (Response.success) {
          console.log(Response.msg[0]);
          this.challengeInfo = Response.msg[0];
          this.challengeInfo.Technology = JSON.parse(
            this.challengeInfo.Technology
          );
          this.challengeInfo.Progress = JSON.parse(this.challengeInfo.Progress);
          this.cindex = this.challengeInfo.CurrentTask;
        }
      });
  }

  ngOnInit(): void {}

  change_index(i: any) {
    this.cindex = i;
    // console.log(this.cindex);
  }

  saveProgress() {
    const data = this.auth.checkAuth();
    if (!data.success) {
      this.router.navigateByUrl('/login');
    }
    let challengeData = this.challengeInfo;
    challengeData.CurrentTask = this.cindex;
    this.challenge
      .progressChallenge(challengeData)
      .subscribe((Response: any) => {
        if (Response.success) {
          this.challengeInfo.CurrentTask = this.cindex;
        } else {
          this.cindex = this.challengeInfo.CurrentTask;
        }
      });
  }

  completeChallenge() {
    this.challenge.completeChallenge(this.challengeInfo.Id);
  }
}
