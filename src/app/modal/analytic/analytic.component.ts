import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'app-analytic',
  templateUrl: './analytic.component.html',
  styleUrls: ['./analytic.component.css'],
})
export class AnalyticComponent implements OnInit {
  totalProject: String = '0';
  level!: any[];
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
      this.level = Response.msg;
      this.totalProject = Response.Project;
    });
  }

  ngOnInit(): void {}
}
