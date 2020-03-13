if (document.querySelector('.layui-header')) {
    document.querySelector('.layui-header').innerHTML =`
    <div class="layui-logo">面试题系统管理</div>
    <!-- 头部区域（可配合layui已有的水平导航） -->
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
        <li class="layui-nav-item logout"><a href="/qianduan/admin-login.html">退出</a></li>
    </ul>
    `;
}
if(document.querySelector('.layui-side')){
    document.querySelector('.layui-side').innerHTML=`
    <div class="layui-side-scroll">
    <!-- 左侧导航区域（可配合layui已有的垂直导航） -->
    <ul class="layui-nav layui-nav-tree" lay-filter="test">
        <div style="background-color: #333;margin: 20px;width: 70px;">管理员管理</div>
        <li class="layui-nav-item">
        <a href="/app/html/admin/admin-user.html">管理员列表</a>
        </li>
        <li class="layui-nav-item">
            <a href="/app/html/admin/addadmin.html">添加管理员</a>
        </li>
        <li class="layui-nav-item">
            <a href="/app/admin.html">其他管理</a>
        </li>
    </ul>
</div>
    `;
}