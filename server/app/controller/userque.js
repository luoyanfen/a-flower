'use strict';

const Cotroller = require('egg').Controller;

class UserqueController extends Cotroller {
    async index() {
        const { ctx, service } = this;
        let resault = await service.userque.index();
        let nums = await service.userque.count();
        let data = { "code": 0, "msg": "", "count": nums, "data": resault };
        ctx.body = data
    };

    async info() {
        const { ctx, service } = this;
        let resault = await service.userque.info();
        ctx.body = resault[0];
    };

    async del() {
        const { ctx, service } = this;
        let qid = ctx.query.qid
        let resault = await service.userque.del(qid);
        ctx.body = {
            code: '1',
            Msg: '删除成功'
        };
    };

    async uploads() {
        const { ctx } = this;
        const dest = '/public/imgs/';
        let cluster = this.app.config.cluster.listen;
        const baseurl = `http://${cluster.hostname}:${cluster.port}${dest}`;
        console.log(ctx.request.files);
        const data = {
            "errno": 0,
            "data": []
        };
        ctx.request.files.forEach(function (file, i) {
            let to = path.dirname(__dirname) + dest + path.basname(file.filepath);
            fs.copyFileSync(file.filepath, to);
            fs.unlinkSync(file.filepath);
            let src = `${baseurl}${path.basname(file.filepath)}`
            data.data.push(src);
        });
        ctx.body = data;
    };

    async search() {
        const { ctx, service } = this;
        let insearch = ctx.request.query;
        console.log(insearch);
        let resault = await service.userque.search(insearch);
        let data = { "code": 0, "msg": "", "count": "", "data": resault };
        ctx.body = data
    };
    
    // async submit() {
    //     const { ctx } = this;
    //     let data = ctx.request.body;
    //     let resault = await service.questions.submit(data);
    //     let msg = {
    //         code: '1',
    //         Msg: '提交成功'
    //     }
    //     ctx.body = msg;
    // };

}
module.exports = UserqueController;