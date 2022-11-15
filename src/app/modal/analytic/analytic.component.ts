import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import { NumberInput } from '@angular/cdk/coercion';

@Component({
  selector: 'app-analytic',
  templateUrl: './analytic.component.html',
  styleUrls: ['./analytic.component.css'],
})
export class AnalyticComponent implements OnInit {
  totalProject: String = '0';
  level = [
    {
      difficulty: 'Easy',
      projects: 0,
      total: 0,
      percentage: 0,
    },
    {
      difficulty: 'Medium',
      projects: 0,
      total: 0,
      percentage: 0,
    },
    {
      difficulty: 'Hard',
      projects: 0,
      total: 0,
      percentage: 0,
    },
    {
      difficulty: 'Ultimate',
      projects: 0,
      total: 0,
      percentage: 0,
    },
  ];

  constructor(
    private auth: AuthService,
    private dialog: Dialog,
    private router: Router
  ) {
    const data = this.auth.checkAuth();
    if (!data.success) {
      this.router.navigateByUrl('/login');
    }
    auth.stat(data.userId).subscribe((Response: any) => {
      if (!Response.success) {
        this.dialog.closeAll();
      }
      this.level[0].percentage = Response.msg[0].percentage;
      this.level[1].percentage = Response.msg[1].percentage;
      this.level[2].percentage = Response.msg[2].percentage;
      this.level[3].percentage = Response.msg[3].percentage;
      this.level[0].projects = Response.msg[0].projects;
      this.level[1].projects = Response.msg[1].projects;
      this.level[2].projects = Response.msg[2].projects;
      this.level[3].projects = Response.msg[3].projects;
      this.level[0].total = Response.msg[0].total;
      this.level[1].total = Response.msg[1].total;
      this.level[2].total = Response.msg[2].total;
      this.level[3].total = Response.msg[3].total;
      this.totalProject = Response.Project;
    });
  }

  ngOnInit(): void {}
}
