'user strict'

const Service = require('egg').Service;

class AdminService extends Service{
	async login(username){
		 const {app} = this;
		 let result = app.mysql.get('admin',{username:username});
		 
		 return result;
	}

	async update(aid){
		const {app} = this;
		let sql = `update admin set nums=nums+1,logintimes=now() where aid=?`;
		let result = app.mysql.query(sql,[aid]);
		return result;
	}
}

module.exports = AdminService;