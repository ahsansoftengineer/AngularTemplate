import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseServiceInjector } from 'src/app/core/class/base-service-injector';
import { SideBarMenus } from 'src/app/core/interface/common/router-module';
import { fadeInDownAnimation, fadeInDownOnEnterAnimation, fadeInOnEnterAnimation, fadeOutOnLeaveAnimation, fadeOutUpAnimation, fadeOutUpOnLeaveAnimation, rotateInDownLeftAnimation, rotateInUpRightAnimation, slideInLeftOnEnterAnimation, slideOutLeftOnLeaveAnimation, slideOutRightOnLeaveAnimation } from 'angular-animations';
@Component({
  selector: 'aam-side-bar-mat-list-item',
  templateUrl: './side-bar-mat-list-item.component.html',
  styleUrls: ['./side-bar-mat-list-item.component.scss'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation(),
    slideInLeftOnEnterAnimation(),
    slideOutLeftOnLeaveAnimation(),
    fadeInDownOnEnterAnimation(),
    fadeOutUpOnLeaveAnimation()
  ]
})
export class SideBarMatListItemComponent extends BaseServiceInjector implements OnInit {
  @Input() item: SideBarMenus
  activeRoute: boolean = false;
  ngOnInit(): void {
    if(!this._ss.sideBarParentActive && this.matchRoute(this.item.link)){
      this.navParentHandler(this.item.link)
    }
    if(!this._ss.sideBarParentActive){
      this.setRouteChild();
    }
  }
  public navParentHandler(link: string){
    if(this.item.submenu){
      if(this._ss.sideBarParentActive != this.item.id)
      this._ss.sideBarParentActive = this.item.id
      else this._ss.sideBarParentActive = 0
    }
    this.navChildHandler(link)
  } 
  public navChildHandler(link: string){
    this._ss.sideBarChildActive = link
    this._router.navigate( [ link ])
  } 
  setRouteChild(){
    if(this.item?.submenu?.length){
      this.item.submenu.forEach(x => {
        if(this._router.url.indexOf(x.link) != -1){
          this._ss.sideBarParentActive = this.item.id
          this._ss.sideBarChildActive = x.link
        }
      })
    }
  }
  matchRoute(link: string){
    return this._router.url.indexOf(link) != -1
  }
  setParent(){
   
  }
}
