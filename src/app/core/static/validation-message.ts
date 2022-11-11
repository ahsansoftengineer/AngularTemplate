export abstract class VAL {
  static _translate: any;
  static ENTER = (val: any) => {
    return {
      key: 'ENTER',
      lbl: val,
      en: 'Please enter ' + val,
      ur: ' براہ کرم'.concat(
        ' ',
        this._translate?.instant(val),
        ' ',
        'درج کریں۔'
      ),
    };
  };
  static SELECT = (val: any) => {
    return {
      key: 'SELECT',
      lbl: val,
      en: 'Please select ' + val,
      ur: ' براہ کرم'.concat(
        ' ',
        this._translate.instant(val),
        ' ',
        'منتخب کریں۔'
      ),
    };
  };
  static WHITE_SPACE = {
    key: 'WHIE_SPACE',
    en: 'White space not allowed',
    ur: 'خالی جگہ کی اجازت نہیں ہے۔',
  };
  static MAX_CHAR = (val: any) => {
    return {
      key: 'MAX_CHAR',
      en: 'Maximum ' + val + ' characters allowed',
      ur: ' زیادہ سے زیادہ'.concat(' ', val, ' ', 'حروف کی اجازت ہے۔'),
    };
  };
  static MIN_CHAR = (val: any) => {
    return {
      key: 'MIN_CHAR',
      en: 'Minimum ' + val + ' characters allowed',
      ur: ' کم از کم'.concat(' ', val, ' ', 'حروف کی اجازت ہے۔'),
    };
  };
  static NUM = {
    key: 'NUM',
    en: 'Only numbers allowed',
    ur: 'صرف نمبروں کی اجازت ہے۔',
  };
  static DECIMAL = {
    key: 'DECIMAL',
    en: 'Only whole numbers allowed',
    ur: 'اعشاریہ نمبر کی اجازت نہیں ہے۔',
  };
  static MIN = (val: any) => {
    return {
      key: 'MIN',
      en: 'Minimum digits ' + val + ' allowed',
      ur: ' کم از کم'.concat(' ', val, ' ', 'ہندسے کی اجازت ہے۔'),
    };
  };
  static MAX = (val: any) => {
    return {
      key: 'MAX',
      en: 'Maximum digits ' + val + ' allowed',
      ur: ' زیادہ سے زیادہ'.concat(' ', val, ' ', 'ہندسے کی اجازت ہے۔'),
    };
  };
  static NUM_POS = {
    key: 'NUM_POS',
    en: 'Only positive numbers allowed',
    ur: 'منفی نمبروں کی اجازت نہیں ہے۔',
  };
  static ALPHA = {
    key: 'ALPHA',
    en: 'Only alphabets allowed',
    ur: 'صرف انگریزی حروف تہجی کی اجازت ہے۔',
  };
  static ALPHANUM = {
    key: 'ALPHANUM',
    en: 'Only alphabets and numbers allowed',
    ur: 'صرف انگریزی حروف تہجی اور ریاضی کے نمبروں کی اجازت ہے۔',
  };
  static HYPHEN = {
    key: 'HYPHEN',
    en: 'Hyphen not allowed at start and end',
    ur: 'شروع اور آخر میں ہائفن (-) کی اجازت نہیں ہے۔',
  };
  static PATTERN = {
    key: 'PATTERN',
    en: 'Special characters not allowed',
    ur: 'خصوصی حروف کی اجازت نہیں ہے۔',
  };
  static EMAIL = {
    key: 'EMAIL',
    en: 'Invalid email containing "@, .com"',
    ur: 'ای میل ایڈریس کو '.concat(
      ' ',
      'abc@xyz.com',
      'پیٹرن کی پیروی کرنا چاہیے'
    ),
  };
  static PASSWORD = {
    key: 'PASSWORD',
    en: 'Invalid password must contains Upper Case, Lower Case, Number and Special Character.',
    ur: 'پاس ورڈ میں اپر کیس، لوئر کیس، نمبر اور خصوصی کریکٹر ہونا چاہیے۔',
  };
  static DATE_EQUAL = {
    key: 'DATE_EQUAL',
    en: 'Date must be equal current date',
    ur: ' تاریخ موجودہ تاریخ کے برابر ہونی چاہیے۔',
  };
  static MIN_DATE = {
    key: 'MIN_DATE',
    en: 'Date must be <= current date',
    ur: ' تاریخ موجودہ تاریخ سے کم اور مساوی ہونی چاہیے۔',
  };
  static MAX_DATE = {
    key: 'MAX_DATE',
    en: 'Date must be >= current date',
    ur: ' تاریخ موجودہ تاریخ سے بڑی اور مساوی ہونی چاہیے۔',
  };
  static CONFIRM = {
    key: 'CONFIRM',
    en: 'Please enter Confirm Password',
    ur: 'براہ کرم تصدیقی پاس ورڈ درج کریں۔',
  };
  static MATCH = {
    key: 'MATCH',
    en: 'Your passwords are not match',
    ur: 'آپ کے پاس ورڈ ایک جیسے ہونے چاہئیں',
  };
  static DUPLICATE = {
    key: 'DUPLICATE',
    en: 'Duplicate Selection Not Allowed',
    ur: 'ڈپلیکیٹ انتخاب کی اجازت نہیں ہے۔',
  };
}
