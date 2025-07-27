export interface Auth {
  mail: string;
  password: string;
}

export interface User extends Auth {
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}