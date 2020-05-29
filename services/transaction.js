/*
 * @file: user.js
 * @description: It Contain function layer for transaction service.
 * @author: Taniya
 */
import Transaction from "../collections/transaction";


/********** Save users **********/
export const register = async payload => {
  let query={}
  const latest = await Transaction.findOneByCondition(query)
  if(!latest.length && payload.transType=='d') return null
  else{
    if(payload.transType=='c'){
      let bal=latest[0]?latest[0].balance:0
      payload.balance=bal+payload.amount
    }
    else
      payload.balance=latest[0].balance-payload.amount
    if(payload.balance<0)
      return null
    const data = await Transaction.saveTrans({
      ...payload
    });
    return data;
    }

};

/********* get user list *********/
export const getTransactions = async queryParams => {
  const skip = queryParams.page
    ? (parseInt(queryParams.page) - 1) * parseInt(queryParams.limit)
    : 0;
  const sortKey = queryParams.sortKey ? queryParams.sortKey : "createdAt";
  const sortBy = queryParams.sortBy ? parseInt(queryParams.sortBy) : -1;
  const searchKey = queryParams.searchKey ? queryParams.searchKey : "";
  let query = {},
    isOR = [
      { name: { $regex: searchKey, $options: "i" } },
      { email: { $regex: searchKey, $options: "i" } },
      { mobile: { $regex: searchKey, $options: "i" } }
    ];
  if (queryParams && queryParams.searchKey) {
    query = {
      ...query,
      $or: isOR
    };
  }
  let data = await Transaction.findByCondition(query)
    .select({
      __v: 0,
      updatedAt: 0
    })
    .sort([[sortKey, sortBy]])
    .collation({ locale: "en" })
    .skip(skip)
    .limit(parseInt(queryParams.limit))
    .lean();

  const count = await Transaction.findByCondition(query).countDocuments();
  return { data: data, total: count };
};


