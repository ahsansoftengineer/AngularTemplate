import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureAddComponent } from './feature-add.component';

describe('FeatureAddComponent', () => {
  let component: FeatureAddComponent;
  let fixture: ComponentFixture<FeatureAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatureAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatureAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
