import { IUser } from "./user.interface"

export enum StatusLogin {authenticated, unauthenticated}

export interface ILogin {
    username: string,
    password: string
}

export interface IForgot {
    email: string,
}

export interface IRegister {
    name: string,
    email: string,
    username: string,
    password: string,
}

export interface IResLogin {
  token: string,
  user: IUser
}
