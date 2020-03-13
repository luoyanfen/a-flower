'use strict';

const Controller = require('egg').Controller;

class ChapterController extends Controller {
  async view() {
      const {ctx , service}=this;
      const result= await service.chapter.view();
      ctx.body=result;
  }
}

module.exports = ChapterController;
