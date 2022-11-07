import { SideBarMenus } from '../interface/common/router-module';
import { P, C } from './menu-items-settings';

export const ROUTES: SideBarMenus[] = [
  C('Dashboard', 'dashboard', '/dashboard'),
  C('Feature 1', 'assignment', '/feature1'),
  C('Feature 1', 'domain', '/feature1/list'),
  C('Feature 1', 'folder-share', '/feature1/edit'),
  C('Feature 1', 'email', '/feature1/detail'),
  P('Deposit', 'money', [
    C('Cash deposit bank', 'cash', '/deposit/cash_deopsit_bank')
  ]),
];
