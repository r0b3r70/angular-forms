import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { FormService } from './form.service';

describe('FormService', () => {
  let service: FormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(FormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Add User', () => {
    const data = {'firstName':'Hello','lastName':'World','email':'hello@world.com','password':'StrongPAss'};
    service.addUser(data)
      .subscribe(res => expect(res).toBeTruthy())
  });

});
