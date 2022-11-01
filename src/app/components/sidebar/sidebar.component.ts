import { Component, OnInit } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { AnalyticComponent } from './../../modal/analytic/analytic.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor(public dialog: Dialog) {}

  openDialog() {
    this.dialog.open(AnalyticComponent);
  }

  ngOnInit(): void {}
}
