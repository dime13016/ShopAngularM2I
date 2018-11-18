import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from "./model/User";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  apiUrl:string = "http://localhost:8080";

  constructor(private http:HttpClient) { }

  login(userLogin:User) {
    return this.http.post<User>(this.apiUrl+"/signin", userLogin).pipe(map(
        user => {
            console.log(user);
            localStorage.setItem('currentUser', JSON.stringify(user));
            return user;
        }
    ));
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  getCurrentUser():User {
      return JSON.parse(localStorage.getItem('currentUser'));
  }

}
