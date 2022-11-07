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
export const defaultChild: SideBarMenus = {
  // icon: 'dashboard',
  class: '',
  permission: JSON.stringify(permission),
  submenu: [],
};
export const defaultParent: SideBarMenus = {
  ...defaultChild,
  permission: undefined,
  path: '',
  icon: 'icon-list',
  class: 'has-arrow',
};
// PARENT LIST
export function P(title: string, icon: string, submenu: SideBarMenus[]) {
  return {
    title,
    ...defaultParent,
    submenu,
  };
}
// CHILD LIST
export function C(title: string, path: string) {
  return {
    path,
    title,
    ...defaultChild,
  };
}
