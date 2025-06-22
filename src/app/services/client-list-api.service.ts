import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import ClientList from '../models/client_search_list';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientListApi {

 private apiUrl = 'http://localhost:3000/client-list';

  http = inject(HttpClient);

  getClientList(clientName:string): Observable<ClientList[]> {
    return this.http.get<ClientList[]>(this.apiUrl+"/" + clientName);
  }
}
