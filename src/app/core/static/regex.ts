/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-inferrable-types */
export abstract class RegExps {
  static SPECIALCHARS: RegExp = /[!~`@$%^&*()+\=\[\]{};':"\\|<>\?]/;
  // alpha: RegExp = /([a-zA-Z _-]+)$/;
  static ALPHA: RegExp = /^[a-zA-Z -]*$/;
  static DATE_RANGE : RegExp = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
  static WHITE_SPACE: RegExp = /^[^\s]+(\s+[^\s]+)*$/;
  static HYPHEN_REG: RegExp = /^(?!-).*[^-]$/;
  static ALPHANUM: RegExp = /([a-zA-Z0-9 _-]+)$/;
  static NUM: RegExp = /([0-9]+)$/;
  static POSITIVENUM : RegExp = /^(?:[+\d].*\d|\d)$/;
  static EMAIL: RegExp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  static PASSWORD: RegExp =
  /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,}$/;
}
