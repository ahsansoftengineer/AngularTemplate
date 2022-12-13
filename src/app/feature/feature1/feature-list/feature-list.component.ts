import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { CanonicalService } from 'src/app/core/service/canonical.service';

@Component({
  selector: 'aam-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.scss'],
})
export class FeatureListComponent implements OnInit {
  constructor(
    private metaTagService: Meta, 
    private MetaTitle: Title,
    private canonicalService: CanonicalService

    
  ) {}

  ngOnInit(): void {
    
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