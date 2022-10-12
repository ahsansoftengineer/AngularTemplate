import { Injectable, Injector } from "@angular/core";

@Injectable()
export class ProviderService {
  private static injector: Injector | undefined = undefined;
  public constructor(injector: Injector) {
    ProviderService.injector = injector;
  }
  public static getInstance(): Injector {
    if (!ProviderService.injector) {
      throw new Error('DecoratorService not initialized');
    }
    return ProviderService.injector;
  }
}
// constructor(injector: Injector, providerService: ProviderService) {
//   super(injector);
// }
