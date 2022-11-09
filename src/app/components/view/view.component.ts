import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { projectCompleted } from 'src/app/model/projectCompleted';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from './../../services/project.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  index = [
    {
      1: '19-02-2003',
      completed: true,
    },
    { 2: '19-02-2003', completed: true },
    { 3: '19-02-2003', completed: true },
    { 4: '19-02-2003', completed: true },
    { 5: '19-02-2003', completed: true },
  ];
  projectInfo!: projectCompleted;
  id!: string;

  constructor(
    private auth: AuthService,
    private project: ProjectService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const data = this.auth.checkAuth();
    if (!data.success) {
      this.router.navigateByUrl('/login');
    }
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.project.showProject(this.id).subscribe((Response: any) => {
        if (Response.success) {
          this.projectInfo = Response.msg[0];
          this.projectInfo.Technology = JSON.parse(this.projectInfo.Technology);
          this.projectInfo.Work = JSON.parse(this.projectInfo.Work);
        }
      });
    });
  }

  ngOnInit(): void {}
}
