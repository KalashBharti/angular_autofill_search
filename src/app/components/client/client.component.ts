import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, finalize, map, startWith, switchMap } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { ClientListApi } from '../../services/client-list-api.service';
import ClientList from '../../models/client_search_list';
import { clientNameValidator } from '../../services/name-validator.service';
import { ClientDetailsApiService } from '../../services/client-details-api.service';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@Component({
  selector: 'app-client',
  imports: [NgIf, FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe, MatButtonModule, MatDividerModule, MatIconModule, MatTableModule, MatProgressBarModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent implements OnInit {
  clientListLoading: boolean = false;
  loading: boolean = false;

  clientNameInput = new FormControl<string | ClientList>('', [Validators.required, clientNameValidator]);
  clientId = new FormControl<number | undefined>(undefined, [Validators.pattern(/^\d{4}$/)]);
  
  filteredOptions: Observable<ClientList[]>;

  private clientListApi = inject(ClientListApi);
  private clientDataApi = inject(ClientDetailsApiService);
 
  clientData: ClientList[] = [];
  displayedColumns: string[] = ['Name', 'Gender', 'City', 'State', 'Country'];
 
  formGroup = new FormGroup(
    {
      clientName: this.clientNameInput,
      clientId: this.clientId
    }
  );


  ngOnInit() {
    this.getClient(" ", null); // Initial call to fetch all clients
    
    this.filteredOptions = this.clientNameInput.valueChanges.pipe(
      startWith(''),
      debounceTime(300),            // avoids spamming backend
      distinctUntilChanged(),       // skips if value didn’t change
      switchMap(value => {
        const name = typeof value === 'string' ? value : value?.clientName;

        if (name && name.length >= 3) {
          this.loading = true;
          return this.clientListApi.getClientList(name.toLowerCase()).pipe(
            finalize(() => this.loading = false) //  hides spinner when done
          );
        } else {
          this.loading = false;
          return of([]);
        }
      })
    );
  }

  displayFn(client: ClientList): string {
    return client && client.clientName ? client.clientName : '';
  }


  private getClient(clientName: string, clientId: number | null): void {
    this.clientListLoading = true
    const apiCall = this.clientDataApi.getAllClient({
      clientName,
      clientId: this.formGroup.value.clientId || null
    });

    apiCall.subscribe({
      next: (data) => {
        this.clientData = data;
        this.clientListLoading = false;
      },
      error: (error) => {
        alert('Failed to fetch client data. Please try again later.');
        this.clientListLoading = false;
      },

    });
  }

  onSubmitFormGroup() {
    if (this.formGroup.invalid) {
      alert("Please enter required fields properly.");
      return;
    }
    const clientNameInput = this.formGroup.value.clientName;
    let clientName = '';
    if (typeof clientNameInput === 'string') {
      clientName = clientNameInput;
    }
    else {
      clientName = clientNameInput?.clientName || '';
    }
    this.getClient(clientName, this.formGroup.value.clientId || null);
  }


}
