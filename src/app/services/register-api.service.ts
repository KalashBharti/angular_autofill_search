import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import RegisterUserModel from '../models/register_user';
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
