const mongoose = require('mongoose')
const Schema = mongoose.Schema
const jwt = require('jsonwebtoken')
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  // notes: [{ type: Schema.Types.ObjectId, ref: 'Notes' }],
})

UserSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET)
    this.tokens = this.tokens.concat({ token: token })
    await this.save()
    return token
  } catch (err) {
    console.log(err)
  }
}
const UserModel = mongoose.model('Users', UserSchema)
module.exports = UserModel
