import { timeStamp } from "console";
import { Schema, model } from "mongoose";
import { stringify } from "querystring";

const sentEmailsSchema = new Schema(
  {
    dot: String,
    name: String,
    email: String,
    phone: String,
  },

  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("SentEmail", sentEmailsSchema);
