import { ACTION } from '../enums/action.enum';
import { SideBarMenus } from '../interface/common/router-module';

export const permission = [
  ACTION.ADD,
  ACTION.EDIT,
  ACTION.VIEW,
  ACTION.STATUS,
  ACTION.DELETE,
  ACTION.EVERY
];
export const defaultChild: SideBarMenus = {
  // icon: 'dashboard',
  // class: '',
  permission: JSON.stringify(permission),
  submenu: [],
};
export const defaultParent: SideBarMenus = {
  ...defaultChild,
  permission: undefined,
  // path: '',
  // icon: 'icon-list',
  // class: 'has-arrow',
};
// PARENT LIST
let id = 1
export function P(title: string, icon: string, link: string,  submenu: SideBarMenus[]) {
  return {
    id:id++,
    title,
    icon,
    link, // Equal to First Child
    ...defaultParent,
    submenu,
  };
}
// CHILD LIST
export function C(title: string, icon: string, link: string) {
  return {
    id:id++,
    link,
    title,
    icon,
    ...defaultChild,
  };
}
