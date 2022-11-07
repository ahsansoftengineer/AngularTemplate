import { SideBarMenus } from '../interface/common/router-module';
import { P, C } from './menu-items-settings';

export const ROUTES: SideBarMenus[] = [
  C('Dashboard', '/dashboard'),
  C('Feature 1', '/feature1'),
  P('Deposit', 'deposit', [
    C('Cash deposit bank', '/deposit/cash_deopsit_bank')
  ]),
];
