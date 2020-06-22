import { Component, OnInit } from '@angular/core';
import { UserdataService } from '../services/userdata.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userdata: UserdataService, private route: Router,public datepipe: DatePipe) { }

  ngOnInit(): void {
     this.changeBG()
     console.log(this.token)
     console.log(this.token.length)
     console.log(sessionStorage.getItem("username"))
  }
  bgs=['space.jpg','code.jpg','work.jpg','data.jpg']
  currentBg;
  i;
  picker;
  startDate = new Date(1990, 0, 1);
  delay() {
    return new Promise(resolve => {
      setTimeout(resolve, 5000);
    });
  }
  async changeBG(){
    while(true)
    {
      for(var bg in this.bgs)
      {
        this.currentBg= this.bgs[bg];
        await this.delay();
      }
    }
  }
  firstname;lastname;username;password;cpassword;date;pan;aadhar;passport;
  token:string="a";
  message;mismatch;
  userLogin(){
    console.log(this.username)
    console.log(this.password)
    this.userdata.checkLogin(this.username,this.password).subscribe(Response =>{
      this.token = Response['token'];
      sessionStorage.setItem("username",Response['username'])
      console.log(Response)
      console.log(this.token)
      console.log(sessionStorage.getItem("username"))
      if(this.token.length>0)
      {
        this.userdata.setLoggedIn(true);
        this.route.navigate(['/userscreen']);
      }
    })
  }
  postUserDetails(){
    console.log(this.username)
    console.log(this.password)
    console.log(this.firstname)
    console.log(this.lastname)
    console.log(this.cpassword)
    this.token=""
    let dateOfBirth =this.datepipe.transform(this.date, 'yyyy-MM-dd');
    console.log(dateOfBirth)
    if(this.password==this.cpassword){
    this.userdata.postUser(this.username,this.password,this.firstname,this.lastname,dateOfBirth,this.pan,this.aadhar,this.passport).subscribe(response =>{
      this.message= response['message'];
      console.log(this.message)
    })
  }
  else{
    this.mismatch=true;
  }
  }

}
