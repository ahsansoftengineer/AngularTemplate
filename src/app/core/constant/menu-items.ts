import { SideBarMenus } from '../interface/common/router-module';
import { P, C } from './menu-items-settings';

export const ROUTEZ: SideBarMenus[] = [
  C('Dashboard', 'dashboard', '/dashboard'),
  P('Feature 1', 'assignment', '/feature1/list', [
    C('List', 'domain', '/feature1/list'),
    C('Edit', 'folder-share', '/feature1/edit'),
    C('Detail', 'email', '/feature1/detail'),  
  ]),
  C('Feature 2', 'domain', '/feature2/list'),
  C('Feature 3', 'folder-share', '/feature3/edit'),
  C('Feature 4', 'email', '/feature4/list'),
  P('Deposit', 'money', '/feature4/list', [
    C('Cash deposit bank', 'cash', '/feature4/list')
  ]),
];
