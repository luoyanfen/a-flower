axios.defaults.baseURL = 'http://admin.jianmian.com:8080';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;
//由于模块都一次性加载，因此不用执行 layui.use() 来加载对应模块，直接使用即可：
; !function () {
	var layer = layui.layer,
		form = layui.form,
		table = layui.table,
		upload = layui.upload;

	// 验证码点击刷新
	if (document.querySelector('.more-text')) {
		document.querySelector('.more-text').onclick = function () {
			// 需要访问不同的地址
			document.querySelector('.coder').src = axios.defaults.baseURL + '/coder?' + new Date();
		}
	}

	//管理员监听提交
	form.on('submit(index)', function (data) {
		layer.msg(JSON.stringify(data.field));
		axios.post('/index', data.field)
			.then(function (response) {

				if (response.data.code == 1) {
					userInfo = response.data.userInfo;
					window.location.href = './admin.html';
				}
				else {
					layer.msg(response.data.msg);
				}

			})
			.catch(function (error) {
				console.log(error);
			});
		return false;
	});

	//管理员监听提交
	form.on('submit(login-admin)', function (data) {
		//  发起ajax请求把数据提交给服务器
		axios.post('/login-admin', data.field,{
			withCredentials:true  //Ajax允许携带凭证
		}).then(function (response) {
				console.log(response);
				//管理员登录成功
				if (response.data.code == 1) {
					window.location.href = './admin.html';
				} else {
					layer.msg(response.data.Msg);
				}
			}).catch(function (error) {
				console.log(error);
			});
		return false;
	});

	//用户监听提交
	form.on('submit(login)', function (data) {
		//  发起ajax请求把数据提交给服务器
		axios.post('/login', data.field, {
			withCredentials: true //Ajax允许携带凭证 
		}).then(function (response) {
			console.log(response);
			//用户登录成功
			if (response.data.code == 1) {
				window.location.href = './html/user/user.html';
			} else {
				layer.msg(response.data.Msg);
			}
		})
			.catch(function (error) {
				console.log(error);
			});
		return false;
	});

	//用户注册
	form.on('submit(register)', function (data) {
		//  发起ajax请求把数据提交给服务器
		axios.post('/register', data.field)
			.then(function (response) {
				console.log(response);
				//添加成功
				if (response.data.code == 1) {
					window.location.href = './admin.html';
				} else {
					layer.msg(response.data.Msg);
				}
			})
			.catch(function (error) {
				console.log(error);
			});
		return false;
	});

	//  //上传图片
	layui.use('upload', function () {
		upload = layui.upload;

		//执行实例
		var uploadInst = upload.render({
			elem: '#uploadimg' //绑定元素
			, url: axios.defaults.baseURL + '/upload' //上传接口
			, field: 'imgs'
			, done: function (res) {
				//上传完毕回调
				if (res.code == 1) {
					document.querySelector("#showimg").src = res.src;
					document.querySelector("#showimg").style.display = 'inline-block';
					if(document.querySelector('input[name="avatar"]')){
						document.querySelector('input[name="avatar"]').value = res.src;
					}else{
						document.querySelector(".inImg").value = res.src;
					}

				} else {

				}
			}
			, error: function () {
				//请求异常回调
			}
		});
	});


	//监听提交  课程
	form.on('submit(addcourse)', function (data) {
		delete data.field.imgs;

		layer.msg(JSON.stringify(data.field));
		axios.post('/addcourse', data.field)
			.then(function (response) {

				if (response.data.code == 1) {
					console.log(response.data.Msg);
					window.location.href = './course.html';
				}
				else {
					layer.msg(response.data.msg);
				}

			})
			.catch(function (error) {
				console.log(error);
			});
		return false;
	});

	//课程列表信息
	table.render({
		elem: '#courselist'
		, height: 'auto'
		, url: axios.defaults.baseURL + '/course/index' //数据接口
		, page: true //开启分页
		, cols: [[ //表头
			{ field: 'cid', title: 'ID', width: 80, sort: true, fixed: 'left' }
			, { field: 'cname', title: '课程', width: 180 }
			, { field: 'qnum', title: '面试题数', width: 100, sort: true }
			, { field: 'cover', title: '封面', width: 180, templet: '#coursecover' }
			, { field: 'info', title: '课程简介' }
			, { fixed: 'right', width: 150, align: 'center', toolbar: '#barDemo' } //这里的toolbar值是模板元素的选择器
		]]
	});

	//监听工具条 
	table.on('tool(test)', function (obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
		var data = obj.data; //获得当前行数据
		console.log(data);
		var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）

		if (layEvent === 'del') { //删除
			layer.confirm('真的删除行么', function (index) {
				obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
				axios.get('/course/del', {
					params: {
						cid: data.cid
					}
				})
					.then(res => {
						console.log(res);
						//删除成功之后关闭弹出框
						layer.close(index);
					})
					.catch(err => {
						console.error(err);
						//当前页面自动刷新‘
						window.location.reload();
					})

			});
		}
	});

	//编辑课程信息
	if (document.querySelector(".editcourse")) {
		let cid = window.location.search.split('=').pop();
		axios.get("/course/get", {
			params: { cid }
		})
			.then(res => {
				console.log(res)
				//给表单赋值 对应form 属性的 lay-filter="editcourse"
				form.val("editcourse", res.data.course);
				document.querySelector("#showimg").src = res.data.course.cover;
				document.querySelector("#showimg").style.display = 'block';
			})
			.catch(err => {
				console.error(err);
			})
	}

	//确认修改信息
	//监听提交
	form.on('submit(editcourse)', function (data) {
		delete data.field.imgs;

		layer.msg(JSON.stringify(data.field));
		axios.post('/course/edit', data.field)
			.then(function (response) {

				if (response.data.code == 1) {
					console.log(response.data.Msg);
					window.location.href = './admin.html';
				}
				else {
					layer.msg(response.data.msg);
				}

			})
			.catch(function (error) {
				console.log(error);
			});
		return false;
	});


	//监听提交 学生
	form.on('submit(addstudent)', function (data) {
		console.log(data.field);
		delete data.field.imgs;

		layer.msg(JSON.stringify(data.field));
		axios.post('/student/addstudent', data.field)
			.then(function (response) {

				if (response.data.code == 1) {
					console.log(response.data.Msg);
					window.location.href = './student.html';
				}
				else {
					layer.msg(response.data.msg);
				}

			})
			.catch(function (error) {
				console.log(error);
			});
		return false;
	});

	//学生列表信息
	table.render({
		elem: '#studentlist'
		, height: 'auto'
		, url: axios.defaults.baseURL + '/student/index' //数据接口
		, page: true //开启分页
		, cols: [[ //表头
			{ field: 'sid', title: 'ID', sort: true, fixed: 'left' }
			, { field: 'sname', title: '姓名' }
			, { field: 'stuno', title: '学号', sort: true }
			, { field: 'spasswd', title: '密码' }
			, { field: 'gid', title: '班级' }
			, { field: 'sex', title: '性别' }
			, { field: 'tel', title: '手机号' }
			, { field: 'qq', title: 'qq号' }
			, { field: 'username', title: '添加人' }
			, { field: 'addtimes', title: '添加时间' }
			, { field: 'updatetimes', title: '修改时间' }
			, { field: 'deltimes', title: '删除时间' }
			, { field: 'avatar', title: '头像地址' }
			, { fixed: 'right', width: 120, align: 'center', toolbar: '#barStudent' } //这里的toolbar值是模板元素的选择器
		]]
	});


	//监听工具条 
	table.on('tool(studentTab)', function (obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
		var data = obj.data; //获得当前行数据
		console.log(data);
		var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）

		if (layEvent === 'del') { //删除
			layer.confirm('真的删除行么', function (index) {
				obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
				axios.get('/student/del', {
					params: {
						sid: data.sid
					}
				})
					.then(res => {
						console.log(res);
						//删除成功之后关闭弹出框
						layer.close(index);
					})
					.catch(err => {
						console.error(err);
						//当前页面自动刷新‘
						window.location.reload();
					})
			});
		}
	});

	//编辑学生信息
	if (document.querySelector(".editstudent")) {
		let sid = window.location.search.split('=').pop();
		axios.get("/student/get", {
			params: { sid }
		})
			.then(res => {
				console.log(res)
				//给表单赋值
				form.val("editstudent", res.data.student);
				document.querySelector("#showimg").src = res.data.student.avatar;
				document.querySelector("#showimg").style.display = 'block';
			})
			.catch(err => {
				console.error(err);
			})
	}

	//确认学生修改信息
	//监听提交
	form.on('submit(editstudent)', function (data) {
		delete data.field.imgs;

		layer.msg(JSON.stringify(data.field));
		axios.post('/student/edit', data.field)
			.then(function (response) {

				if (response.data.code == 1) {
					console.log(response.data.Msg);
					window.location.href = './admin.html';
				}
				else {
					layer.msg(response.data.msg);
				}

			})
			.catch(function (error) {
				console.log(error);
			});
		return false;
	});

		// 管理员列表信息
		table.render({
			elem: '#adminlist'
			,height: 'auto'
			, url: axios.defaults.baseURL + '/admin/index' //数据接口
			, page: true //开启分页
			, cols: [[ //表头
				{ field: 'aid', title: 'ID', width: 50, sort: true, fixed: 'left' }
				,{ field: 'avatar', title: '头像', width: 180, templet: '#adminavatar' }
				, { field: 'username', title: '登录账号', width: 180 }
				, { field: 'passwd', title: '密码', width: 80 }
				, { field: 'nums', title: '登录次数', width: 80 }
				, { field: 'logintimes', title: '最后一次登录时间', width: 220 }
				, { fixed: 'right', width: 150, align: 'center', toolbar: '#barDemo'}
			]]
		});
	
		//监听管理员工具条 
		table.on('tool(adminlist)', function (obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
			var data = obj.data; //获得当前行数据
			console.log(data);
			var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
			if (layEvent === 'del') { //删除
				layer.confirm('真的删除行么', function (index) {
					obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
					axios.get('/admin/del',{
						params: {
						  aid: data.aid
						}
					  })
					.then(res => {
						console.log(res);
						// 应该在删除成功之后关闭弹出窗  页应该判断 返回的状态码 code
						layer.close(index);
					})
					.catch(err => {
						console.error(err); 
						window.location.reload();
					})
				});
			}
		});
	
		// 编辑管理员信息   获取aid
		if(document.querySelector('.eiditadmin')){
			let aid = window.location.search.split('=').pop();
			// 根据aid到服务器获取原始信息
			axios.get('/admin/get', {params:{aid}})
			.then(res => {
				form.val("eiditadmin", res.data.admin);
				if(res.data.admin.avatar){
					document.querySelector('#showimg').src = res.data.admin.avatar;
					document.querySelector('#showimg').style.display = 'block';
				}
			})
			.catch(err => {
				console.error(err); 
			})
		}
	
		// 确认修改
		form.on('submit(eiditadmin)', function (data) {
			//  发起ajax请求把数据提交给服务器
			delete data.field.imgs;
			axios.post('/admin/eidit', data.field)
				.then(function (response) {
					//添加成功
					if (response.data.code == 1) {
						window.location.href = '/app/html/admin/admin-user.html';
					} else {
						layer.msg(response.data.Msg);
					}
				})
				.catch(function (error) {
					console.log(error);
				});
			return false;
		});
		
		//监听管理员添加
		form.on('submit(addadmin)', function (data) {
				//  发起ajax请求把数据提交给服务器
				delete data.field.imgs;
				axios.post('/admin/add', data.field)
					.then(function (response) {
						console.log(response);
						//添加成功
						if (response.data.code == 1) {
							window.location.href = '/app/html/admin/admin-user.html';
						} else {
							layer.msg(response.data.Msg);
						}
					})
					.catch(function (error) {
						console.log(error);
					});
				return false;
		});

}();
