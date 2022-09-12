import { Injector } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DatePipe, Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';

// # 1 SOLID PRINCIPLE (Single Responsibility Principle)
// 1. Single responsibility principle: a class should have one, and only one, reason to change;
// 2. When you only want to Inject a Service
export abstract class AngularServiceInjector   {
  // Angular Services
  _activeRoute: ActivatedRoute;
  _router: Router;
  _dialog: MatDialog;
  _fb: FormBuilder;
  _location: Location
  _cookie: CookieService
  _translate: TranslateService
  _toastr: ToastrService;
  _datePipe: DatePipe
  _snackBar: MatSnackBar
  constructor(public injector: Injector) {
    this._router = injector.get(Router);
    this._activeRoute = injector.get(ActivatedRoute);
    this._fb = injector.get(FormBuilder);
    this._dialog = injector.get(MatDialog);
    this._cookie = injector.get(CookieService);
    this._location = injector.get(Location);
    this._translate = injector.get(TranslateService);
    this._toastr = injector.get(ToastrService);
    this._datePipe = injector.get(DatePipe);
    this._snackBar = injector.get(MatSnackBar);
  }
}
