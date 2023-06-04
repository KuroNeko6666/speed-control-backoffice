import { IDevice } from "./device.interface"
import { IUser } from "./user.interface"

export interface IDeviceData{
    id?: string
    device?: IDevice
    speed?: number
    distance?: number
    datetime?: string
}
