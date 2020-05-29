/*
 * @file: transaction.js
 * @description: It Contain function layer for Transaction controller.
 * @author: Taniya
 */

import { successAction, failAction } from "../utilities/response";
import {
    register,
    getTransactions
} from "../services/transaction";
import Message from "../utilities/messages";

/**************** Add User ***********/
export const add = async (req, res) => {
  const payload = req.body;
  try {
    const data = await register(payload);
    if(!(data))
    res.status(400).json(failAction(Message.notPossible))
    else
    res.status(200).json(successAction(data, Message.success));

  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};



export const list = async (req, res) => {
  const queryParams = { ...req.query };
  try {
    const data = await getTransactions(queryParams);
    res.status(200).json(successAction(data, Message.success));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};

