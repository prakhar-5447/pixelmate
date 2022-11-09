import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { challengeCompleted } from 'src/app/model/challengeCompleted';
import { AuthService } from 'src/app/services/auth.service';
import { ChallengeService } from 'src/app/services/challenge.service';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.css'],
})
export class AchievementsComponent implements OnInit {
  id!: String;
  challengeInfo!: challengeCompleted;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private challenge: ChallengeService,
    private router: Router
  ) {
    const data = this.auth.checkAuth();
    if (!data.success) {
      this.router.navigateByUrl('/login');
    }
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.challenge
        .viewCompletedChallenge(data.userId, this.id)
        .subscribe((Response: any) => {
          if (Response.success) {
            this.challengeInfo = Response.msg[0];
            this.challengeInfo.Technology = JSON.parse(
              this.challengeInfo.Technology
            );
            this.challengeInfo.Progress = JSON.parse(
              this.challengeInfo.Progress
            );
          }
        });
    });
  }

  ngOnInit(): void {}
}
