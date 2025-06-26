import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {RegisterUserModel} from '../components/register-user/register_user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserApi {

private apiUrl = 'http://localhost:3000/register-user';

 
  constructor(private http:HttpClient){}

  registerUser(payload:RegisterUserModel): Observable<{success:boolean,message:string}> {
    return this.http.post<{success:boolean,message:string}>(this.apiUrl,payload);
  }
}
