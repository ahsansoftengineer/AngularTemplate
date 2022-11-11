import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {
  public header: string ='No Header Set';
  public headerButtons: string ='No Header Set';
  constructor() { 
    console.log('app start');
    
  }
}
export interface FeatureButton {
  icon: string;
  action: () => void; 
  text: string;
}
export interface FeatureSubmitButton {
  icon: string;
  action: () => void;
  text: string;
  redirectTo: string;
}