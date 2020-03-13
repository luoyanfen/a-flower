'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  //管理员登陆
  //router.post('/index', controller.admin.login);

  //管理员登录接口
  router.post('/login-admin', controller.login.admin);
  router.get('/login-admin/check', controller.login.check);
  router.get('/login-admin/logout', controller.login.logout);

  //管理员管理接口
  router.get('/admin/index', controller.admin.index);
  router.post('/admin/add', controller.admin.add);
  router.get('/admin/del', controller.admin.del);
  router.get('/admin/get',controller.admin.get);
  router.post('/admin/eidit', controller.admin.eidit);

  //用户注册
  router.post('/register', controller.register.index);

  //用户登录接口
  router.post('/login', controller.login.user);
  //文件上传，要用post请求
  router.post('/upload', controller.upload.index);

  //添加课程
  router.post("/addcourse", controller.course.add);
  //课程列表
  router.get('/course/index', controller.course.index);
  //删除
  router.get('/course/del', controller.course.del);
  //获取要更改的信息
  router.get('/course/get', controller.course.getCourseById);

  //确认更改信息
  router.post('/course/edit', controller.course.edit);

  //添加学生
  router.post("/student/addstudent", controller.student.addstu);

  //管理学生
  router.get("/student/index", controller.student.index);

  //删除学生
  router.get("/student/del", controller.student.del);

  //获取要更改的学生的信息
  router.get("/student/get", controller.student.getStudentById);
  //确认更改学生信息
  router.post("/student/edit", controller.student.edit);
  //查询可以练习的课程
  router.get("/specialExercises", controller.question.exercises);
  //查询选定课程的练习题
  router.get("/exequestion", controller.question.exequestion);

  //验证码路径
  router.get('/coder', controller.svg.coder);

  //应用添加
  router.get('/user',controller.user.add);

   //面试题课程表
   router.get('/courses',controller.courses.look);

   //章节
  router.get('/chapter',controller.chapter.view);

  //个人中心页面
  router.get('/userque/index',controller.userque.index);
  router.get('/userque/info',controller.userque.info);
  router.get('/userque/del',controller.userque.del);
  router.post('/uploads',controller.userque.uploads);
  router.get('/userque/search',controller.userque.search);
};
