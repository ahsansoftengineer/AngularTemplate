# [ANGULAR ARCHETECTURE](#)
## [ANGULAR BEST PRACTICIES](#)
1. Follows SOLID / OOP
2. Follows Files and Folder Structure
3. Use Servicies rather than base Classes (But Both are mendatory)
4. Components Constructor Only Use for Service Injection
5. Dont Write Huge Lines of Code in OnInit
6. Use Rapper Component for External Libraries
7. Constructor & OnInit will availaible at top of every Component
8. Avoid Servicies Depends on Other Servicies
9. If Components Exceed 200 To 300 Lines of Code Split it into Multiple Files
10. Make Component for all Controls (Text, Dropdown, Auto Complete, Radio, Checkbox, Button etc...)
11. Group Several Related Properties into Object
12. Instead of Using Several Arguments pass Object
13. Use Default Properties Where possible
15. Only Global Loader Use to Display Request in Progress
16. Mostly Used Angular Services will be the Part of AngularServiceAbstractClass
17. Mostly Used Helper Services will be the Part of HelperServiceAbstractClass
18. Avoid using Third Party Libraries that Cause Update Problem
## [FOLDER AND FILES STRUCTURE](#)
### [CORE MODULE](#)
* * Most Common Files as per Folder those Required at Application Level
#### Class
1. Class Builders
2. Abstract Classes
3. Angular Service Injector
4. Local Service Injector
5. Form Base Class
6. List Base Class
7. Methods Base Class
#### Models
1. Reusable Forms & Interface Side by Side
#### Services 
1. Form Helper Service
2. Base Service
3. Helper Service
4. Form Service
5. Validator Service
6. Http Service
7. State Service
8. Swal Service
9. Theme Services
* * SideBar
* * Header
#### Interface
1. ServerMultipleResponse
2. ServerSingleResponse
3. ValidatorParamInterface
4. HttpParamInterface
#### Constants
* Pure Functions
#### Static Class
* Group of Functions
#### Enums
1. Permission
2. Action
3. Endpoints
### [SHARED MODULE](#)
#### Modules
1. AngularzModule
2. MatzModule
3. OtherModules
4. RootModule
#### Components Module (Controls Component)
1. Dialog Module (Dialog Boxs)
* * Confirmation
* * Success
2. Controls
* * Text
* * Dropdown
* * AutoComplete
* * Table
* * Utils
#### Pipes
* * DateTime
* * Currency
#### Partial
* * Content Projection 
#### Decorator
#### Directive
* * Permission
* * Form Control
* * Has
#### Guards / Resolver
* * DisRegard
* * IsUser
* * hasRole
#### Interceptors
* * AccessToken
* * Auth
* * Loader
### [THEME MODULE](#)
1. Sidebar (Left, Rigth, Top, Bottom)
2. Headers
3. Footer
4. MasterComponent
### [AUTH MODULE](#)
1. Sign In
2. Sign Up
3. Forget Password
4. Rest Password
5. etc..
### [FEATURE ROUTING MODULE](#)
1. Error (401, 404, 500)
2. Admin
3. Customer
4. Product etc...
# [EXTERNAL LIBRARIES](#)
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
    "@ngx-translate/core": "^14.0.0",
    "@ngx-translate/http-loader": "^7.0.0",
    "libphonenumber-js": "^1.10.13",
    "ngx-cookie-service": "^14.0.1",
    "ngx-mat-intl-tel-input": "^5.0.0",
    "ngx-mat-select-search": "^4.2.1",
    "ngx-spinner": "^14.0.0",
    "ngx-toastr": "^15.0.0",
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
