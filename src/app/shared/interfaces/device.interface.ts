import { IUser } from "./user.interface"

export interface IDevice{
    id?: string
    user?: IUser
    model?: string
    address?: string
}

export interface IDeviceForm{
    id?: string
    user?: string
    model?: string
    address?: string
}