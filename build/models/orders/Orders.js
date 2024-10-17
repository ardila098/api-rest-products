"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var _orderConstants = require("../../constants/orderConstants");
var orderSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function validator(v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: function message(props) {
        return "".concat(props.value, " no es un correo electr\xF3nico v\xE1lido!");
      }
    }
  },
  celphone: {
    type: Number,
    required: true
  },
  department: {
    type: String,
    trim: true
  },
  city: {
    type: String,
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  district: {
    type: String,
    trim: true
  },
  paymentId: {
    type: String
  },
  terms: {
    type: Boolean,
    required: true
  },
  items: [{
    _id: {
      type: _mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    total_price: {
      type: Number,
      required: true,
      min: 0
    },
    count: {
      type: Number,
      required: true,
      min: 1
    },
    imgs: [{
      type: _mongoose.Schema.Types.Mixed
    }],
    name: String,
    price: String,
    selected_pieces: [{
      piece_id: String,
      name_piece: String,
      name_size: String,
      size_id: String
    }]
  }],
  paymentStatus: {
    type: Number,
    "default": _orderConstants.PAYMENT_STATUS.PENDING_PAYMENT.id,
    "enum": Object.values(_orderConstants.PAYMENT_STATUS).map(function (status) {
      return status.id;
    })
  },
  sendStatus: {
    type: Number,
    "default": _orderConstants.SHIPPING_STATUS.PENDING_SEND.id,
    "enum": Object.values(_orderConstants.SHIPPING_STATUS).map(function (status) {
      return status.id;
    })
  }
}, {
  timestamps: true,
  versionKey: false
});
var _default = exports["default"] = (0, _mongoose.model)("Order", orderSchema);