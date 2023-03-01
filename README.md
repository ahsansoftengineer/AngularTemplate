# [ANGULAR ARCHETECTURE](#)

## [GOOGLE ANALYTICS](#)

### Installation
```java
npm i firebase
```
### Service
```java
import { Injectable } from '@angular/core';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
  // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// remove it --zz--
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
```
### Component
```java
import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { CanonicalService } from 'src/app/core/service/canonical.service';
import { GoogleAnalyticsService } from 'src/app/core/service/google-analytics.service';

@Component({
  selector: 'aam-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.scss'],
})
export class FeatureListComponent implements OnInit {
  public cookieValue: string
  constructor(
    private metaTagService: Meta, 
    private MetaTitle: Title,
    private canonicalService: CanonicalService,
    private cookieService: CookieService,
    private ga: GoogleAnalyticsService

    
  ) {}
    
  ngOnInit(): void {
    this.cookieService.set('Test', 'Hello World');
    this.cookieValue = this.cookieService.get('Test');
    this.ga.logInfo()
  }
  setMetaTag(){
    this.MetaTitle.setTitle("Feature 1 List");
    this.canonicalService.setCanonicalURL();
    this.metaTagService.addTags([
      {
        name: 'keywords',
        content: 'Angular SEO Integration, Music CRUD, Angular Universal',
      },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'Digamber Singh' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'date', content: '2019-10-31', scheme: 'YYYY-MM-DD' },
      { charset: 'UTF-8' },
    ]);
  }
  ngOnDestroy(): void {
    this.MetaTitle.setTitle('Feature 1 List Destroyed')
    
  }
}
```
