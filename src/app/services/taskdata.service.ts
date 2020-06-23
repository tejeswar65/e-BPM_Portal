import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskdataService {

  constructor(private http: HttpClient) {
    }
    postTask(username:string, taskTitle: string, taskDescription: string,assignedType: string,assignedTo: string){
      return this.http.post('http://127.0.0.1:5000/tasks', {
        "taskTitle": taskTitle,
        "taskDescription": taskDescription,
        "payload": '-',
        "currentOwner": assignedTo,
        "createdBy": username,
        "assignedType": assignedType,
        "assignedTo": assignedTo,
        "status": "started",
        "updatedBy": username
      }
      );
    }

    myTasks(username:string){
      return this.http.get(`http://127.0.0.1:5000/myTasks?username=${username}`)
    }
    myGroupTasks(username:string){
      return this.http.get(`http://127.0.0.1:5000/myGroupTasks?username=${username}`)
    }
    myReporteesTasks(username:string){
      return this.http.get(`http://127.0.0.1:5000/myReporteesTasks?username=${username}`)
    }
    getTaskById(id: string){
      return this.http.get(`http://127.0.0.1:5000/taskById?id=${id}`)
    }
}
