import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../../models/interfaces/authentication';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = environment.API;

  constructor(private http: HttpClient) { }

  public loginUser(user: User) {
    return this.http.post(`${this.api}/login`, user, { responseType: 'text'});
  }

  public logoutUser(user: User) {
    return this.http.post(`${this.api}/logout`, user, { responseType: 'text'});
  }
}

