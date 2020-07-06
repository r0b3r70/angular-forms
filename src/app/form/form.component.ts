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
      () => this.error = 'Something went wrong, please try again later'
    );
  }

}
