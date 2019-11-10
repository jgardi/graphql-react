import mongoose from "mongoose";
import _ from "lodash";
import isEmail from "validator/lib/isEmail";
import bcrypt from "bcrypt";
import { isoDateNoTime } from "../utils";

const userSchema = new mongoose.Schema({
  username: {
    type: String
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    maxlength: 42
  },
  services: {
    type: JSON
  },
  emails: [
    {
      address: {
        type: String,
        validate: {
          validator: v => {
            return isEmail(v);
          },
          message: props => {
            return `${props.value} is not a valid email`;
          }
        }
      }
    }
  ],
  verified: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: isoDateNoTime(new Date())
  },
  updatedAt: {
    type: Date,
    default: new Date()
  },
  profile: {
    type: JSON
  },
  lastLogin: {
    type: [JSON]
  }
});

/**
 * Find a user by email or username
 * @param {string} str - The string containing username or email.
 * @return {User} A User object.
 */
userSchema.statics.findByLogin = async function(login) {
  let user = await this.findOne({
    username: login
  });

  if (!user) {
    user = await this.findOne({ "emails.address": login });
  }

  return user;
};

/**  User middleware to generate password hash before saving a user */
userSchema.pre("save", async function() {
  this.password = await this.generatePasswordHash(this.password);
});

/**
 * Hash a password
 * @param {string} str - The string containing password.
 * @return hashed password.
 */
userSchema.methods.generatePasswordHash = async function(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

/**
 * Validate a password
 * @param {string} str - The string containing password.
 * @return compare and validate user password to authenticate.
 */
userSchema.methods.validatePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
