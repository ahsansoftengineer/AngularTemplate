import { ACTION } from "../enums/action.enum";
import { SideBarMenus } from "../interface/common/router-module";
import { defaultProp, P, permission, R, UserSubPermission } from "./vertical-menu-items-settings";

export const ROUTES: SideBarMenus[] = [
  R('DM Dashboard', '/dm_dashboard'),
  R('Knock Off', '/knock_off'),
  P('User', [{
    path: '/user/user',
    title: 'User',
    ...defaultProp,
    permission: [
      ...permission,
      {
        name: ACTION.ADD,
        subPermission: UserSubPermission
      },
      {
        name: ACTION.EDIT,
        subPermission: UserSubPermission
      }
    ]
  }]),
  P('Deposit', [
    R('Cash deposit bank', '/deposit/cash_deopsit_bank',),
  ]),
];
