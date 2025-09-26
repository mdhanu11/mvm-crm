import { Permission } from "../types/common.type";

export interface sideBarSchemaInterface {
    id: string,
    name: string,
    icon: any,
    position: string,
    link: string,
    permission?: Permission
}
