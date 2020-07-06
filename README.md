# Ngforms
This application demonstrates the usage forms in Angular. 

## Future optimalisations & considerations:

#### Form
- Depending on the use case, a 'confirm password' field could be added.
- Password currently requires the usage of lowercase and uppercase letters and at least 8 characters. 
- These requirements could have been made more explicit to the user pre-interaction.
- Currently they only show up as an error message.
- Password validation has a separate minLength(8) and A-Za-z regex.
 Current approach makes the code a bit more readable, but more verbose. 
 This could be combined into one if individual errors are less important:
 ```javascript
 regex = ‘^(?=.*?[A-Z])(?=.*?[a-z]).{8,}$'; )
 ```

#### Custom password validator 🐔or 🥚: 
When using the passwordValidator to match first- or last name on the password field, 
the error doesn't go away after the name field has been updated. 
Alternatively it could be used on the global form, but it would not highlight 
the individual password field as the error source. 

This could in turn be solved by tracking individual field values. 
Because the form is used from top to bottom, and the user wouldn't change its name 
for the sake of the password, this approach has been chosen. 


#### Validation Messages
Currently the error validation messages are in the template and are being conditionally displayed using *ngIf statements. 
Although according to Angular guidelines and fine in this example, on large forms this could result in hard to read templates.
When expanding this example, the validation messages could be decoupled from the HTML template, 
allowing them to be in one place, perhaps even an external, multi-lingual JSON file.


#### Error handling 
A global error handler could be implemented to handle all errors that have been uncaught. 
This includes error responses from the server and also network / connection errors.
Services could also have individual error handling, that has not been implemented at this time.


#### Confirmation page
Currently a message is displayed in the template if the user successfully submits the form. 
This part could be made a separate component for reusability, or in a larger application 
that includes routing the user would be redirected to the success page. 


#### E-mail address validation:
- This example uses built in validation which provides syntax check https://angular.io/api/forms/EmailValidator
- DNS lookup could be used to see if domain.com even exists
- SMTP verification could check if email address actually exists,
  but this isn't always supported by the server / provider and does not work on catch-all's
- Those checks could be done with an Async Validator (https://angular.io/api/forms/AsyncValidator)

Best way to verify the e-mail address is to send a verification e-mail with a BIG Confirm button.

- All of the above is actually assuming that the e-mail address isn't registered already. In that case you might:
  - redirect the user to the login form
  - autofill the forgot password form
  - don't make it too easy for malicious users to check if e-mail address exists
  - limit the amount of check requests to prevent potential abuse
  - do we still like captcha's / I'm not a robot ?


## Angular & Angular Material 
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.0.
Angular Material is used to style the app and form elements (https://material.angular.io/).

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

## Running unit tests
Run `ng test --code-coverage` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
