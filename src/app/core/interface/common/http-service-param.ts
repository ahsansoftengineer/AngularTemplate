import { URLz } from "../../enums/url.enum";

export interface HttpServiceParam {
  body?: any; // Specific to CREATE, PATCH, DELETE
  resource?: string | number; // employee/1
  // param?: string; // ?id=1&name=Muhammad
  pid?: string; // (Parent ID ) Only Specific to SelectOptions / LOVs
  query?: any;// {id:1, name:Muhammad}
  endpoint?: URLz | string; // *Required masjidNabawi
  url?: string;// http://www.arab.madina/ || environment.API_URL
}


