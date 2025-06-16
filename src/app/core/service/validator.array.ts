import { AbstractControl, FormArray } from '@angular/forms';

export function ValidateDuplicate(...fieldNames: string[]) {
  return (formArray: FormArray) => {
    const controls = formArray.controls;

    // Clear existing errors related to duplication
    controls.forEach((group) => {
      fieldNames.forEach((field) => {
        const control = group.get(field);
        if (control?.hasError('ValidateDuplicate') && control.errors) {
          const { ValidateDuplicate, ...others } = control.errors;
          control.setErrors(Object.keys(others).length ? others : null);
        }
      });
    });

    // Track seen value combinations
    const seen = new Map<string, AbstractControl[]>();

    controls.forEach((group) => {
      const keyValues: string[] = [];

      for (const field of fieldNames) {
        const control = group.get(field);
        if (!control || control.value == null) return; // skip if any field missing
        keyValues.push(control.value);
      }

      const key = JSON.stringify(keyValues);

      if (seen.has(key)) {
        const dupGroup = seen.get(key)!;

        // Mark all fields in both groups as duplicate
        [group, ...dupGroup].forEach((grp) => {
          fieldNames.forEach((field) => {
            const ctrl = grp.get(field);
            if (ctrl) {
              ctrl.setErrors({ ...ctrl.errors, ValidateDuplicate: true });
            }
          });
        });

        seen.get(key)!.push(group);
      } else {
        seen.set(key, [group]);
      }
    });

    return null;
  };
}


// This range is already defined.

export function ValidateRangeOverlap(field1: string, field2: string) {
  return (formArray: FormArray) => {
    const controls = formArray.controls;

    // First, clear all previous range overlap errors
    controls.forEach((group) => {
      const controlA = group.get(field1);
      const controlB = group.get(field2);
      if (controlA?.hasError('ValidateRangeOverlap')) {
        controlA.setErrors(null);
      }
      if (controlB?.hasError('ValidateRangeOverlap')) {
        controlB.setErrors(null);
      }
    });

    // Now check for overlaps between any two controls
    for (let i = 0; i < controls.length; i++) {
      const groupA = controls[i];
      const startA = groupA.get(field1)?.value;
      const endA = groupA.get(field2)?.value;

      if (startA == null || endA == null) continue;

      for (let j = i + 1; j < controls.length; j++) {
        const groupB = controls[j];
        const startB = groupB.get(field1)?.value;
        const endB = groupB.get(field2)?.value;

        if (startB == null || endB == null) continue;

        const overlap = Math.max(startA, startB) < Math.min(endA, endB);

        if (overlap) {
          groupA.get(field1)?.setErrors({ ValidateRangeOverlap: true });
          groupA.get(field2)?.setErrors({ ValidateRangeOverlap: true });
          groupB.get(field1)?.setErrors({ ValidateRangeOverlap: true });
          groupB.get(field2)?.setErrors({ ValidateRangeOverlap: true });
        }
      }
    }

    return null;
  };
}
