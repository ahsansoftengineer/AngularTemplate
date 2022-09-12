import { Component, OnDestroy } from "@angular/core";
import Swal from "sweetalert2";
import { HttpServiceParam } from "../interface/common/http-service-param";
import { Custom } from "../static/custom";
import { BaseServiceInjector } from "./base-service-injector";


@Component({template: ''})
export abstract class BaseJoinAction extends BaseServiceInjector implements OnDestroy   {
  resetProperties() {
    this._fhs._activeRoute = this._activeRoute;
    this._fb = this._fs._fb;
  }
  emptyCheck(val: any) {
    return Custom.emptyCheck(val);
  }
  mergeParam(providedParameters: HttpServiceParam): HttpServiceParam {
    return { ...this.param, ...providedParameters };
  }
  routerStrategy(){
    //   this._router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
    //     this._router.navigate([this._location.path() ]);
    // });
    this._router.routeReuseStrategy.shouldReuseRoute = () =>  false;
    // const subs = this._router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     // Trick the Router into believing it's last link wasn't previously loaded
    //     const lang = this._translate.currentLang || this._translate.defaultLang
    //     // console.log(lang)
    //     // this._translate.use(lang)
    //     this._router.navigated = false;
    //   }
    // });
    // this.subscriptionArray.push(subs)
  }
  ngOnDestroy():  void {
    this._vs._submitted = false;
    this._vs.showWarning = false;
    this.subscriptionArray.forEach(subs => {
      subs?.unsubscribe();
    })
    Swal.close();
    this._vs._toastr.clear();
  }
}
