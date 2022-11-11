import { Injectable, Injector } from '@angular/core';
import { SelectOption } from '../interface/common/select';

@Injectable({
  providedIn: 'root',
})
export class ControlStateService {
  _ddOneTimeLoad?: OneTimeLoadArray = {};
  loading = [];
  looseControlState = [];
  constructor(public injector: Injector) {}
}
interface OneTimeLoadArray {
  [key: string]: SelectOption[];
}
