import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css'],
})
export class ActivityComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  id!: string;
  index = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];
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

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      // console.log(params);
      this.id = params['id'];
      // console.log(this.id); // price
    });
  }
}
