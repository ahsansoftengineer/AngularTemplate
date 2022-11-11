import { ACTION } from '../../enums/action.enum';
export interface SideBarMenus {
  id?: number;
  title?: string;
  sort_order?: number;
  icon?: string;
  class?: string;
  link?: string;
  external_link?: string;
  path?: string;
  submenu?: Partial<SideBarMenus[]>;
  permission?: string; // Permission[];
}
export interface Permission {
  id?: number;
  name?: ACTION;
}
