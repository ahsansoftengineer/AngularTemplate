import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseServiceInjector } from 'src/app/core/class/base-service-injector';
import { SideNavService } from '../full-template/side-nav.service';

@Component({
  selector: 'aam-left-side-nav',
  templateUrl: './left-side-nav.component.html',
  styleUrls: ['./left-side-nav.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LeftSideNavComponent extends BaseServiceInjector implements OnInit {
  constructor(public sideNav: SideNavService) {
    super()
   }
  ngOnInit(): void {}
}
