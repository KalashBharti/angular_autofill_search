import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import SearchData from '../../models/search_data';
import UserData from '../../models/user_data';

import { SearchApiService } from '../../services/search-list-api.service';
import { UserListApiService } from '../../services/user-list-api.service';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-users',
  imports: [FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe, MatButtonModule, MatDividerModule, MatIconModule,
    NgIf,
    MatProgressBarModule,
  MatTableModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})

export class UsersComponent implements OnInit {


  private searchData: SearchData[] = [];
  private userData: UserData[] = [];
  
  searchListComplete: boolean = false;
  usersListComplete: boolean = false;

  private searchService = inject(SearchApiService);
  private userService = inject(UserListApiService);

  searchInput = new FormControl('');
  
  filteredOptions: Observable<SearchData[]>;
  filteredUser: UserData[] = [];

  displayedColumns: string[] = ['id', 'name', 'gender', 'age', 'country'];


  private fetchSearchList(): void {
    this.searchService.getSearchList().subscribe({
      next: (data: SearchData[]) => {
        this.searchData = data;
      },
      error: (error) => {
        console.log('Error fetching search data:', error);
      },
      complete: () => {
        this.searchListComplete = true;
      }
    })
  }

  private fetchUserList(): void {
    this.userService.getAllUsers().subscribe({
      next: (data: UserData[]) => {
        this.userData = data;
        this.filteredUser = data;
      },
      error: (error) => {
        console.log('Error fetching user data:', error);
      },
      complete: () => {
        this.usersListComplete = true;

      }
    })
  }

  ngOnInit() {
    this.fetchSearchList();
    this.fetchUserList();

    this.filteredOptions = this.searchInput.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }


  

  private _filter(value: string): SearchData[] {
    const filterValue = typeof value === 'string' ? value.toLowerCase() : '';

    return this.searchData.filter(option => option.id.toString() == filterValue || option.name.toLowerCase().match(filterValue));
  }

  submitSearch():void {
    const search:string|null =  this.searchInput?.value;
    if (!search) {
      this.filteredUser = this.userData;
      return;
    }
     this.filteredUser = this.userData.filter(user => user.id.toString() === search || user.name.toLowerCase().startsWith(search.toLowerCase()));
  }
}
