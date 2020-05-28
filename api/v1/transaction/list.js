/*
 * @file: get-list.js
 * @description: It Contain get user list router/api.
 * @author: Taniya
 */
import express from "express";
import { list } from "../../../controllers/transaction";

const app = express();

/**
 * @swagger
 * /api/v1/transaction:
 *  get:
 *   tags: ["transaction"]
 *   summary: transaction list api
 *   description: api used to get transaction list
 *   security:
 *    - OAuth2: [transaction]   # Use Authorization
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *      - in: query
 *        name: page
 *        required: false
 *        type: string
 *      - in: query
 *        name: limit
 *        required: false
 *        type: string
 *      - in: query
 *        name: searchKey
 *        required: false
 *        type: string
 *      - in: query
 *        name: sortKey
 *        required: false
 *        type: string
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

app.get("/transaction", list);

export default app;
