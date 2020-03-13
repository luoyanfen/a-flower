'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async add() {
    const {app}=this;
    let result =await app.mysql.select('index',{
        limit:6,
        offset:0
    });
    return result;
  }
}

module.exports = UserService;
