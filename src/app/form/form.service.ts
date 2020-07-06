import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../shared/user';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private http: HttpClient) { }

  url = 'https://demo-api.now.sh/users'

  addUser(data: User): Observable<User> {
    return this.http.post<User>(this.url, data);
  }

}
