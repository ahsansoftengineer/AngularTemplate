// Interface Segregation Principle

export interface Server_Response {
  errors?: Server_Errors[];
  code?: string;
  message?: string;
  component: string; // for frontend
  component_message: string; // for frontend
}
// Secondary Server Error
export interface Server_Errors {
  type?: string;
  field_name?: string;
  detail?: Error_Detail_Server[];
}
// Tritory Server Side Error
export interface Error_Detail_Server {
  code?: string;
  message?: string;
}

// Internal Validation Error Type
export interface Error_Internal {
  ERROR?: {
    key?: string;
    message?: string;
  };
}

// {
//   "errors":[
//      {
//         "type":"validation_error",
//         "field_name":"title",
//         "detail":[
//            {
//               "code":"10301",
//               "message":"Please provide title."
//            }
//         ]
//      },
//      {
//         "type":"validation_error",
//         "field_name":"system_id",
//         "detail":[
//           {
//             "code": "101012",
//             "message":"The system id field is required."
//           }
//         ]
//      }
//   ],
//   "code":10000,
//   "message":"Unprocesssable Entity."
// }
