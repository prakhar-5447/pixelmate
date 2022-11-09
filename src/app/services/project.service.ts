import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { projectOnGoing } from '../model/projectOnGoing';
import { projectCompleted } from '../model/projectCompleted';
import { project } from './../model/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  BaseUrl: String = 'http://localhost:8000/';

  constructor(private http: HttpClient, private router: Router) {}

  getOnGoingProject(userid: String) {
    const header = new HttpHeaders().set('content-Type', 'application/json');
    return this.http.get<projectOnGoing>(this.BaseUrl + 'ongoing/' + userid, {
      headers: header,
    });
  }

  getCompletedProject(userid: String) {
    const header = new HttpHeaders().set('content-Type', 'application/json');
    return this.http.get<projectCompleted>(this.BaseUrl + 'project/' + userid, {
      headers: header,
    });
  }

  completeProject(id: String) {
    const header = new HttpHeaders().set('content-Type', 'application/json');
    return this.http.get<projectCompleted>(this.BaseUrl + 'complete/' + id, {
      headers: header,
    });
  }

  showProject(id: String) {
    const header = new HttpHeaders().set('content-Type', 'application/json');
    return this.http.get<projectCompleted>(this.BaseUrl + 'view/' + id, {
      headers: header,
    });
  }

  addProject(projectData: project) {
    const header = new HttpHeaders().set('content-Type', 'application/json');
    return this.http.post(this.BaseUrl + 'ongoing', projectData, {
      headers: header,
    });
  }
}
