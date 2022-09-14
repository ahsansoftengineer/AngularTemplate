import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftSideNavComponent } from './left-side-nav.component';

describe('LeftSideNavComponent', () => {
  let component: LeftSideNavComponent;
  let fixture: ComponentFixture<LeftSideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeftSideNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeftSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
