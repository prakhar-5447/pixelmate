import { Component, OnInit } from '@angular/core';
import { ChallengeService } from 'src/app/services/challenge.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { challenge } from 'src/app/model/challenge';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css'],
})
export class ExploreComponent implements OnInit {
  challengeInfo!: challenge[];
  index = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5,
    6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  ];

  constructor(
    private auth: AuthService,
    private challenge: ChallengeService,
    private router: Router
  ) {
    const data = this.auth.checkAuth();
    if (!data.success) {
      this.router.navigateByUrl('/login');
    }

    this.challenge.exploreChallenge().subscribe((Response: any) => {
      if (Response.success) {
        this.challengeInfo = Response.msg;
      }
    });
  }

  ngOnInit(): void {}
}
