import { AbstractControl, ValidationErrors } from '@angular/forms';

export function formValidation(group: AbstractControl): ValidationErrors | null {
  const clientNameControl = group.get('clientName');
  const clientIdControl = group.get('clientId');

  const clientNameValue = clientNameControl?.value;
  const clientIdValue = clientIdControl?.value;

  //Validate Client Name
  const name = typeof clientNameValue === 'string' ? clientNameValue : clientNameValue?.clientName;
  if (!name || name.length < 3 || !/^[A-Za-z ]+$/.test(name)) {
    clientNameControl?.setErrors({ invalidName: true });
  } else {
    clientNameControl?.setErrors(null);
  }

  //Validate Client ID
  const idValid = clientIdValue === undefined || clientIdValue === null || /^\d+(\.\d+)?$/.test(String(clientIdValue));
  if (!idValid) {
    clientIdControl?.setErrors({ invalidId: true });
  } else {
    clientIdControl?.setErrors(null);
  }


  return null;
}
