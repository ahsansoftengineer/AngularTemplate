import { Component, OnInit } from '@angular/core';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { SideBarMenus } from 'src/app/core/interface/common/router-module';
import { SideNavService } from '../full-template/side-nav.service';
import { animations } from './left-side-nav.animation';

@Component({
  selector: 'aam-left-side-nav',
  templateUrl: './left-side-nav.component.html',
  styleUrls: ['./left-side-nav.component.scss'],
  // encapsulation: ViewEncapsulation.None,
  
  animations: [
    fadeInOnEnterAnimation(),
    ...animations
  ]
})
export class LeftSideNavComponent implements OnInit {
  list: SideBarMenus[]
  constructor(
    public sideNav: SideNavService
  ) { }
  ngOnInit(): void {
    console.log(this.list);
  }
}
