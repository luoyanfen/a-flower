'use strict';

const Controller = require('egg').Controller;

class RegisterController extends Controller {
  async index(){
    const {ctx, service} = this;
    // response是可以省略的
    const formData = ctx.request.body;
    const result = await service.register.add(formData);
    let data = {code:1, Msg:'注册成功！'};
    if(!result.insertId){
        data = {code:-1, Msg:'注册失败！'};
    }
    ctx.response.body = data;
 }
}

module.exports = RegisterController;
