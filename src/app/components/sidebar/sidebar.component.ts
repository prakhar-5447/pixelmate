import { Component, OnInit } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { AnalyticComponent } from './../../modal/analytic/analytic.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor(public dialog: Dialog, private router: Router) {}

  openDialog() {
    this.dialog.open(AnalyticComponent);
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  ngOnInit(): void {}
}
