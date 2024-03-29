import { timeStamp } from "console";
import { Schema, model } from "mongoose";
import { stringify } from "querystring";

//voy a especificar lo que quiero guardar en la base de datos para cad aproducto
// tiene nombre , categoria, precio, imagen , la fecha de creacion

const productSchema = new Schema(
  {
    name: String,
    category: String,
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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// ya con eso tendriamos un modelo de datos sobre los productos
//ahora vamos a exportarlo

export default model("Product", productSchema);
