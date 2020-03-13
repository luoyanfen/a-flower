    if (document.querySelector('.layui-header')) {
        document.querySelector('.layui-header').innerHTML = `
        <div class="layui-logo">面试题系统管理</div>
        <!-- 头部区域（可配合layui已有的水平导航） -->
        <ul class="layui-nav layui-layout-left">
            <li class="layui-nav-item"><a href="/app/html/admin/admin-user.html">管理员管理</a></li>
            <li class="layui-nav-item"><a href="/app/html/admin/admin-user.html">个人中心</a></li>
        </ul>
        <ul class="layui-nav layui-layout-right">
            <li class="layui-nav-item">
                <a href="javascript:;">
                    <img src="http://t.cn/RCzsdCq" class="layui-nav-img avatar">
                    <span class="username">管理员</span>
                </a>
                <dl class="layui-nav-child">
                    <dd><a href="/app/html/admin/admin-user.html">基本资料</a></dd>
                    <dd><a href="/app/html/admin/updateadmin.html">修改密码</a></dd>
                </dl>
            </li>
            <li class="layui-nav-item logout"><a href="/app/admin-login.html">退出</a></li>
        </ul>
        `;
    }
    if(document.querySelector('.layui-side')){
        document.querySelector('.layui-side').innerHTML=`
        <div class="layui-side-scroll">
        <!-- 左侧导航区域（可配合layui已有的垂直导航） -->
        <ul class="layui-nav layui-nav-tree" lay-filter="test">
            <li class="layui-nav-item">
                <a href="javascript:;">学生管理</a>
                <dl class="layui-nav-child">
                    <dd><a href="./student.html">查看学生信息</a></dd>
                    <dd><a href="./addstudent.html">添加学生</a></dd>
                </dl>
            </li>
            <li class="layui-nav-item">
                <a href="javascript:;">课程管理</a>
                <dl class="layui-nav-child">
                    <dd><a href="./course.html">查看课程信息</a></dd>
                    <dd><a href="./addcourse.html">添加课程</a></dd>
                </dl>
            </li>
            <li class="layui-nav-item">
                <a href="javascript:;">面试题库管理</a>
                <dl class="layui-nav-child">
                    <dd><a href="/app/html/question/question.html">查看面试题</a></dd>
                    <dd><a href="/app/html/question/addquestion.html">添加面试题</a></dd>
                </dl>
            </li>
        </ul>
    </div>`;
    }

