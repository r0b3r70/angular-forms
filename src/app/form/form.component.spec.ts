import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormService } from './form.service';

class MockService {
  addUser() { return true; }
}

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  /* Get Control Helper Function */
  function gc(field) {
    return component.signUpForm.controls[field]
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [ {provide: FormService, useClass: MockService } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Form invalid when empty', () => {
    expect(component.signUpForm.valid).toBeFalsy();
  });

  it('First Name is required', () => {
    let errors = {};
    errors = gc('firstName').errors || {};
    gc('lastName').setValue('');
    expect(errors['required']).toBeTruthy();
  });

  it('Last Name is required', () => {
    let errors = {};
    errors = gc('lastName').errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('Email is required', () => {
    let errors = {};
    errors = gc('email').errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('Email is invalid', () => {
    let errors = {};
    const email = gc('email');
    email.setValue('test');
    errors = email.errors || {};
    expect(errors['email']).toBeTruthy();
  });

  it('Email is valid', () => {
    let errors = {};
    const email = gc('email');
    email.setValue('user@domain.com');
    errors = email.errors || {};
    expect(errors['email']).toBeFalsy();
  });

  it('Password is required', () => {
    let errors = {};
    errors = gc('password').errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('Password pattern is invalid', () => {
    let errors = {};
    const password = gc('password');
    password.setValue('test');
    errors = password.errors || {};
    expect(errors['pattern']).toBeTruthy();
  });

  it('Password pattern is valid', () => {
    let errors = {};
    const password = gc('password');
    password.setValue('Qwertyui');
    errors = password.errors || {};
    expect(errors['pattern']).toBeFalsy();
  });

  it('Password matches first name', () => {
    let errors = {};
    const firstName = gc('firstName');
    const password = gc('password');
    firstName.setValue('Rob');
    password.setValue('RobErt01');
    errors = password.errors || {};
    expect(errors['invalidPassword']).toBeTruthy();
  });

  it('Password does not match first name', () => {
    let errors = {};
    const firstName = gc('firstName');
    const password = gc('password');
    firstName.setValue('foo');
    password.setValue('RobErt01');
    errors = password.errors || {};
    expect(errors['invalidPassword']).toBeFalsy();
  });

  it('Password does not match first name', () => {
    let errors = {};
    const firstName = gc('firstName');
    const password = gc('password');
    firstName.setValue('foo');
    password.setValue('RobErt01');
    errors = password.errors || {};
    expect(errors['invalidPassword']).toBeFalsy();
  });

  it('Submit Form', () => {

    expect(component.signUpForm.valid).toBeFalsy();

    const firstName = gc('firstName').setValue('Hello');
    const lastName  = gc('lastName').setValue('World');
    const email     = gc('email').setValue('hello@world.com');
    const password  = gc('password').setValue('StrongPass')

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      component.onSubmit.call({firstName, lastName, email, password}, true);
      expect(component.signUpForm.valid).toBeTruthy();
    });

  });

});
