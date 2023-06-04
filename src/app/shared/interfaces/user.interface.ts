enum UserRole {
    admin = 'admin',
    operator = 'operator',
    user = 'user',
}

export interface IUser{
    id?: string
    name?: string
    username?: string
    email?: string
    role?: string
    avatar?: IAvatar
}

export interface IUserRegister{
    name: string
    username: string
    password: string
    email: string
    role: string
}

export interface IUserUpdate{
    name?: string
    role?: string
    avatar?: any
}

export interface IAvatar {
    id: string
    name: string
    url: string
    size: string
}