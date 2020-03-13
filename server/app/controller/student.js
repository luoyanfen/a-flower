'use strict';

const Controller = require('egg').Controller;

class StudentController extends Controller {
  async addstu() {
	const {ctx,service} = this;
	let formData = ctx.request.body;
	//console.log(formData);

	//console.log("session保存："+ctx.session.userInfo);
	
	//添加登录管理员信息
	//let userInfo = JSON.parse(ctx.session.userInfo);
	//formData.aid =userInfo.aid;
	//formData.username = userInfo.username;

	formData.aid = ctx.session.aid;
	formData.username = ctx.session.username;

	console.log(formData);

	//添加了该用户，状态变1
	formData.status = 1;

	delete formData.respasswd;
    //时间转本地格式
	formData.addtimes = new Date().toLocaleString();

	let result = await service.student.addstu(formData);
	ctx.body = result;
  }


  async index() {
	const { ctx, service } = this;
	const result = await service.student.index();
	const nums = await service.student.count();
	let data = { "code": 0, "msg": "", "count": nums, "data": result };
	ctx.response.body = data;
}

  async del(){
	  const {ctx,service} = this;
	  let sid = ctx.query.sid;
	  console.log("学生id"+sid);
	  let result = await service.student.del(sid);
	  let data = {
		  code:1,
		  Msg:"删除成功"
	  }
	  ctx.body = data;
  }

  async getStudentById(){
	  const {ctx,service} = this;
	  const sid = ctx.query.sid;
	  let result = await service.student.getStudentById(sid);
	  //console.log("sid是："+sid,result);
	  ctx.response.body = {
		code: 1,
		student: result
	};
  }

  async edit(){
	  const {ctx,service} = this;
	  let formData = ctx.request.body;
	  delete formData.respasswd;

	  console.log(formData)

	  let result = await service.student.edit(formData);
	  let data = {
		  code:1,
		  data:result
	  }

	  ctx.body = data;
  }
}

module.exports = StudentController;
