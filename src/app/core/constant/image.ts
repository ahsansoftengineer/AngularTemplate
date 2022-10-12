import { environment } from "src/environments/environment";

const IMG_FULL_URL = (environment as any).HOST_URL + 'assets/'
export const IMG_URL = {
  BOX :  IMG_FULL_URL + 'box/',
}
