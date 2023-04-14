import { Injectable } from '@angular/core';
import { User } from '../../models/interfaces/authentication';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public saveUser( value: User): void {
    window.localStorage.setItem('USER', JSON.stringify(value));
  }

  public getUser() {
    return JSON.parse(window.localStorage.getItem('USER')!);
  }

  public deleteUser() {
    return window.localStorage.removeItem('USER');
  }

}
