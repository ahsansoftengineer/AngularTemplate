import { Component, HostListener, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BaseJoinAction } from './core/class/base-join-actions';
import { ProviderService } from './core/service/provider.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation:ViewEncapsulation.None,
  providers: [ProviderService],
})
export class AppComponent extends BaseJoinAction implements OnInit {
  // opened = true;
  // @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;

  // @HostListener('window:resize', ['$event'])
  // onResize(event) {
  //   if (event.target.innerWidth < 768) {
  //     this.sidenav.fixedTopGap = 55;
  //     this.opened = false;
  //   } else {
  //     this.sidenav.fixedTopGap = 55
  //     this.opened = true;
  //   }
  // }

  // isBiggerScreen() {
  //   const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  //   if (width < 768) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }



  ngOnInit(): void {
    // this._translate.use('en');
    // this._translate.onLangChange.subscribe((x) => {
    //   this._ss.lng = x.lang;
    // });

    // console.log(window.innerWidth)
    // if (window.innerWidth < 768) {
    //   this.sidenav.fixedTopGap = 55;
    //   this.opened = false;
    // } else {
    //   this.sidenav.fixedTopGap = 55;
    //   this.opened = true;
    // }
  }
}
