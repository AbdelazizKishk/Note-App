import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  signUp(data: any): Observable<any> {
    return this.httpClient.post(
      `${enviroment.baseUrl}/api/v1/users/signUp`,
      data
    );
  }
  signIn(data: any): Observable<any> {
    return this.httpClient.post(
      `${enviroment.baseUrl}/api/v1/users/signIn`,
      data
    );
  }
}
