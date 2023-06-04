export enum StatusNotification{warning, success, failure}
export enum StatusRequest {success, failure, loading, initial}


export interface INotification {
    id?: string
    title : string
    message: string
    status: StatusNotification
}

export interface IModal {
    title?: string
    message?: string
    status?: StatusNotification
}

export interface IParamUsers {
    search?: string
    offset?: number
    limit?: number
    role?: string
}

export interface IParamDevices {
    userID?: string
    search?: string
    offset?: number
    limit?: number
}

export interface IParamDashboardData {
  orderBy?: string
  search?: string
  deviceID?: string
  userID: string
}

export interface IParamDashboardUser {
  orderBy?: string
  search?: string
  role?: string
}

export interface IParamDashboardDevice {
  orderBy?: string
  search?: string
  userID?: string
}

export interface IParamDeviceData {
    deviceID?: string
    search?: string
    offset?: number
    limit?: number
}


export interface IPaginate<T> {
    data?: T
    page: number
    total_page: number
}
