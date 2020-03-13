'use strict';

const Service = require('egg').Service;

class ChapterService extends Service {
    async view() {
    const {app}=this;
    let result =await app.mysql.select('chapter',{
        limit:6,
        offset:0
    });
    return result;
  }
}

module.exports = ChapterService;
