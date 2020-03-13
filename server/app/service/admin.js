'use strict';
const Service = require('egg').Service;
class AdminService extends Service {
  async index(){
    const {app} = this;
    const result = await app.mysql.select('admin');;
    return result;
  }
  
  async count(){
    const {app} = this;
    const result = await app.mysql.query('select COUNT(aid) nums FROM admin');;
    return result[0].nums;
  }

  async add(formdata){
    const {app} = this;
    const result = await app.mysql.insert('admin', formdata);;
    return result;
  }

  async del(aid){
    const {app} = this;
    const result = await app.mysql.delete('admin', {aid});;
    return result;
  }
  async getCourseByCid(aid){
    const {app} = this;
    const result = await app.mysql.get('admin', {aid});;
    return result;
  }

  async eidit(formdata){
    const {app} = this;
    const result = await app.mysql.update('admin', formdata, {
      where: {
        aid: formdata.aid
      }
    });
    return result;
  }

  async update(aid){
    const {app} = this;
    const result = await app.mysql.update('admin',{aid});
    return result;
  }

  
}

module.exports = AdminService;
