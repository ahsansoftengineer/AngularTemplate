import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { SideNavService } from './side-nav.service';

@Component({
  selector: 'aam-full-template',
  templateUrl: './full-template.component.html',
  styleUrls: ['./full-template.component.scss'],
})
export class FullTemplateComponent implements OnInit {
  constructor(public bpo: BreakpointObserver, public sideNav: SideNavService) {

  }
  ngOnInit(): void {
    this.leftSideBarScreenSettings() 
  }
  leftSideBarScreenSettings(){
    this.bpo.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sideNav.Left.mode = 'over';
        this.sideNav.Left.opened = false;
        this.sideNav.Left.disableClose = false
      } else {
        this.sideNav.Left.mode = 'side';
        this.sideNav.Left.opened = true;
        this.sideNav.Left.disableClose = true
      }
    });
  }
}
