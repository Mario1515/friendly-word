const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: [10, 'Email must be at least 10 characters long'],
  },
  password: {
    type: String,
    required: true,
    minLength: [4, 'Password must be at least 4 characters long'],
  },
});

//checking if email exists
userSchema.path("email").validate( async function (emailInput) {
  const user = await mongoose.model("User").findOne({ email: emailInput });
  return !user;
}, "Email already exists");

//checking if passwords match
userSchema.virtual("repeatPassword").set(function (value) {
  if (value !== this.password) {
    throw new Error("Passwords do not match");
  }
});

userSchema.pre("save", async function () {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
});

const User = mongoose.model("User", userSchema);
module.exports = User;
