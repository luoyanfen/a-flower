'use strict';

const Service = require('egg').Service;

class StudentService extends Service {
  async addstu(formData) {
  const {app} = this;
  let result = app.mysql.insert("students",formData);
  return result;
  }

  async index() {
		const { app } = this;
		const result = await app.mysql.select('students',{ 
      columns: ['sid', 'sname','stuno','spasswd','gid','sex','tel','qq','aid','username','addtimes','updatetimes','deltimes','avatar','status'], // 要查询的表字段
    });
		return result;
	}

	async count() {
		const { app } = this;
		const result = await app.mysql.query('select count(sid) nums from students');
		return result[0].nums;
	}

	async del(sid){
		const {app} = this;
		const result = await app.mysql.delete("students",{sid});
		return result;
	}

	async getStudentById(sid){
		const {app} = this;
		let result = await app.mysql.get("students",{sid});
		return result; 
	}

	async edit(formData){
		const {app} = this;
		let result = await app.mysql.update("students", formData,{
			where:{
				sid:formData.sid
			}
		});

		console.log(result);
		return result;
	}
}

module.exports = StudentService;
