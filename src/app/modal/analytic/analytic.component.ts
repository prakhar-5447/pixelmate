import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-analytic',
  templateUrl: './analytic.component.html',
  styleUrls: ['./analytic.component.css'],
})
export class AnalyticComponent implements OnInit {
  level = [
    {
      difficulty: 'easy',
      projects: '20',
      total: '20',
    },
    {
      difficulty: 'medium',
      projects: '50',
      total: '20',
    },
    {
      difficulty: 'hard',
      projects: '7',
      total: '20',
    },
    {
      difficulty: 'ultimate',
      projects: '2',
      total: '20',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
