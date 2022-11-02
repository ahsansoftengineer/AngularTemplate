import { Injector } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DatePipe, Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppInjector } from '../static/AppInjector';

// # 1 SOLID PRINCIPLE (Single Responsibility Principle)
// 1. Single responsibility principle: a class should have one, and only one, reason to change;
// 2. When you only want to Inject a Service
export abstract class AngularServiceInjector {
  // Angular Services
  public _activeRoute: ActivatedRoute;
  public _router: Router;
  public _dialog: MatDialog;
  public _fb: FormBuilder;
  public _location: Location;
  public _cookie: CookieService;
  public _translate: TranslateService;
  public _toastr: ToastrService;
  public _datePipe: DatePipe;
  public _snackBar: MatSnackBar;
  constructor(public injector: Injector) {
    this._router = AppInjector.get(Router);
    this._activeRoute = AppInjector.get(ActivatedRoute);
    this._fb = AppInjector.get(FormBuilder);
    this._dialog = AppInjector.get(MatDialog);
    this._cookie = AppInjector.get(CookieService);
    this._location = AppInjector.get(Location);
    this._translate = AppInjector.get(TranslateService);
    this._toastr = AppInjector.get(ToastrService);
    this._datePipe = AppInjector.get(DatePipe);
    this._snackBar = AppInjector.get(MatSnackBar);
  }
}
