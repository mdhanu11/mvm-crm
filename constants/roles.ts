// src/constants/roles.ts


export const PERMISSIONS = {
  admin: ['add_staff', 'edit_staff'],
  staff: ['add_employee', 'edit_employee'],
} as const;

export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS][number];
