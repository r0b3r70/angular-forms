import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { passwordValidator } from '../shared/validators/passwordValidator';
import { User } from '../shared/user';
import { FormService } from './form.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor(private fb: FormBuilder, private formService: FormService) { }

  ngOnInit(): void {}
  error;
  submitted = false;
  regex = '^(?=.*?[A-Z])(?=.*?[a-z]).+$';

  /* Using form builder to setup the form */
  signUpForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName:  ['', Validators.required],
    email:     ['', [Validators.required, Validators.email]],
    password:  ['', [Validators.required, Validators.minLength(8), Validators.pattern(this.regex), passwordValidator]],
  });

  /* Getters for easy access within the form template */
  get firstName() { return this.signUpForm.get('firstName'); }
  get lastName()  { return this.signUpForm.get('lastName'); }
  get email()     { return this.signUpForm.get('email'); }
  get password()  { return this.signUpForm.get('password'); }

  onSubmit({ value }: { value: User }) {
    this.formService.addUser(value).subscribe(
      () => this.submitted = true,
      () => { this.error = 'Something went wrong, please try again later'; }
    );
  }

}

/*
  Dev Notes:
  - minLength(8) could have been combined with the regex if individual error messages are less important.
    regex = '^(?=.*?[A-Z])(?=.*?[a-z]).{8,}$';
  - regex could be moved to a different file / helper for reusability.
  - depending on the use case, a 'confirm password' field could be added

  Considerations:
  🐔or🥚: when using the passwordValidator(name match) on the password field, the error doesn't
  go away after the name field has been updated. Alternatively it could be used on the global form,
  but it would not highlight the individual password field as the error.
  This could be solved by tracking individual field values.
  Because the form is used from top to bottom, and we woudn't change our
  name for the sake of our password, I chose this approach.
*/

/*
  Notes on email validation:
  - This example uses built in validation which provides syntax check https://angular.io/api/forms/EmailValidator
  - DNS lookup could be used to see if domain.com even exists
  - SMTP verification could check if email address actually exists,
    but this isn't always supported and does not work on catch-all's
  - The checks could be done with an Async Validator (https://angular.io/api/forms/AsyncValidator)
  - Best way to verify the e-mail address is to send a verification e-mail with a BIG Confirm button.
  - All of the above is actually assuming that the e-mail address isn't registered already. In that case you might
    -> redirect the user to the login form
    -> autofill the forgot password form
    -> don't make it too easy for malicious users to check if e-mail address exists
    -> limit the amount of check requests to prevent potential abuse
    -> do we still like captcha's?
*/
