import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.css'],
})
export class AchievementsComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  id!: string;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      // console.log(params);
      this.id = params['id'];
      // console.log(this.id); // price
    });
  }
}
