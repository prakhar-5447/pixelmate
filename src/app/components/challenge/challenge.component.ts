import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css'],
})
export class ChallengeComponent implements OnInit {
  constructor() {}
  id!: string;
  index = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];
  cindex = 0;
  difficulty: string = 'ultimate';
  tech = [
    'html',
    'css',
    'javascript',
    'tailwind',
    'vscode',
    'mongo',
    'seaborn',
    'matplotlib.pyplot',
    'pandas',
    'numpy',
    'tensorflow',
  ];

  ngOnInit(): void {}

  change_index(i: any) {
    this.cindex = i;
    // console.log(this.cindex);
  }
}
