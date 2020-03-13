'use strict';

const Controller = require('egg').Controller;

class coursesController extends Controller {
    async look() {
    const {ctx,service}= this;
    const result=await this.service.courses.look();
    ctx.body = result;
  }
}

module.exports = coursesController;
