import { Permission, Role } from "../../types/common.type";

export type UserType={
    username: string,
    full_name: string,
    role: Role,
    permissions: Permission[],
}