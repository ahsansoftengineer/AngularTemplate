import { Component, Input, OnInit } from '@angular/core';
import { BaseServiceInjector } from 'src/app/core/class/base-service-injector';
import { SideBarMenus } from 'src/app/core/interface/common/router-module';
import { fadeInOnEnterAnimation, rotateInDownLeftAnimation, rotateInUpRightAnimation } from 'angular-animations';
@Component({
  selector: 'aam-side-bar-mat-list-item',
  templateUrl: './side-bar-mat-list-item.component.html',
  styleUrls: ['./side-bar-mat-list-item.component.scss'],
  animations: [
    fadeInOnEnterAnimation(),
    rotateInDownLeftAnimation(),
    rotateInUpRightAnimation()
    // slideInLeftOnEnterAnimation(),
    // slideOutRightOnLeaveAnimation(),
    // fadeInDownAnimation(),
    // fadeOutUpAnimation()
  ]
})
export class SideBarMatListItemComponent extends BaseServiceInjector implements OnInit {
  @Input() item: SideBarMenus
  activeRoute: boolean = false;
  ngOnInit(): void {
    // this.setRoute(this.item?.link)
    // if(this.item?.submenu){
    //   this.item?.submenu?.forEach(x => {
    //     this.setRoute(x?.link)
    //   })
    // }
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
    console.log({link});
    
    this._ss.sideBarChildActive = link
    this._router.navigate( [ link ])
  } 
  setRoute(route: string){
    if(route && this._router.url.indexOf(route) != -1){
      // this._ss.sideBarMenuChild = route
    }
  }
  setParent(){
   
  }
}
