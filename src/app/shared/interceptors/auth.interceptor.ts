import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  public userId;
  constructor(private cookie: CookieService) {
    if (!environment['LoadData']) {
      this.userId = 'MTEz';
      if (!this.cookie.check('local_user')) {
        this.cookie.set('local_user', this.userId);
        this.cookie.set('current_module', '2');
      }
    } else {
      this.userId = this.cookie.get('local_user');
    }
  }
  sessionCookie;
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.sessionCookie = this.cookie.get('access_token');
    this.userId = this.cookie.get('local_user');
    if (!request.headers.has('access-header')) {
      request = request.clone({
        headers: request.headers.set('access-header', this.sessionCookie),
        params: request.params.set('user_id', this.userId),
      });
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          localStorage.clear();
          this.cookie.deleteAll('/');
          window.location.href = environment['ERP_URL'];
        }
        return throwError(() => error);
      })
    );
  }
}
