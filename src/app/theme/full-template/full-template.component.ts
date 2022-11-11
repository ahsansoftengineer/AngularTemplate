import { Directionality } from '@angular/cdk/bidi';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StateService } from 'src/app/core/service/state.service';
import { SideNavService } from './side-nav.service';

@Component({
  selector: 'aam-full-template',
  templateUrl: './full-template.component.html',
  styleUrls: ['./full-template.component.scss'],
})
export class FullTemplateComponent implements OnInit, OnDestroy {
  constructor(
    public bpo: BreakpointObserver, 
    public sideNav: SideNavService,
    public dir: Directionality,
    public _ss: StateService
    ) {

      // this.isRtl = dir.value === 'rtl';
    }
  private isRtl: boolean;
  private _dirChangeSubscription = Subscription.EMPTY;


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
  languageChangeSubs(){
    this._dirChangeSubscription = this.dir.change.subscribe(() => {
      // this.flipDirection();
    });
  }
  ngOnDestroy() {
    this._dirChangeSubscription.unsubscribe();
  }
}
