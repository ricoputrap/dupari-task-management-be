import { EnumUserRole } from "./enums";

export enum EnumResource {
  BOARD = 'board',
  TASK = 'task',
}

// permissions.ts
export const permissions: Record<EnumResource, Record<string, EnumUserRole[]>> = {
  [EnumResource.BOARD]: {
    get: [EnumUserRole.OWNER, EnumUserRole.MEMBER],
    create: [EnumUserRole.OWNER, EnumUserRole.MEMBER],
    edit: [EnumUserRole.OWNER, EnumUserRole.MEMBER],
    delete: [EnumUserRole.OWNER], // Only owners can delete
    invite: [EnumUserRole.OWNER],  // Only owners can invite
  },
  [EnumResource.TASK]: {
    get: [EnumUserRole.OWNER, EnumUserRole.MEMBER],
    create: [EnumUserRole.OWNER, EnumUserRole.MEMBER],
    edit: [EnumUserRole.OWNER, EnumUserRole.MEMBER],
    delete: [EnumUserRole.OWNER, EnumUserRole.MEMBER], // Could adjust based on your needs
    assign: [EnumUserRole.OWNER, EnumUserRole.MEMBER],
    unassign: [EnumUserRole.OWNER, EnumUserRole.MEMBER],
  }
};