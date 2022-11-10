import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
  ngOnInit(): void {
    this._translate.use('en');
    this._translate.onLangChange.subscribe((x) => {
      this._ss.lng = x.lang;
    });
  }
}
