export interface ServerMultipleResponse {
  code: number;
  data: {
    records: any[];
    totalRecords: number;
  };
  message: string;
}
