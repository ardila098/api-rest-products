import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, index: true },
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
    price: { type: Number, index: true },
    description: { type: String, index: true },
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
            _id: {
              type: Schema.Types.ObjectId,
              auto: true,
            },
          },
        ],
        _id: {
          type: Schema.Types.ObjectId,
          auto: true,
        },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

productSchema.index({
  name: "text",
  description: "text",
});

export default model("Product", productSchema);
