import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  taskForm!: FormGroup;

  constructor(private dialog:Dialog,private task: TaskService) {
    this.taskForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
    });
  }

  add() {
    if (this.taskForm.valid) {
      this.task.tempTask.push({
        Title: this.taskForm.value['title'],
        Date: new Date(),
      });
      console.log(this.task.tempTask);
      
      this.dialog.closeAll();
    }
  }

  ngOnInit(): void {}
}
