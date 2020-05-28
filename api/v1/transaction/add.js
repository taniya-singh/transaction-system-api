/*
 * @file: register.js
 * @description: It Contain register transaction  router/api.
 * @author: Taniya
 */
import express from "express";
import { createValidator } from "express-joi-validation";
import Joi from "@hapi/joi";

import { add } from "../../../controllers/transaction";

const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/transaction:
 *  post:
 *   tags: ["transaction"]
 *   summary: transaction register api
 *   description: api used to register transaction 
 *   parameters:
 *      - in: body
 *        name: transaction
 *        description: The transaction to create.
 *        schema:
 *         type: object
 *         required:
 *          - transaction register
 *         properties:
 *           desc:
 *             type: string
 *             required:
 *           transType:
 *             type: string
 *             required:
 *           amount:
 *             type: string
 *             required:
 * 
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

const transSchema = Joi.object({
  transType: Joi.string()
    .required()
    .label("Type"),
  desc: Joi.string()
    .required()
    .label("description"),
  amount: Joi.number()
    .required()
    .label("Amount"),

});

app.post(
  "/transaction",
  validator.body(transSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  add
);

export default app;
