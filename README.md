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
19. Naming Conventions
> * Files and Folder must be Kebab Case my-file
> * Class Members Variable, properties Lower Camel Case myVariableName
> * Classes Upper Camel Case MyClassName
> * Global (Constant, Enums) Upper Case MY_CONST, MY_ENUMS
> * Server Naming Convention Override Local Preference
## [FILES AND FOLDER STRUCTURE](#)
### [CORE MODULE](#)
> * Most Common Files as per Folder those Required at Application Level
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
> * SideBar
> * Header
#### Interface
1. ServerMultipleResponse
2. ServerSingleResponse
3. ValidatorParamInterface
4. HttpParamInterface
#### Constants
> * Pure Functions
#### Static Class
> * Group of Functions
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
> * Confirmation
> * Success
2. Controls
> * Text
> * Dropdown
> * AutoComplete
> * Table
> * Utils
#### Pipes
> * DateTime
> * Currency
#### Partial
> * Content Projection 
#### Decorator
#### Directive
> * Permission
> * Form Control
> * Has
#### Guards / Resolver
> * DisRegard
> * IsUser
> * hasRole
#### Interceptors
> * AccessToken
> * Auth
> * Loader
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
