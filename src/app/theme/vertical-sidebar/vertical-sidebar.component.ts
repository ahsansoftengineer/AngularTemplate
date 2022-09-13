import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SideBarMenus } from 'src/app/interface/common/router-module';
import { StateService } from 'src/app/service/state.service';
import { IMG_URL } from 'src/app/constant/image';


@Component({
  selector: 'app-vertical-sidebar',
  templateUrl: './vertical-sidebar.component.html',
  styleUrls: ['./vertical-sidebar.component.scss'],
})
export class VerticalSidebarComponent implements OnInit {
  showMenu = '';
  showSubMenu = '';
  public sideBarMenus: SideBarMenus[];
  path = '';
  public name : string | any;
  public myProfile = environment.UserProfile+'Users/profile';
  public userSetting = environment.UserProfile+'Dashboard/userSettings';
  public logout = environment.UserProfile+'Login/logout';


  constructor(
    private router: Router,
    private _ss : StateService,
  ) {}
  ngOnInit(): void {
    this.sideBarMenus = this._ss.sideBarMenus
    this.name = this._ss?.hierarchy?.profile?.name;
  }

  ImageLink(){
    if(this._ss.hierarchy?.profile?.profile_pic?.length > 200) return this._ss.hierarchy?.profile?.profile_pic
    else if(this._ss.hierarchy?.profile?.profile_pic) return IMG_URL.USER + this._ss.hierarchy?.profile?.profile_pic;
    else return 'assets/images/users/profile.png';
  }

  setActiveClass(){
    this.sideBarMenus.filter(m => {
      m.submenu.filter(
      (s) => {
        if (s.path === this.router.url) {
          this.path = m.title;
        }
        this.addExpandClass(this.path);
      }
    )});
  }
  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }
  addActiveClass(element: any) {
    if (element === this.showSubMenu) {
      this.showSubMenu = '0';
    } else {
      this.showSubMenu = element;
    }
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  clearLocalStorage(){
    // localStorage.removeItem('permission_data_server');
    localStorage.clear();
  }
}
