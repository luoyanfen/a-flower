'use strict';
const Service = require('egg').Service;
class LoginService extends Service {
   async user(sname) {
    const {app} = this;
    let result = await app.mysql.get('students', {sname});
    return result;
  }
  async admin(username) {
    const {app} = this;
    let result = await app.mysql.get('admin', {username});
    return result;
  }
  async update(aid) {
    const {app} = this;
    let sql = 'UPDATE admin SET nums = nums + 1, logintimes = NOW () WHERE aid=?';
    const result = await app.mysql.query(sql,[aid]);
    return result;
  }
}

module.exports = LoginService;
