export interface User {
  id: string;
  name: string;
}

export enum AccountKind {
  Local = "local",
  Google = "google"
}

export enum UserRole {
  Internal = "internal",
  Admin = "admin"
}

export interface UserCurrent {
  name: string;
  email: string;
  accountKind: AccountKind;
  role: UserRole;
}
