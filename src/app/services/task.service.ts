import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { task } from '../model/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  BaseUrl: String = 'http://localhost:8000/';

  tempTask: any[] = [];
  actualTask: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  setTask(list: any) {
    this.actualTask = list;
    this.tempTask = list;
  }

  addTask(data: any) {
    const header = new HttpHeaders().set('content-Type', 'application/json');
    this.http
      .post(this.BaseUrl + 'task', data, {
        headers: header,
      })
      .subscribe((Response: any) => {
        return Response.success;
      });
  }

  getTask(id: String) {
    const header = new HttpHeaders().set('content-Type', 'application/json');
    return this.http.get<task>(this.BaseUrl + 'task/' + id, {
      headers: header,
    });
  }

  changeTask(task: any) {
    const header = new HttpHeaders().set('content-Type', 'application/json');
    return this.http.put(this.BaseUrl + 'task', task, {
      headers: header,
    });
  }
}
