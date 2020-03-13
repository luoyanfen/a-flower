'use strict';
const Service =require('egg').Service;
class UserqueService extends Service{
    async index(){
        const {app}=this;
        let result=await app.mysql.query('select questions.qid,questions.kid,questions.title,questions.type,questions.answer,questions.analysis,questions.difficulty,knowledges.kname from questions,knowledges');
        return result;
    };
    async count(){
        const {app}=this;
        let result=await app.mysql.query('select count(qid) nums from questions');
        return result[0];
    };

    async info(){
        const {app}=this;
        let result=await app.mysql.query('select * from students');
        return result;
    };

    async del(qid){
        const {app}=this;
        let result=await app.mysql.delete('questions',{qid});
        return result;
    };

    async search(insearch){
        const {app}=this;
        let kid=insearch;
        let result=await app.mysql.query("select questions.qid,questions.kid,questions.title,questions.type,questions.answer,questions.analysis,questions.difficulty,knowledges.kname from questions,knowledges where questions.kid=knowledges.kid",{kid});
        return result;
    };

    // async submit(data){
    //     const {app}=this;
    //     let inform=data;
    //     let result=await app.mysql.insert("INSERT INTO `feedback`(`content`) VALUES ({inform})");
    //     return result;
    // };
    
}
module.exports = UserqueService;