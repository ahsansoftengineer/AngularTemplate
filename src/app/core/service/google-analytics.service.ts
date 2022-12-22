import { Injectable } from '@angular/core';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
  // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// --zz-- remove it
const firebaseConfig = {
  apiKey: "AIzaSyB-5CMFovk-zz-U7bPtjcyri-KV1K-FueNgqck",
  authDomain: "starbazaar-b7-zz-7fb.firebaseapp.com",
  projectId: "starbazaar-b77-zz-fb",
  storageBucket: "starbazaar-b7-zz-7fb.appspot.com",
  messagingSenderId: "10013356-zz-98934",
  appId: "1:1001335698934:web:0a778b6dff-zz-bd77713a83d7",
  measurementId: "G-5SLK6-zz-LCS9B"
};

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {
  // Initialize Firebase
  public app = initializeApp(firebaseConfig);
  public analytics = getAnalytics(this.app);
  constructor() {
  }
  logInfo(){
    logEvent(this.analytics, 'notification_received');
  }
}

