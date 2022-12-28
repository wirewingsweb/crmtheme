const mongoose = require("mongoose");
// const AutoIncrement = require("mongoose-sequence")(mongoose);

const today = new Date();
const date =
  today.getDate() + "-" + today.getMonth() + "-" + today.getFullYear();
const time =
  today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
const User = new mongoose.Schema(
  {
    name: {
      type: String
    },
    img:{
        data:Buffer
    },
    userName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    roles: {
      type: Object,
      required:true
    },
    phone: {
      type: Number
    },
    password: {
      type: String,
      required: true,
    },
    parentId: {
      type: Number,
    },
    dispositionCount: {
      type: Object,
    },
    createdAt: {
      type: String,
      default: time + " " + date,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);
// User.plugin(AutoIncrement, {
//   inc_field: "userId",
//   start_seq: 1000,
// });

module.exports = mongoose.model("user", User);
