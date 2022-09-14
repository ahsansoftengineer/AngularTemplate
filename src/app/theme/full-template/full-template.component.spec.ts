import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullTemplateComponent } from './full-template.component';

describe('FullTemplateComponent', () => {
  let component: FullTemplateComponent;
  let fixture: ComponentFixture<FullTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
