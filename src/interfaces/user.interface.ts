export enum ProfileTypes {
  Company = 1,
  Admin,
}

export interface User {
  email?: string;
  password?: string;
  profile_type?: ProfileTypes;
  isLoggedIn?: boolean;
  isVerified?: boolean;
  profile?: ProfileTypes;
}
