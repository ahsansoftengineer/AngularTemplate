import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { URLz } from '../enums/url.enum';
import { ServerMultipleResponseDropDown } from '../interface/common/select';
import { ServerMultipleResponse } from '../interface/common/server-multiple-response';
import { ServerSingleResponse } from '../interface/common/server-single-response';
import { HttpServiceParam } from '../interface/common/http-service-param';
import { AngularServiceInjector } from '../class/angular-service-injector';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
/**
  BASE HTTP SERVICE
  #1 Top Level Service
  0. Cannot be Extended
  1. Must have url with Set to Global URL
    a. This Service can only be depend on Angular Dependencies
    b. This Service Cannot Depend on any Service
      (e.g Validator, Form Service)
    c. Otherwise it could cause Circular Dependency
  2. Must Inject httpClient Module
  4. Must have following (CRUD) Methods (gets, get, create, update, delete, modify)
  5. All CRUD Methods must expect HttpServiceParam Interface
  6. All getter Observable Methods Return Type Must be
    a. ServerSingleResponse
    b. ServerMultipleResponse
    c. ServerMultipleResponseDropDown
  7. All Supported Methods must be private

*/
export class HTTPService extends AngularServiceInjector {
  private readonly url: string = environment.API_URL;
  readonly http: HttpClient;
  // Marking Private Because Typescript does not support
  // sealed and final key word
  private constructor(injector: Injector) {
    super(injector);
    this.http = injector.get(HttpClient);
  }
  get(param: Partial<HttpServiceParam>): Observable<ServerSingleResponse> {
    return this.http.get<ServerSingleResponse>(this.finalResult(param)).pipe(
      catchError((error) => {
        return this.handleError(error, param);
      })
    );
  }
  gets(param: Partial<HttpServiceParam>): Observable<ServerMultipleResponse> {
    return this.http.get<ServerMultipleResponse>(this.finalResult(param)).pipe(
      tap((res) => {
        if (!res?.data?.records?.length) {
          this._toastr.warning('No Records Found', 'Message');
        }
      }),
      catchError((error) => {
        return this.handleError(error, param);
      })
    );
  }
  create(param: Partial<HttpServiceParam>): Observable<any> {
    return this.http.post(this.finalResult(param), param.body).pipe(
      catchError((error) => {
        return this.handleError(error, param);
      })
    );
  }
  update(param: Partial<HttpServiceParam>): Observable<any> {
    return this.http.post(this.finalResult(param, 'PUT'), param.body).pipe(
      catchError((error) => {
        return this.handleError(error, param);
      })
    );
  }
  delete(param: Partial<HttpServiceParam>): Observable<any> {
    return this.http.post(this.finalResult(param, 'DELETE'), param.body).pipe(
      catchError((error) => {
        return this.handleError(error, param);
      })
    );
  }
  // Only For Transaction
  modify(param: Partial<HttpServiceParam>): Observable<any> {
    return this.http.patch(this.finalResult(param, 'PATCH'), param.body).pipe(
      catchError((error) => {
        return this.handleError(error, param);
      })
    );
  }
  status(param: Partial<HttpServiceParam>) {
    return this.http.post(this.finalResult(param, 'PATCH'), param.body).pipe(
      catchError((error) => {
        return this.handleError(error, param);
      })
    );
  }
  org_id = '';
  sys_id = '';
  select(
    param: Partial<HttpServiceParam>
  ): Observable<ServerMultipleResponseDropDown> {
    const FinalParam = {
      ...this.defaultParametersSelect,
      ...param,
      query: {
        ...this.defaultParametersSelect.query,
        ...param.query,
      },
    };
    return this.http
      .get<ServerMultipleResponseDropDown>(
        this.convertObjectToUrlQueryParameter(FinalParam)
      )
      .pipe(
        catchError((error) => {
          return this.handleError(error, param);
        })
      );
  }
  private finalResult(param: Partial<HttpServiceParam>, _method: string = '') {
    const result = this.mergeParam(param, _method);
    return this.convertObjectToUrlQueryParameter(result);
  }
  private mergeParam(param: HttpServiceParam, _method: string) {
    const query = { ...this.defaultParam.query, ...param.query, _method };
    return { ...this.defaultParam, ...param, query };
  }
  private convertObjectToUrlQueryParameter(param: Partial<HttpServiceParam>) {
    let result = '';
    if (param.endpoint == URLz.DEFAULT) result = param.url;
    if (param.endpoint != URLz.DEFAULT) result = param.url + param.endpoint;
    if (param?.resource) result += '/' + param.resource;
    // if (param?.param) this.urlQueryToObject(param);
    if (param.query != null) result += '?' + this.objToURLQuery(param);
    return result;
  }
  // private urlQueryToObject(param: Partial<HttpServiceParam>) {
  //   if(param.param){
  //     try{
  //       const newqueryect =
  //       JSON.parse('{"' +
  //         decodeURI(param.param)
  //           .replace(/"/g, '\\"')
  //           .replace(/&/g, '","')
  //           .replace(/=/g,'":"') +
  //         '"}')
  //       param.query = {
  //         ...newqueryect,
  //         ...param.query
  //       }
  //     } catch(erro){
  //       console.error('Invalid Parameters ->' + param.param)
  //     }
  //   }
  // }
  private objToURLQuery(param: Partial<HttpServiceParam>) {
    // For Simple Object Only
    let result = '';
    const obj = param.query;
    Object.keys(obj).forEach((key) => {
      if (obj[key] != null && obj[key] != '' && obj[key] != undefined) {
        result += '&' + key + '=' + obj[key];
      }
    });
    if (result) result = result.substring(1, result.length);
    return result;
  }
  private get defaultParametersSelect(): HttpServiceParam {
    if (this.org_id && this.sys_id) {
      return {
        url: this.url,
        query: {
          organisation_id: this.org_id,
          system_id: this.sys_id,
        },
      };
    } else if (this.org_id) {
      return {
        url: this.url,
        query: {
          organisation_id: this.org_id,
        },
      };
    }
    return { url: this.url };
  }
  private handleError(
    error: HttpErrorResponse,
    param: Partial<HttpServiceParam>
  ): Observable<never> {
    console.group(param.endpoint);
    console.error({ param, error });
    console.groupEnd();
    if (error.status == 0) {
      this._toastr.error('Server down please try later.', 'Server Error');
    } else if (error.status == 500) {
      this._toastr.error('Internal Server Error', 'Server Error');
    }
    return throwError(() => new HttpErrorResponse(error));
  }
  get defaultParam(): HttpServiceParam {
    return {
      endpoint: URLz.NO_SET,
      url: this.url,
      query: {},
    };
  }
}
