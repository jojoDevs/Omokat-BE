import mongoose from "mongoose";

const Schema = mongoose.Schema;

const User = new Schema(
  {
    id: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    salt: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    pic: {
      type: String,
      require: true,
    },
    answer: {
      type: String,
      require: true,
    },
    games: {
      type: Number,
      require: true,
    },
    win: {
      type: Number,
      require: true,
    },
    isLeave: {
      type: Boolean,
      require: true,
    },
    cats: {
      type: [Number],
      require: true,
    },
    token: {
      type: String,
      require: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model("Users", User);
