## PreInstall Depenendies

### For Linting Errors
#### https://typescript-eslint.io/rules/no-inferrable-types/

### tsconfig.json
```json
  "compilerOptions": {
    "strict":false,
    "noImplicitAny": false,
    "noPropertyAccessFromIndexSignature": false,
```
### Dependencies
```json
    "@angular/material": "^14.2.1",
    "@ngx-translate/core": "^14.0.0",
    "ngx-cookie-service": "^14.0.1",
    "ngx-toastr": "^15.0.0",
    "rxjs": "~7.5.0",
    "sweetalert2": "^11.4.32",
```
### Dev Dependencies
```json
    "@angular-eslint/eslint-plugin": "^14.0.4",
    "@typescript-eslint/eslint-plugin": "^5.36.2",
    "@typescript-eslint/parser": "^5.36.2",
    "eslint": "^8.23.1",
    "ngx-mat-intl-tel-input": "^5.0.0",
    "ngx-mat-select-search": "^4.2.1",
    npm i prettier-eslint

```
### Disabled Linting Errors
```json
"off" or 0 - turn the rule off
"warn" or 1 - turn the rule on as a warning (doesn't affect exit code)
"error" or 2 - turn the rule on as an error (exit code will be 1)


.eslintrc.json
  "rules": {
    "@typescript-eslint/no-inferrable-types": "warn"
  },
```
