'use strict';
const Controller = require('egg').Controller;
class AdminController extends Controller{
    async index(){
        const {ctx, service} = this;
        const result = await service.admin.index();
        const nums = await service.admin.count();
        let data = {"code":0,"msg":"","count":nums,"data":result};
        ctx.response.body = data;
    }

    async add(){
        const {ctx, service} = this;
        // response是可以省略的
        const formData = ctx.request.body;
        const result = await service.admin.add(formData);
        let data = {code:1, Msg:'操作成功'};
        if(!result.insertId){
            data = {code:-1, Msg:'操作失败'};
        }
        ctx.response.body = data;
    }

    async del(){
        const {ctx, service} = this;
        const aid = ctx.query.aid;
        const result = await service.admin.del(aid);
        ctx.response.body = {
            code:1,
            Msg:'删除成功'
        };
    }


    async get(){
        const {ctx, service} = this;
        const aid = ctx.query.aid;
        const result = await service.admin.getCourseByCid(aid);
        ctx.response.body = {
            code:1,
            admin:result
        };
    }


    async eidit(){
        const {ctx, service} = this;
        // response是可以省略的
        const formData = ctx.request.body;
        const result = await service.admin.eidit(formData);
        let data = {code:1, Msg:'操作成功'};
        ctx.response.body = data;
    }

}
module.exports = AdminController;