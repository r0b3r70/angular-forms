import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { passwordValidator } from '../shared/validators/passwordValidator';
import { setValidationMessageAbsctract, trackFieldValidationAbstract } from '../shared/form-helper';
import { User } from '../shared/user';
import { FormService } from './form.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  showPassword = false;
  submitted    = false;
  submitError: string  = '';
  formErrorMessages: {[k: string]: string} = {};
  regex: RegExp = /^(?=.*?[A-Z])(?=.*?[a-z]).+$/;
  fieldTrackers = new Subscription();

  constructor(private fb: FormBuilder, private formService: FormService) { }

  formConfig = {
    firstName: ['', Validators.required],
    lastName:  ['', Validators.required],
    email:     ['', [Validators.required, Validators.email]],
    password:  ['', [Validators.required, Validators.minLength(8), Validators.pattern(this.regex), passwordValidator]],
  };

  /* Using form builder to setup the form */
  signUpForm = this.fb.group(this.formConfig);

  /* Setup from absctract functions */
  setValidationMessage = setValidationMessageAbsctract(this.formErrorMessages);
  trackFieldValidation = trackFieldValidationAbstract(this.fieldTrackers, this.signUpForm, this.setValidationMessage)

  ngOnInit(){
    this.trackFieldValidation(Object.keys(this.formConfig));
  }

  onSubmit({ value }: { value: User }) {
    this.formService.addUser(value).subscribe(
      () => {
        this.submitted = true;
        this.fieldTrackers.unsubscribe();
      },
      () => this.submitError = 'Something went wrong, please try again later'
    );
  }

}
