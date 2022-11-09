import { Component, OnInit } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { AddProjectComponent } from './../../modal/add-project/add-project.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';
import { projectCompleted } from 'src/app/model/projectCompleted';
import { ChallengeService } from 'src/app/services/challenge.service';
import { challengeCompleted } from 'src/app/model/challengeCompleted';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userData = {
    Id: '',
    Name: '',
    Username: '',
    Email: '',
  };
  name: String = '';
  projectOnGoing: Boolean = false;
  challengeOnGoing: Boolean = false;

  index = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5,
    6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  ];
  completedProject!: projectCompleted[];
  completedChallenge!: challengeCompleted[];

  constructor(
    public dialog: Dialog,
    private auth: AuthService,
    private project: ProjectService,
    private challenge: ChallengeService,
    private router: Router
  ) {
    const data = this.auth.checkAuth();
    if (!data.success) {
      this.router.navigateByUrl('/login');
    }

    this.auth.getuserId(data.userId).subscribe((Response: any) => {
      if (Response.success) {
        this.userData = Response.msg;
        this.name = this.userData.Name;
      } else {
        alert(Response.msg);
        this.router.navigateByUrl('/login');
      }
    });

    this.project.getOnGoingProject(data.userId).subscribe((Response: any) => {
      this.projectOnGoing = Response.success;
    });

    this.challenge
      .getOnGoingChallenge(data.userId)
      .subscribe((Response: any) => (this.challengeOnGoing = Response.success));

    this.project.getCompletedProject(data.userId).subscribe((Response: any) => {
      if (Response.success) {
        this.completedProject = Response.msg;
      }
    });
    this.challenge
      .getCompletedChallenge(data.userId)
      .subscribe((Response: any) => {
        if (Response.success) {
          this.completedChallenge = Response.msg;
        }
      });
  }

  ngOnInit(): void {
    const data = this.auth.checkAuth();
    if (!data.success) {
      this.router.navigateByUrl('/login');
    }
  }

  openDialog() {
    this.dialog.open(AddProjectComponent);
  }
}
