'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  //学生用户
  async user() {
    const {
      ctx,
      service
    } = this;
    console.log(ctx.session.coder)
    //接收学生客户端提交上来的数据
    let formData = ctx.request.body;
    console.log(ctx.session.coder.toLowerCase());

    let data = {
      code: 1,
      Msg: '登录成功'
    };
    //验证验证码
    if (formData.coder.toLowerCase() != ctx.session.coder.toLowerCase()) {
       data = {code: -2,Msg: '验证码错误'};
    }
    let result = await service.login.user(formData.sname);
    
    if (!result) {
      data = {code: -1,Msg: '账号不存在'};
    }
    if (result && result.spasswd != formData.spasswd) {
      data = {code: -1,Msg: '密码错误'};
    }
    //当学生登录成功时，更新登录次数和登录时间
    if (data.code == 1) {
      //把登录成功的相关信息保存到session里面
      ctx.session.aid = result.aid;
      ctx.session.username = result.username;
      ctx.session.avatar = result.avatar;
    }
    ctx.body = data;
  }
  //获取学生用户登录信息
  async user_check() {
    const {ctx} = this;
    ctx.body = {
      sid: ctx.session.sid,
      sname: ctx.session.sname,
      Avatar: ctx.session.Avatar
    };
  }
  //学生退出登录操作，要把所有的穑session信息清除
  async user_logout() {
    const {ctx} = this;
    //把登录成功的相关信息保存到session里面
    ctx.session = null;
    ctx.body = {code: 1, Msg: '退出成功'};
  }

  //管理员
  async admin() {
    const {ctx,service} = this;
    console.log(ctx.session.coder)
    //接收客户端提交上来的数据
    let formData = ctx.request.body;
    let result = await service.login.admin(formData.username);
    let data = {code: 1,Msg: '登录成功'};
    // 验证验证码
    if (formData.coder.toLowerCase() != ctx.session.coder.toLowerCase()) {
      data = {code: -2,Msg: '验证码错误'};
   }
    if (!result) {
      data = {code: -1,Msg: '账号不存在'};
    }
    if (result && result.passwd != formData.passwd) {
      data = {code: -1,Msg: '密码错误'};
    }
    //当登录成功时，更新登录次数和登录时间
    if (data.code == 1){
      await service.login.update(result.aid);
      //把登录成功的相关信息保存到session里面
      ctx.session.aid = result.aid;
      ctx.session.username = result.username;
      ctx.session.avatar = result.avatar;
    }
    ctx.body = data;
  }

  //获取登录信息
  async check(){
    const {ctx} = this;
    ctx.body = {
      aid:ctx.session.aid,
      username:ctx.session.username,
      avatar:ctx.session.avatar
    };
  }

  //退出登录操作，要把所有的穑session信息清除
  async logout() {
      const {ctx} = this;
      //把登录成功的相关信息保存到session里面
      ctx.session = null;
      ctx.body = {code:1,Msg:'退出成功'};
  }

}

module.exports = LoginController;