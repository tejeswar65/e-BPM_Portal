import { Component, OnInit } from '@angular/core';
import { UserdataService } from '../services/userdata.service';
import { TaskdataService } from '../services/taskdata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userscreen',
  templateUrl: './userscreen.component.html',
  styleUrls: ['./userscreen.component.css']
})
export class UserscreenComponent implements OnInit {

  constructor(private tasks: TaskdataService, private userdata: UserdataService,private route: Router) { }

  ngOnInit(): void {
    this.getMyTasks();
    this.getMyGroupTasks();
    this.getMyReporteesTasks();
  }
  taskid;taskTitle;taskDesription;assignedType;assignedTo;
  message;
  postTaskDetails(){
    console.log(typeof(this.taskid))
    console.log(typeof(this.taskTitle))
    console.log(typeof(this.taskDesription))
    console.log(typeof(this.assignedType))
    console.log(typeof(this.assignedTo))
    this.tasks.postTask(this.username,this.taskTitle,this.taskDesription,this.assignedType,this.assignedTo).subscribe(response=>{
      this.message=response['message'];
      console.log(this.message)
    })
  }
  username= sessionStorage.getItem("username")
  myTasks;myGroupTasks;myReporteesTasks;
  getMyTasks(){
    this.tasks.myTasks(this.username).subscribe(Response=>{
      this.myTasks= Response;
    })
  }
  getMyGroupTasks(){
    this.tasks.myGroupTasks(this.username).subscribe(Response=>{
      this.myGroupTasks= Response;
    })
  }
  getMyReporteesTasks(){
    this.tasks.myReporteesTasks(this.username).subscribe(Response=>{
      this.myReporteesTasks= Response;
    })
  }
  signOut(){
    sessionStorage.clear();
    console.log(sessionStorage)
    this.userdata.setLoggedIn(false);
    this.route.navigate(['/login']);
  }
}
