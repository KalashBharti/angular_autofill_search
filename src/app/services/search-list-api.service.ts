import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import SearchData from '../models/search_data';

@Injectable({
  providedIn: 'root'
})
export class SearchApiService {
  private apiUrl = 'http://localhost:3000/search-list';

  http = inject(HttpClient);

  getSearchList(): Observable<SearchData[]> {
    return this.http.get<SearchData[]>(this.apiUrl);
  }
}
