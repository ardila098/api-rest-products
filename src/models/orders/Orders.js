import { timeStamp } from "console";
import { Schema, model } from "mongoose";
import { stringify } from "querystring";

const sliderSchema = new Schema(
  {
    name: String,
    description: String,
    email: String,
    celphone: Number,
    terms: Boolean,
    items: [],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Slider", sliderSchema);
