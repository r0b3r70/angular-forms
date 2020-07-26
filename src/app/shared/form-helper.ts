import { AbstractControl } from '@angular/forms';
import { validationMessages } from './validationMessages';

/* formErrorMessages - obj ref
*/
export function setValidationMessageAbsctract(formErrorMessages) {
  return function(field: string, c: AbstractControl): void {
    formErrorMessages[field] = '';
    if((c.touched || c.dirty) && c.errors) {
      formErrorMessages[field] = Object.keys(c.errors).map(
        key => formErrorMessages[field] = validationMessages[field][key]
      ).join('. ');
    }
  }
}

/* fieldTrackers - ref to subscription variable
   formGroup -  ref to fb.group
   setValMsgFn - ref to setValidationMessage function
*/
export function trackFieldValidationAbstract(fieldTrackers, formGroup, setValMsgFn) {
  return function(fields: Array<string>): void {
    for (const field of fields) {
      const sub = formGroup.get(field).statusChanges.subscribe(
        () => setValMsgFn(field, formGroup.get(field))
      );
      fieldTrackers.add(sub);
    }
  }
}
