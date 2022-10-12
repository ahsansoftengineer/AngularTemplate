import { HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
// Custom Class Should be abstract and has all Static Methods
export abstract class Custom {
  public static handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => error);
  }
  public static jsontoFormData(
    jo: any, // Json Object
    pk = '', // Parent Key
    carryFormData: FormData
  ): FormData {
    const formData = carryFormData || new FormData();
    let index = 0;
    Object.keys(jo).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(jo, key)) {
        if (jo[key] !== null && jo[key] !== undefined) {
          let propName = pk || key;
          if (pk && this.isObject(jo)) {
            propName = pk + '[' + key + ']';
          }
          if (pk && this.isArray(jo)) {
            propName = pk + '[' + index + ']';
          }
          if (jo[key] instanceof File) {
            formData.append(propName, jo[key]);
          } else if (jo[key] instanceof FileList) {
            for (let j = 0; j < jo[key].length; j++) {
              formData.append(propName + '[' + j + ']', jo[key].item(j));
            }
          } else if (this.isArray(jo[key]) || this.isObject(jo[key])) {
            this.jsontoFormData(jo[key], propName, formData);
          } else if (typeof jo[key] === 'boolean') {
            formData.append(propName, +jo[key] ? '1' : '0');
          } else {
            formData.append(propName, jo[key]);
          }
        }
      }
      index++;
    });
    return formData;
  }
  // FOR CHECKING THE GIVEN INPUT IS ARRAY
  public static isArray(val: any) {
    const toString = {}.toString;
    return toString.call(val) === '[object Array]';
  }
  // FOR CHECKING THE GIVEN INPUT IS OBJECT
  private static isObject(val: any) {
    return !this.isArray(val) && typeof val === 'object' && !!val;
  }
  public static objToURLQuery(searchObject: any) {
    let result = '';
    const obj = searchObject;
    Object.keys(obj).forEach((key) => {
      if (
        obj[key] != null &&
        obj[key] != '' &&
        obj[key] != undefined &&
        typeof obj[key] != 'object'
      ) {
        result += '&' + key + '=' + obj[key];
      }
    });
    if (result) result = result.substring(1, result.length);
    return result;
  }
  public static arrayToObj(arr: any) {
    // first make sure that each val is between quotes
    const res = arr.map((val: any) => val);
    // join the vals with the comma's in between
    let result = res.join(',');
    // add the final brackets around it
    result = '(' + result + ')';
    return result;
  }
  // Most Used by doesn't required
  public static emptyCheck(val: any) {
    return val != undefined && val != null && val != '';
  }
}
