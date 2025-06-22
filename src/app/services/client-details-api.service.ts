import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import ClientData from '../models/client_data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientDetailsApiService {

 private apiUrl = 'http://localhost:3000/client-details';

  http = inject(HttpClient);

  getAllClient(body:{clientName:string, clientId: number|null}): Observable<ClientData[]> {
    return this.http.post<ClientData[]>(this.apiUrl,body);
  }
}
