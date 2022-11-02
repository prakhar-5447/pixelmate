import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Dialog } from '@angular/cdk/dialog';
import { AddTaskComponent } from './../../modal/add-task/add-task.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  index = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  tech = ['html', 'css', 'javascript', 'tailwind', 'vscode', 'mongo'];

  constructor(public dialog: Dialog) {}

  ngOnInit(): void {}

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.index, event.previousIndex, event.currentIndex);
  }

  openDialog() {
    this.dialog.open(AddTaskComponent);
  }

  delete(i: any) {
    // console.log(i);
    this.index.splice(i, 1);
    // console.log('delete');
  }
}
