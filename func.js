const fdk = require('@fnproject/fdk');
const DbFuncRxjs = require('./dbFuncRxjs');

fdk.handle(function (input, ctx) {
  return DbFuncRxjs.run(input, ctx).then(res => {
    return res;
  });

})
