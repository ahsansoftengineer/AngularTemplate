import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarMatListItemComponent } from './side-bar-mat-list-item.component';

describe('SideBarMatListItemComponent', () => {
  let component: SideBarMatListItemComponent;
  let fixture: ComponentFixture<SideBarMatListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideBarMatListItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideBarMatListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
