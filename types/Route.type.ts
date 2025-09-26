import { Permission, Role } from "./common.type";

export interface AppRoute {
  path: string;
  element: any;
  children?: AppRoute[];
  layout?: any;
  roles?: Role[];
  permission?: Permission;
}
