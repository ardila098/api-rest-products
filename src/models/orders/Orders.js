import { Schema, model } from "mongoose";
import { PAYMENT_STATUS, SHIPPING_STATUS } from "../../constants/orderConstants";

const orderSchema = new Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function (v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: props => `${props.value} no es un correo electrónico válido!`,
    },
  },
  celphone: { type: Number, required: true },
  department: { type: String, trim: true },
  city: { type: String, trim: true },
  address: { type: String, trim: true },
  district: { type: String, trim: true },
  paymentId: { type: String },
  terms: { type: Boolean, required: true },
  items: [{
    _id: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    total_price: { type: Number, required: true, min: 0 },
    count: { type: Number, required: true, min: 1 },
    imgs: [{ type: Schema.Types.Mixed }],
    name:String,
    price:String,
    selected_pieces: [{
      piece_id: String,
      name_piece: String,
      name_size: String,
      size_id: String,
    }],
  }],
  paymentStatus: {
    type: Number,
    default: PAYMENT_STATUS.PENDING_PAYMENT.id,
    enum: Object.values(PAYMENT_STATUS).map(status => status.id),
  },
  sendStatus: {
    type: Number,
    default: SHIPPING_STATUS.PENDING_SEND.id,
    enum: Object.values(SHIPPING_STATUS).map(status => status.id),
  },
}, {
  timestamps: true,
  versionKey: false,
});

export default model("Order", orderSchema);