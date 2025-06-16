import { AbstractControl, ValidationErrors, ValidatorFn, FormGroup } from '@angular/forms';

export function Validate_A_LessThan_B(field1: string, field2: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    if (!(group instanceof FormGroup)) return null;

    const fieldA = group.get(field1);
    const fieldB = group.get(field2);

    if (!fieldA || !fieldB) return null;

    const valA = parseFloat(fieldA.value);
    const valB = parseFloat(fieldB.value);

    const bothValid = !isNaN(valA) && !isNaN(valB);

    if (bothValid && valA >= valB) {
      const error = { Validate_A_LessThan_B: true };

      fieldA.setErrors({ ...(fieldA.errors || {}), ...error });
      fieldB.setErrors({ ...(fieldB.errors || {}), ...error });
    } else {
      // Clear only our specific error
      if (fieldA.errors?.Validate_A_LessThan_B) {
        const { Validate_A_LessThan_B, ...others } = fieldA.errors;
        fieldA.setErrors(Object.keys(others).length ? others : null);
      }
      if (fieldB.errors?.Validate_A_LessThan_B) {
        const { Validate_A_LessThan_B, ...others } = fieldB.errors;
        fieldB.setErrors(Object.keys(others).length ? others : null);
      }
    }

    return null;
  };
}
