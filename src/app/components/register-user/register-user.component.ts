import { DatePipe, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
import RegisterUserModel from '../../models/register_user';

@Component({
  selector: 'app-register-user',
  imports: [MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule, MatInputModule, MatDatepickerModule, MatButtonToggleModule, MatButtonModule, NgClass
  ],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.scss',
  providers: [provideNativeDateAdapter(), DatePipe, { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],

})
export class RegisterUserComponent implements OnInit {

  titles: string[];
  formGroup: FormGroup;
  formSubmissionStatus:{success:boolean,message:string};
  
  constructor(private formBuilder: FormBuilder, private datePipe: DatePipe, private registerUserApi:RegisterUserApi) {
  }

  ngOnInit(): void {
    this.titles = ["Mr", "Ms", "Dr", "Prof"]

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
      next :(value=> {
          this.formSubmissionStatus =value;         
      }),
      error:(error=>{
        this.formSubmissionStatus = error.error;
      })
    })
  }
}
