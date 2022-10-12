import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { StateService } from 'src/app/core/service/state.service';

@Component({
  selector: 'di-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
  loading: boolean;
  constructor(
    private _ss: StateService,
    private spinner: NgxSpinnerService,
    // private breakpointObserver: BreakpointObserver
    ) {
    this._ss.isLoading.subscribe(x => {
      if(x) this.spinner.show()
      else this.spinner.hide()
    })
  }
}
