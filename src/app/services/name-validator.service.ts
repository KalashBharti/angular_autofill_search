import {  AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export function clientNameValidator(control: AbstractControl): { invalidName: boolean } | null  {
  
  
    const value = control.value;
    if (!value) return null; // No value, no validation needed

    const name = typeof value === 'string' ? value : value?.clientName;
    if (!name || name.length < 3) return { invalidName: true };

    const valid = /^[A-Za-z ]+$/.test(name);
    return valid ? null : { invalidName: true };
  
}

// export function clientNameValidator(control: AbstractControl): { invalidName: string } | null {

//   if (control.value && control.value.length>=3 && /^(?!\s*$)[A-Za-z ]+$/.test(control.value)) {

//     return null;

//   } else {
//     return { invalidName: "Email must be a Gmail address." };
//   }
// }