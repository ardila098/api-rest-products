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
    required: true
  },
  description: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function validator(v) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
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
    required: false
  },
  city: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: false
  },
  district: {
    type: String,
    required: false
  },
  paymentId: {
    type: String,
    required: false
  },
  client_id: {
    type: String,
    required: false
  },
  collector_id: {
    type: String,
    required: false
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
    totalPrice: {
      type: Number,
      required: true
    },
    count: {
      type: Number,
      required: true
    },
    imgs: [{
      type: _mongoose.Schema.Types.Mixed
    }],
    selectedPieces: [{
      pieceId: String,
      namePiece: String,
      nameSize: String,
      sizeId: String
    }]
  }],
  paymentStatus: {
    type: Number,
    "default": _orderConstants.PAYMENT_STATUS.PENDING_PAYMENT.id
  },
  sendStatus: {
    type: Number,
    "default": _orderConstants.SHIPPING_STATUS.PENDING_SEND.id
  }
}, {
  timestamps: true,
  versionKey: false
});
var _default = exports["default"] = (0, _mongoose.model)("Order", orderSchema);