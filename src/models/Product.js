import { timeStamp } from "console";
import { Schema, model } from "mongoose";
import { stringify } from "querystring";



const productSchema = new Schema(
  {
    name: String,
    category: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    reference: {
      type: Schema.Types.ObjectId,
      ref: "Reference",
    },

    price: Number,
    description: String,
    stock: Number,
    imgs: [
      {
        _id: {
          type: Schema.Types.ObjectId,
          auto: true,
        },
        url: String,
      },
    ],
    garmentType: [
      {
        type: Schema.Types.ObjectId,
        ref: "GarmentType",
      },
    ],
    pieces: [
      {
        piece: String,
        sizes: [
          {
            name: String,
            inventory: Number,
            _id: String,
          },
        ],
        _id: String,
      },
    ],
  },

  {
    timestamps: true,
    versionKey: false,
  }
);



export default model("Product", productSchema);
