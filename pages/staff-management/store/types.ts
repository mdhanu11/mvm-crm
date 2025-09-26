import { Permission, Role } from "../../../types/common.type"

export type StaffInterface={
    username: string,
    email: string,
    full_name: string,
    module_permissions: Permission[],
    role: Role,
}