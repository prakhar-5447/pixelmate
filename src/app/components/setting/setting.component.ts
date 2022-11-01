import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css'],
})
export class SettingComponent implements OnInit {
  profile!: FormGroup;
  user = {
    name: 'Prakhar sahu',
    email: 'sahuprakhar022003@gmail.com',
    username: 'prakhar_5447',
  };
  constructor() {
    this.profile = new FormGroup({
      name: new FormControl(this.user.name, []),
      email: new FormControl(this.user.email, [
        Validators.required,
        Validators.email,
      ]),
      username: new FormControl(this.user.username, [Validators.required]),
    });
  }

  ngOnInit(): void {}

  save() {
    console.log('User Details Saved Successfully');
  }
}
