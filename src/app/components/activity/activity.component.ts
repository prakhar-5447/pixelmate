import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { challenge } from 'src/app/model/challenge';
import { AuthService } from 'src/app/services/auth.service';
import { ChallengeService } from 'src/app/services/challenge.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css'],
})
export class ActivityComponent implements OnInit {
  challengeInfo!: challenge;
  id!: string;

  constructor(
    private auth: AuthService,
    private challenge: ChallengeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const data = this.auth.checkAuth();
    if (!data.success) {
      this.router.navigateByUrl('/login');
    }
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.challenge.viewChallenge(this.id).subscribe((Response: any) => {
        if (Response.success) {
          this.challengeInfo = Response.msg[0];
          this.challengeInfo.Technology = JSON.parse(
            this.challengeInfo.Technology
          );
          this.challengeInfo.Progress = JSON.parse(this.challengeInfo.Progress);
        }
      });
    });
  }

  ngOnInit(): void {}

  acceptChallenge() {
    const data = this.auth.checkAuth();
    if (!data.success) {
      this.router.navigateByUrl('/login');
    }
    this.challenge.acceptChallenge(this.challengeInfo.Id, data.userId);
  }
}
