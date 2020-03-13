'use strict';

const Controller = require('egg').Controller;

class QuestionController extends Controller {
  async exercises() {
	const {ctx,service} = this;
	let result = await service.question.exercises();
	console.log(result);
	ctx.body = result;
  }

  async exequestion(){
	const {ctx,service} = this;
	let cid = ctx.query.cid;
	console.log("cid值是："+cid);
	let result = await service.question.exequestion(cid);
	ctx.body = result;
}
}

module.exports = QuestionController;
