import Swal, { SweetAlertOptions } from 'sweetalert2';

// Confirmable is now a factory function, with an optional parameter object
export function Confirmable(options?: SweetAlertOptions) {
  // our factory function will return our actual decorator function, but now we have
  // an actual options object to configure our alert box :)
  return (
    target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) => {
    // the usual, caching the original implementation
    const originalMethod = descriptor.value;
    // default values for our config, we’ll overwrite this with our options parameter
    const config: SweetAlertOptions = {
      title: 'Are you sure?',
      html: 'Do you want to perform this action?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
      icon: 'question',
    };

    // overwrite any keys passed in to our decorator in the config object
    if (options) {
      Object.keys(options).forEach((x) => (config[x] = options[x]));
    }

    // from here it’s the same as before. We write the new implementation
    descriptor.value = async function (...args) {
      // ask for confirmation
      const res = await Swal.fire(config);
      if (res.isConfirmed) {
        // run original implementation if user confirms
        const result = originalMethod.apply(this, args);
        return result;
      }
    };
    return descriptor;
  };
}
// Usage
// @Confirmable({ title: 'Are you sure', html: 'Do you want to delete this item?’, icon: 'warning'})
// deleteItem(): void {
// }
