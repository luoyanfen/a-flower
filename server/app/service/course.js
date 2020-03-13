'use strict';

const Service = require('egg').Service;

class CourseService extends Service {
	async add(formData) {
		console.log(formData);
		const { app } = this;
		const result = await app.mysql.insert("courses", formData);
		return result;
	}

	async index() {
		const { app } = this;
		const result = await app.mysql.select('courses');
		return result;
	}

	async count() {
		const { app } = this;
		const result = await app.mysql.query('select count(cid) nums from courses');
		return result[0].nums;
	}

	async del(cid) {
		const { app } = this;
		const result = await app.mysql.delete('courses', { cid });
		return result;
	}

	async getCourseById(cid) {
		const { app } = this;
		const result = await app.mysql.get('courses', { cid });
		return result;
	}

	async edit(formData) {
		console.log(formData);
		const { app } = this;
		const result = await app.mysql.update("courses", formData,{
			where:{
				cid:formData.cid
			}
		});
		return result;
	}
}

module.exports = CourseService;
