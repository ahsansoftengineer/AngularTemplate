import { ACTION } from '../../enums/action.enum';

// Interface Segregation Principle
export interface SideBarMenus extends FlattenSideBarMenus {
  submenu?: SideBarMenus[];
}
export interface FlattenSideBarMenus extends SubPermission {
  id?: number;
  title?: string;
  sort_order?: number;
  parent_id?: number;
  controller?: string;
  function?: string;
  icon?: string;
  class?: string;
  labelClass?: string;
  label?: string;
  extralink?: boolean;
  has_external?: boolean;
}
export interface SubPermission {
  path?: string;
  permission?: Permission[];
}
export interface Permission {
  id?: number;
  module_list_id?: number;
  name?: ACTION;
  subPermission?: SubPermission[];
}
