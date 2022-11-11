/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-inferrable-types */
export abstract class RegExps {
  // NUMERIC
  // static NUM: RegExp = /^[0-9]*$/;
  static NUM: RegExp = /^(\d+(\.\d+)?)$/; // Numerics and decimals
  static NO_DECIMAL: RegExp = /^[\d]*$/;
  static DECIMAL = (precision: number): RegExp => {
    var expression = /^\d+\.{0,1}\d{0,2}$/;
    return new RegExp(expression);
  };

  // ALPHABATIC
  static ALPHA: RegExp = /^[a-zA-Z -]*$/;
  static ALPHANUM: RegExp = /([a-zA-Z0-9 _-]+)$/;
  static DATE_RANGE: RegExp =
    /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;

  // SPECIFIC
  static SPECIALCHARS: RegExp = /[!~`@$%^&*()+\=\[\]{};':"\\|<>\?]/;
  static WHITE_SPACE: RegExp = /^[^\s]+(\s+[^\s]+)*$/;
  static HYPHEN_REG: RegExp = /^(?!-).*[^-]$/;

  static EMAIL: RegExp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  static PASSWORD: RegExp =
    /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,}$/;
  static POSITIVENUM: RegExp = /^(?:[+\d].*\d|\d)$/;
}
