'use strict';
const Service = require('egg').Service;
class RegisterService extends Service {
    async add(formdata) {
        const {app} = this;
        const result = await app.mysql.insert('students', formdata);;
        return result;
    }
}

module.exports = RegisterService;
