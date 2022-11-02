import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
})
export class AddProjectComponent implements OnInit {
  login!: FormGroup;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tech: string[] = [];
  technology = new FormControl('');
  url!: ArrayBuffer;

  constructor() {
    this.login = new FormGroup({
      title: new FormControl('', [Validators.required]),
      technology:new FormControl('',[Validators.required]),
      desc: new FormControl('', [Validators.required]),
      link: new FormControl('', []),
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tech.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.technology.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.tech.indexOf(fruit);

    if (index >= 0) {
      this.tech.splice(index, 1);
    }
  }

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => {
        // called once readAsDataURL is completed
        this.url = event.target!.result as ArrayBuffer || new ArrayBuffer(10);
      };
    }
  }

  ngOnInit(): void {}
  send() {
    console.log('click');
  }
}
