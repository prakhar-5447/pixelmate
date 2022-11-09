import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Dialog } from '@angular/cdk/dialog';
import { AddTaskComponent } from './../../modal/add-task/add-task.component';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';
import { Router } from '@angular/router';
import { projectOnGoing } from 'src/app/model/projectOnGoing';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  tempTaskArray!: any;
  taskList!: any;
  projectInfo!: projectOnGoing;

  constructor(
    public dialog: Dialog,
    private auth: AuthService,
    private project: ProjectService,
    private task: TaskService,
    private router: Router
  ) {
    const data = this.auth.checkAuth();
    if (!data.success) {
      this.router.navigateByUrl('/login');
    }
    this.project.getOnGoingProject(data.userId).subscribe((Response: any) => {
      if (Response.success) {
        this.projectInfo = Response.msg[0];
        this.projectInfo.Technology = JSON.parse(this.projectInfo.Technology);
        this.task.getTask(this.projectInfo.Id).subscribe((Response: any) => {
          if (Response.success) {
            this.task.setTask(JSON.parse(Response.msg[0].Task));
            this.tempTaskArray = this.task.tempTask;
          }
        });
      }
    });
  }

  ngOnInit(): void {
    this.tempTaskArray = this.task.tempTask;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.tempTaskArray,
      event.previousIndex,
      event.currentIndex
    );
  }

  openDialog() {
    this.dialog.open(AddTaskComponent);
  }

  delete(i: any) {
    // console.log(i);
    this.tempTaskArray.splice(i, 1);
    // console.log('delete');
  }

  saveTask() {
    const list = { Project: this.projectInfo.Id, Task: this.tempTaskArray };
    if (!this.task.actualTask) {
      this.task.addTask({
        Project: this.projectInfo.Id,
        Task: this.tempTaskArray,
      });
    } else {
      this.task.changeTask(list).subscribe((Response: any) => {
        if (Response.success) {
          this.task.setTask(this.tempTaskArray);
        } else {
          this.task.setTask(this.taskList);
        }
      });
    }
  }

  completeProject() {
    const data = this.auth.checkAuth();
    if (!data.success) {
      this.router.navigateByUrl('/login');
    }
    this.project
      .completeProject(this.projectInfo.Id)
      .subscribe((Response: any) => {
        if (Response.success) {
          this.router.navigateByUrl('/');
        }
      });
  }
}
