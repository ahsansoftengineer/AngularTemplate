import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpServiceParam } from './http-service-param';

export interface PartialSubmit {
  /**
   * @see {@link HttpServiceParam}
   */
  _activeId?: string;
  defaultHttpParam?: HttpServiceParam;
  param?: HttpServiceParam;
  mergeHTTPParam?: (ps: PartialSubmit) => void;
  before?: (ps: PartialSubmit) => void;
  validate?: (ps: PartialSubmit) => boolean | string;
  body?: (ps: PartialSubmit) => void;
  confirmation?: (ps: PartialSubmit) => void;
  confirmationAction?: (ps: PartialSubmit) => void;
  confirmationDeny?: (ps: PartialSubmit) => void;
  modifyCondition?: (ps: PartialSubmit) => boolean;
  update?: (ps: PartialSubmit) => Observable<any>;
  create?: (ps: PartialSubmit) => Observable<any>;
  httpCall?: (ps: PartialSubmit) => void;
  modify?: Observable<any>;
  next?: (ps: PartialSubmit, res: any) => void;
  error?: (ps: PartialSubmit, error: HttpErrorResponse) => void;
  complete?: (ps: PartialSubmit) => void;
  httpResultAction?: (ps: PartialSubmit, res: any) => void;
  id?: string;
}
