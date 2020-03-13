'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');

class UploadController extends Controller {
  async index() {
	  const {ctx} = this;
	  const dest = '/public/uploads/';
	  const file = ctx.request.files[0];
	  //console.log(file);
	  //拷贝文件到指定文件夹
	  let to = path.dirname(__dirname)+dest+path.basename(file.filepath);
	  await fs.copyFileSync(file.filepath,to);
	  //删除临时文件
	  fs.unlinkSync(file.filepath);
	  //返回图片路径  this.app.config   获取配置信息
	  let cluster = this.app.config.cluster.listen;
      //客户端要求是json格式
	  ctx.body ={
		  code:1,
		  src:`http://${cluster.hostname}:${cluster.port}${dest}${path.basename(file.filepath)}`
	  } ;
  }
}

module.exports = UploadController;
