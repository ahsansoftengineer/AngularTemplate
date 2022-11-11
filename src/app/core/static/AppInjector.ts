import {
  AbstractType,
  InjectFlags,
  InjectionToken,
  Injector,
  Type,
} from '@angular/core';
export class AppInjector {
  private static _injector: Injector;

  static set injector(injector: Injector) {
    this._injector = injector;
  }
  static get injector(): Injector {
    return this._injector;
  }
  static get<T>(
    token: ProviderToken<T>,
    notFoundValue?: T,
    flags?: InjectFlags
  ): T {
    return this._injector.get(token);
  }
}
export declare type ProviderToken<T> =
  | Type<T>
  | AbstractType<T>
  | InjectionToken<T>;
