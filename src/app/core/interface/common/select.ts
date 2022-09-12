export interface ServerMultipleResponseDropDown{
  code: number
  data: {
    records: SelectOption[]
    totalRecords: number
  }
  message: string
}

export interface SelectOption{
  id: string;
  title:string;
  code?:string;
  parent_id?:string;
}
