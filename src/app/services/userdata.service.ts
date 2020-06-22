import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { toASCII } from 'punycode';


@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  constructor(private http: HttpClient) { }

  checkLogin(username: string, password: string){
    return this.http.post('http://127.0.0.1:5000/login', {
      "username": username,
      "password": password,
    }
    );
  }
  postUser(username: string, password: string, firstName: string, lastName: string, dateOfBirth: string, pan: string, aadhar: string, passport: string){
    return this.http.post('http://127.0.0.1:5000/users', {
      "username": username,
      "password": password,
      "firstName": firstName,
      "lastName": lastName,
      "dateOfBirth": dateOfBirth,
      "status": "active",
      "manager": "none",
      "role": "user",
      "pan": pan,
      "aadhar": aadhar,
      "passport": passport
    }
    );
  }
  logInStatus = false;
  setLoggedIn(status: boolean){
    this.logInStatus = status;
  }
  getLoggedIn(){
    return this.logInStatus;
  }
}
