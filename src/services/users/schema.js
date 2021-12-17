import mongoose from "mongoose"
import bcrypt from "bcrypt"



const { Schema, model } = mongoose

const userSchema = new Schema({
    name: { type: String },
    surname: {type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String, default: "Guest", enum: ["Guest", "Host"] },
    refreshToken: { type: String },
    googleId: { type: String },
})

userSchema.pre("save", async function (next) {
    const newUser = this
    const plainPw = newUser.password
    if (newUser.isModified("password")) {
        const hash = await bcrypt.hash(plainPw, 10)
        newUser.password = hash
    }
})

UserSchema.methods.toJSON = function () {
    // this function is called automatically by express EVERY TIME it does res.send()
    const userDocument = this
    const userObject = userDocument.toObject()
    delete userObject.password // THIS IS NOT GOING TO AFFECT THE DATABASE
    delete userObject.__v
    return userObject
  }

  UserSchema.statics.checkCredentials = async function (email, plainPw) {
    // 1. find the user by email
    const user = await this.findOne({ email }) // "this" refers to the UserModel
    if (user) {
      // 2. if user is found --> compare plainPw with hashed one
      const isMatch = await bcrypt.compare(plainPw, user.password)
      if (isMatch) {
        // 3. if they match --> return a proper response
        return user
      } else {
        // 4. if not --> return null
        return null
      }
    } else {
      return null // if email is not ok --> return null
    }
  }

  export default model("User", UserSchema)