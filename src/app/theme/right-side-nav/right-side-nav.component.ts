import { Component, OnInit } from '@angular/core';
import { BaseServiceInjector } from 'src/app/core/class/base-service-injector';
import { SideNavService } from '../full-template/side-nav.service';

@Component({
  selector: 'aam-right-side-nav',
  templateUrl: './right-side-nav.component.html',
  styleUrls: ['./right-side-nav.component.scss'],
})
export class RightSideNavComponent extends BaseServiceInjector implements OnInit {
  constructor(public sideNav: SideNavService) {
    super()
   }
  ngOnInit(): void {}
}
