import jwt from "jsonwebtoken"
import { IUser } from "../interfaces/IUser"

const generateJWTToken = (payload: IUser) =>
  new Promise((resolve, reject) =>
    jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "15m" }, (err, token) => {
      if (err) reject(err)
      else resolve(token)
    })
  )

export const JWTAuthenticate = async (user: IUser) => {
  const accessToken = await generateJWTToken({ _id: user._id})
  return accessToken
}


export const verifyJWT = (token: string) =>
  new Promise((res, rej) =>
    jwt.verify(token, process.env.JWT_SECRET as string, (err: string, decodedToken) => {
      if (err) rej(err)
      else res(decodedToken)
    })
  )
