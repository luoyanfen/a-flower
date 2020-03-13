'use strict';

const Service = require('egg').Service;

class coursesService extends Service {
   async look() {
    const{app}=this;
    const result=await app.mysql.select('interview',{
        limit:6,
        offset:0
    });
    return result
  }
}

module.exports = coursesService;
