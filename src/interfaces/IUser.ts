export interface IUser {
    _id: string
    name: string
    surname: string
    email: string
    password: string
    role: string
    refreshToken?: string
    googleId?: string
}