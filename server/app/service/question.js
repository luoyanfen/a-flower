'use strict';

const Service = require('egg').Service;

class QuestionService extends Service {
  async exercises() {
	const {app} = this;
	let result = app.mysql.select("courses",{ 
		columns: ['cid','cname', 'qnum'], // 要查询的表字段
	  });
	  return result;
  }

  async exequestion(cid){
	  const {app} = this;
	  let result = await app.mysql.select("questions",{ 
		where: { cid:cid },  
		columns: ['qid','type','title','options','cid','kid','answer','analysis','difficulty'], // 要查询的表字段
	   })

	   return result;
  }
}

module.exports = QuestionService;
