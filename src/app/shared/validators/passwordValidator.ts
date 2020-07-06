import { ValidatorFn, FormControl, ValidationErrors } from '@angular/forms';

export const passwordValidator: ValidatorFn = (control: FormControl): ValidationErrors | null => {

  const group = control.parent;

  // Don't try to validate when group has not been initialized yet
  if(!group) {
     return null;
  }

  // Get individual form elements
  const firstName = group.get('firstName');
  const lastName  = group.get('lastName');
  const password  = group.get('password');

  // Create a regex pattern for matching first & last name if set and not empty
  // The OR operator is optional
  // Potential regex outcomes: 'firstname|lastname', 'firstname', 'lastname'
  let regex = '';
      regex += (firstName.value !== '') ? firstName.value : '';
      regex += (firstName.value !== '' && lastName.value !== '') ? '|' : ''
      regex += (lastName.value !== '') ? lastName.value : '';

  // Skip if values are empty
  if(password.value.trim() === '' || regex.trim() === '') {
    return null;
  }

  // Create the actual regex and test for match
  const match = new RegExp(regex, 'i').test(password.value);

  // Return error object or null
  return match
    ? {'invalidPassword': true }
    : null;

};
