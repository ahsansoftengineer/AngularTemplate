export interface ValidatorParam {
  fn: string; // Field Name
  isField: number; // Text / Selection Option
  authorized: any;
  min: number;
  max: number;
  decimal: number;
  minChar: number;
  maxChar: number;
  num: number;
  hypenreg: any;
  alpha: number;
  alphaNum: number;
  specialChar: number;
  email: number;
  password: number;
}
