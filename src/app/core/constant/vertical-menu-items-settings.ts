import { ACTION } from '../enums/action.enum';
import { SideBarMenus } from '../interface/common/router-module';

export const permission = [
  { name: ACTION.ADD },
  { name: ACTION.EDIT },
  { name: ACTION.VIEW },
  { name: ACTION.STATUS },
  { name: ACTION.DELETE },
  { name: ACTION.EVERY },
];
export const defaultProp: SideBarMenus = {
  icon: 'mdi mdi-adjust',
  class: '',
  labelClass: 'side-badge badge badge-pill text-white badge-danger',
  extralink: false,
  permission,
  submenu: [],
};
export const defaultParent: SideBarMenus = {
  ...defaultProp,
  permission: undefined,
  path: '',
  icon: 'icon-list',
  class: 'has-arrow',
};
export const UserSubPermission = [
  {
    path: 'allow_system',
    permission,
  },
  {
    path: 'user/allow_cash',
    permission,
  },
];
export function R(title: string, path: string) {
  return {
    path,
    title,
    ...defaultProp,
  };
}
export function P(title: string, submenu: SideBarMenus[]) {
  return {
    title,
    ...defaultParent,
    submenu,
  };
}
