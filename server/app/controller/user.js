'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async add() {
    const {ctx , service}=this;
    const result= await service.user.add();
    ctx.body=result;
  }
}

module.exports = UserController;
