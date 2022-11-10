import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormActionComponent } from './form-action.component';

describe('FormActionComponent', () => {
  let component: FormActionComponent;
  let fixture: ComponentFixture<FormActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
