const add = (cart, req) => {
  console.log(req);
  cart.push(req.body);
  return JSON.stringify(cart, null, 4);
};
const change = (cart, req) => {
  console.log(req);
  const find = cart.find(el => el.id_product === +req.params.id);
  find.quantity += req.body.quantity;
  return JSON.stringify(cart, null, 4);
};
const del = (cart, req) => {
  console.log(req);
  const findIndex = cart.findIndex(el => el.id_product === +req.params.id);
  cart.splice(findIndex, 1);
  return JSON.stringify(cart, null, 4);
};

module.exports = {
  add,
  change,
  del
};