import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import UserData from '../models/user_data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserListApiService {
 private apiUrl = 'http://localhost:3000/user-details';

  http = inject(HttpClient);

  getAllUsers(): Observable<UserData[]> {
    return this.http.get<UserData[]>(this.apiUrl);
  }
}
