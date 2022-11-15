import { Component, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';
import { project } from 'src/app/model/project';
import { Router } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
})
export class AddProjectComponent implements OnInit {
  projectForm!: FormGroup;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tech: string[] = [];
  technology = new FormControl('');
  photoImage!: String;
  url: any;
  projectInfo!: project;
  imageValid!: any;

  constructor(
    public dialog: Dialog,
    private auth: AuthService,
    private project: ProjectService,
    private router: Router
  ) {
    this.projectForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      technology: this.technology,
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
    this.technology.setValue('');
  }

  remove(tech: string): void {
    const index = this.tech.indexOf(tech);
    if (index >= 0) {
      this.tech.splice(index, 1);
    }
  }

  ngOnInit(): void {}

  @ViewChild('fileInput') fileInput: any;

  send() {
    let techList: any = this.tech;
    techList = techList.map((element: String) => {
      return { name: element };
    });
    const formData = new FormData();
    const fi = this.fileInput.nativeElement;
    const fileToUpload = fi.files[0];
    this.imageValid = fileToUpload;

    formData.append('file', fileToUpload);
    this.auth.uploadImage(formData).subscribe((Response: any) => {
      this.photoImage = Response.msg;
      const data = this.auth.checkAuth();
      if (!data.success) {
        this.router.navigateByUrl('/login');
      }
      this.projectInfo = {
        Username: data.userId,
        Name: this.projectForm.value['title'],
        Description: this.projectForm.value['desc'],
        ProjectImage: this.photoImage,
        Url: this.projectForm.value['link'],
        Technology: techList,
      };
      this.project.addProject(this.projectInfo).subscribe((Response: any) => {
        if (Response.success) {
          this.router.navigateByUrl('/project');
          this.dialog.closeAll();
        } else {
          alert(Response.msg);
        }
      });
    });

    if (this.projectForm.valid) {
    }
  }
}
