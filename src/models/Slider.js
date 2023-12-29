import { timeStamp } from "console";
import { Schema, model } from "mongoose";
import { stringify } from "querystring";

const sliderSchema = new Schema(
  {
    name: String,
    description: String,
    items: [
      {
        nameItem: String,
        description: String,
        category: String,
        imgs: [
          {
            _id: {
              type: Schema.Types.ObjectId,
              auto: true,
            },
            url: String,
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Slider", sliderSchema);
