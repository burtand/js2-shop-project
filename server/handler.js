const fs = require('fs');
const cart = require('./cart');
const moment = require('moment');


const actions = {
  add: cart.add,
  change: cart.change,
  delete: cart.del
};

const handler = (req, res, action, file) => {
  fs.readFile(file, 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({
        result: 0,
        text: err
      }));
    } else {
      logger(req.body.product_name, action);
      const newCart = actions[action](JSON.parse(data), req);
      fs.writeFile(file, newCart, (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1}');
        }
      });
    }
  });
};

const logger = (product_name, action) => {
  fs.appendFile('./server/db/stats.json', JSON.stringify({
    action: action,
    time: moment().format(),
    product_name: product_name
  }), err => console.log(err));
  // fs.readFile('./server/db/stats.json', (err, data) => {
  //   if (err) {
  //     res.sendStatus(404, JSON.stringify({
  //       result: 0,
  //       text: err
  //     }));
  //   } else {
  //     fs.writeFile('./server/db/stats.json', data + JSON.stringify({
  //       action: action,
  //       time: moment().format(),
  //       product_name: req.body.product_name
  //     }), (err) => {
  //       if (err) {
  //         res.send('{"result": 0}');
  //       } else {
  //         res.send('{"result": 1}');
  //       }
  //     });
  //   }
  // });
}

module.exports = handler;