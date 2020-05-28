/*
 * @file: db-schema.js
 * @description: It Contain db schema for transaction collection.
 * @author: Taniya
 */

import mongoose from "mongoose";

const transSchema = new mongoose.Schema(
  {
    transType: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      default:""
    },
    amount: {
      type: Number,
      default: 0,
      required:true
    },
    balance: {
      type: Number,
      default: 45000,
      required:false
    },
  },
  { timestamps: true }
);

export default transSchema;
