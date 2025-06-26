import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { RegisterUserApi } from '../../services/register-api.service';
import { FormSubmissionStatus, RegisterUserModel } from './register_user.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { CanComponentDeactivate } from '../../guards/unsaved-changes.guard';
import { RouterLink } from '@angular/router';
import { Titles } from '../../constants/constant.enum';

@Component({
  selector: 'app-register-user',
  imports:
    [MatFormFieldModule,
      MatSelectModule,
      FormsModule,
      ReactiveFormsModule,
      MatInputModule,
      MatDatepickerModule,
      MatButtonToggleModule,
      MatButtonModule,
      NgClass,
      NgIf,
      NgFor,
      RouterLink
    ],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.scss',
  providers: [provideNativeDateAdapter(), DatePipe, { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],

})
export class RegisterUserComponent implements OnInit, CanComponentDeactivate {

  titles: string[];
  formGroup: FormGroup;
  formSubmissionStatus: FormSubmissionStatus;

  constructor(private formBuilder: FormBuilder, private datePipe: DatePipe, private registerUserApi: RegisterUserApi) {
  }

  ngOnInit(): void {
    this.titles = Object.values(Titles);

    this.formGroup = this.formBuilder.group({
      title: ['', [Validators.required]],
      firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+\s*[a-zA-Z ]*$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+\s*[a-zA-Z ]*$/)]],
      dob: new FormControl<string | Date>("", Validators.required)
      ,
      gender: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    })
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any): void {
    if (this.formGroup.dirty) {
      $event.preventDefault();
      $event.returnValue = true; // Required for Chrome
    }
  }

   canDeactivate(): boolean {
    if (this.formGroup.dirty) {
      return confirm('Form is partially filled are you sure you want to exit?');
    }
    return true;
  }
  
  onSubmit() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }
    const date: Date = this.formGroup.get("dob")?.value;
    const formatted: string | null = this.datePipe.transform(date, 'dd/MM/yyyy');

    const payload: RegisterUserModel = {
      ...this.formGroup.value,
      dob: formatted
    };

    this.registerUserApi.registerUser(payload).subscribe({
      next: ((value: FormSubmissionStatus) => {
        this.formSubmissionStatus = value;
      }),
      error: ((error: HttpErrorResponse) => {
        this.formSubmissionStatus = error.error;
      })
    })
  }
}
