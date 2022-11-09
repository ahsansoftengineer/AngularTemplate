import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  set(key: STORAGE_KEY, value: any) {
    localStorage.setItem(key, value);
  }
  get(key: STORAGE_KEY): any {
    return localStorage.getItem(key);
  }
  setObject(key: STORAGE_KEY, value: object) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  getObject(key: STORAGE_KEY): object {
    return JSON.parse(localStorage.getItem(key));
  }
}
type STORAGE_KEY = 'PAGE' | 'INDEX' | 'ACTIVE_MENU'