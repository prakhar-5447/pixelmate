import { Component, OnInit } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { AddProjectComponent } from './../../modal/add-project/add-project.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  name: String = 'Prakhar Sahu';
  index = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5,
    6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  ];
  constructor(public dialog: Dialog) {}

  ngOnInit(): void {}

  openDialog() {
    this.dialog.open(AddProjectComponent);
  }
}
