'use strict';

const Controller = require('egg').Controller;

class CourseController extends Controller {

	async add() {
		const { ctx, service } = this;
		let forData = ctx.request.body;
		const result = await service.course.add(forData);
		let data = { code: 1, Msg: '操作成功' };
		if (!result.insertId) {
			data = { code: -1, Msg: '操作失败' };
		}
		ctx.response.body = data;
	}

	async index() {
		const { ctx, service } = this;
		const result = await service.course.index();
		const nums = await service.course.count();
		let data = { "code": 0, "msg": "", "count": nums, "data": result };
		ctx.response.body = data;
	}

	async del() {
		const { ctx, service } = this;
		const cid = ctx.query.cid;
		const result = await service.course.del(cid);
		ctx.response.body = {
			code: 1,
			Msg: '删除成功'
		};
	}

	async getCourseById() {
		const { ctx, service } = this;
		const cid = ctx.query.cid;
		const result = await service.course.getCourseById(cid);
		ctx.response.body = {
			code: 1,
			course: result
		};
	}

	async edit() {
		const { ctx, service } = this;
		let forData = ctx.request.body;
		const result = await service.course.edit(forData);
		let data = { code: 1, Msg: '操作成功' };
		ctx.response.body = data;
	}
}

module.exports = CourseController;
