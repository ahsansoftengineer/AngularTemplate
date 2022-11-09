import { Component, Input, OnInit } from '@angular/core';
import { BaseServiceInjector } from 'src/app/core/class/base-service-injector';
@Component({
  selector: 'aam-side-bar-mat-list-item',
  templateUrl: './side-bar-mat-list-item.component.html',
  styleUrls: ['./side-bar-mat-list-item.component.scss']
})
export class SideBarMatListItemComponent extends BaseServiceInjector implements OnInit {
  activeRoute: boolean = false;
  ngOnInit(): void {
  
    // this.setRoute(this.item?.link)
    // if(this.item.submenu){
    //   this.item?.submenu?.forEach(x => {
    //     this.setRoute(x?.link)
    //   })
    // }
    // console.log(this._ss.sideBarActive);
    
  }
  
  public navHandler(link: string){
    if(link){
      this.setRoute(link);
      this._router.navigate( [ link ])
    }
  } 
  setRoute(route: string){
    if(route && this._router.url.indexOf(route) != -1){
      this._ss.sideBarActive = route
    }
  }

}
