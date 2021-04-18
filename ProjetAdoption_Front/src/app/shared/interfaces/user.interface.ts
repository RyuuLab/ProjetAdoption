export interface IUser{
  id_user: number;
  username?: string;
  email?: string;
  password?: string;
  accesToken?: string;
  roles?: string[];
  tokenType?: string;
}
