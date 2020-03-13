'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {
  async login() {
    const { ctx,service } = this;
    //接收客户端提交过来的数据
    let formData = ctx.request.body;
    let result = await service.admin.login(formData.username);
    
    let data = {code:1,Msg:'登陆成功'};
    
    //账号不存在
    if(!result){
      data = {code:-1,Msg:'账号不存在'};
    }

    //密码错误
    if(result && result.passwd != formData.passwd){
      data = {code:0,Msg:'密码错误'};
    }

   // console.log("code为多少"+data.code);
    //在session里存所登录的管理员信息
    if(data.code == 1){
        //console.log(result);
        let userInfo = {
          aid:result.aid,
          username:result.username
        }
        ctx.session.userInfo = JSON.stringify(userInfo);
    }

    console.log(ctx.session.userInfo);
    console.log(ctx.session);
    await service.admin.update(result.aid);

    ctx.body = data;
  }
}

module.exports = AdminController;