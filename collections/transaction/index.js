/*
 * @file: index.js
 * @description: It Contain function layer for tarns collection.
 * @author: Taniya
 */

import mongoose from "mongoose";
import dbSchema from "./db-schema";

class TransClass {
  static saveTrans(payload) {
    return this(payload).save();
  }
    static findByCondition(condition) {
    return this.find({...condition });
  }
}

dbSchema.loadClass(TransClass);

export default mongoose.model("Transcation", dbSchema);
