import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  index = [
    {
      1: '19-02-2003',
      completed: true,
    },
    { 2: '19-02-2003', completed: true },
    { 3: '19-02-2003', completed: true },
    { 4: '19-02-2003', completed: true },
    { 5: '19-02-2003', completed: true },
  ];
  tech = ['html', 'css', 'javascript', 'tailwind', 'vscode', 'mongo'];

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
