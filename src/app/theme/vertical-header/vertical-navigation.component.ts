import { Component, OnInit, EventEmitter, Output, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { StateService } from '../../../../service/state.service';
import { CookieService } from 'ngx-cookie-service';
import { BaseJoinAction } from 'src/app/class/base-join-actions';

@Component({
  selector: 'app-vertical-navigation',
  templateUrl: './vertical-navigation.component.html',
  styleUrls: ['./vertical-navigation.component.css'],
})
export class VerticalNavigationComponent extends BaseJoinAction implements OnInit {
  constructor(
    public injector : Injector,
    private translate: TranslateService,
    public _ss: StateService,
    private cookieService: CookieService
  ) {
    super(injector);
    translate.setDefaultLang('en');
    translate.currentLang = translate.defaultLang;
  }
  ngOnInit(): void {
    this.name = this._ss.hierarchy.profile.name;

  }

  @Output() toggleSidebar = new EventEmitter<void>();
  public showSearch = false;
  public name: string | any;
  public myProfile = environment.UserProfile + 'Users/profile';
  public userSetting = environment.UserProfile + 'Dashboard/userSettings';
  public logout = environment.UserProfile + 'Login/logout';

  public selectedLanguage: any = {
    language: 'English',
    code: 'en',
    type: 'US',
    icon: 'us'
  }

  public languages: any[] = [
    {
      language: 'English',
      code: 'en',
      type: 'US',
      icon: 'us'
    },
    {
      language: 'Urdu',
      code: 'ur',
      type: 'PK',
      icon: 'pk'
    }
  ]
  changeLanguage(lang: any) {
    this.translate.use(lang.code)
    this.selectedLanguage = lang;
  }
  clearLocalStorage() {
    localStorage.clear();
    this.cookieService.deleteAll('/');
  }
}
