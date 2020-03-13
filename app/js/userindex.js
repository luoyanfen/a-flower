axios.defaults.baseURL = 'http://admin.jianmian.com:8080';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;

window.onload = function () {
  axios.get('/userque/index', {
    withCredentials: true
  })
    .then(function (response) {
      // console.log(response);
      // console.log(response.data);
      let resault = response.data;
      console.log(resault)
      // document.querySelector('.mycontext').innerHTML=`<p><b>${resault.title}</b></p><br>`+`<p>答案:${resault.answer}</p><br>`+`<p>解析:${resault.analysis}</p><br>`+`<p>难度:${resault.difficulty}</p>`;
    })
    .catch(function (error) {
      console.log(error);
    });
}


layui.use('table', function () {
  var table = layui.table;
  //第一个实例
  table.render({
    elem: '#quelist'
    , height: 'auto'
    , url: axios.defaults.baseURL + '/userque/index' //数据接口
    , page: true //开启分页
    , cols: [[ //表头
      { field: 'qid', title: '序号', width: 80, sort: true, fixed: 'left' }
      , { field: 'difficulty', title: '难度', width: 80, sort: true }
      , { field: 'kid', title: '知识点ID', width: 90 }
      , { field: 'kname', title: '知识点', width: 80 }
      , { field: 'title', title: '题目', width: 200 }
      , { field: 'answer', title: '答案', width: 200 }
      , { field: 'analysis', title: '解析' }
      , { fixed: 'right', width: 150, align: 'center', toolbar: '#barDemo' }
    ]]
  });

  table.render({
    elem: '#fquelist'
    , height: 'auto'
    , url: axios.defaults.baseURL + '/userque/index' //数据接口
    , page: true //开启分页
    , cols: [[ //表头
      { field: 'qid', title: '序号', width: 80, sort: true, fixed: 'left' }
      , { field: 'difficulty', title: '难度', width: 80, sort: true }
      , { field: 'kid', title: '知识点ID', width: 80 }
      , { field: 'kname', title: '知识点', width: 80 }
      , { field: 'title', title: '题目', width: 200 }
      , { field: 'answer', title: '答案', width: 200 }
      , { field: 'analysis', title: '解析', width: 210 }
      , { fixed: 'right', width: 150, align: 'center', toolbar: '#barDemo' }
    ]]
  });

  table.render({
    elem: '#delquelist'
    , height: 'auto'
    , url: axios.defaults.baseURL + '/userque/index' //数据接口
    , page: true //开启分页
    , cols: [[ //表头
      { field: 'qid', title: '序号', width: 80, sort: true, fixed: 'left' }
      , { field: 'difficulty', title: '难度', width: 80, sort: true }
      , { field: 'kid', title: '知识点ID', width: 80 }
      , { field: 'kname', title: '知识点', width: 80 }
      , { field: 'title', title: '题目', width: 200 }
      , { field: 'answer', title: '答案', width: 200 }
      , { field: 'analysis', title: '解析', width: 210 }
      , { fixed: 'right', width: 150, align: 'center', toolbar: '#barDemo' }
    ]]
  });

  table.on('tool(test)', function (obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
  var data = obj.data; //获得当前行数据
  console.log(data)
  var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
  if (layEvent === 'detail') { //查看
  } else if (layEvent === 'del') { //删除
    layer.confirm('确定要删除该行么', function (index) {
      obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
      axios.get('/userque/del',
      {params:{
        qid:data.qid
      }})
      .then(res => {
        console.log(res);
        layer.close(index);
      })
      .catch(err => {
        console.error(err); 
        window.location.reload();
      }) 
      //向服务端发送删除指令
    });
  }
});
});


document.querySelector('#search').onclick = function () {
  let sousuo=document.querySelector('#sousuo').value;
  //  发起ajax请求把数据提交给服务器
  axios.get(axios.defaults.baseURL + '/userque/search',[{
    kname:`${sousuo}`,
  }])
    .then(function (response) {
      console.log(response.data.data);
      layui.use('table', function () {
        var table = layui.table;
        //第一个实例
        table.render({
          elem: '#quelist'
          , height: 'auto'
          , url: axios.defaults.baseURL + '/userque/search' //数据接口
          , page: true //开启分页
          , cols: [[ //表头
            { field: 'qid', title: '序号', width: 80, sort: true, fixed: 'left' }
            , { field: 'difficulty', title: '难度', width: 80, sort: true }
            , { field: 'kid', title: '知识点ID', width: 90 }
            , { field: 'kname', title: '知识点', width: 80 }
            , { field: 'title', title: '题目', width: 200 }
            , { field: 'answer', title: '答案', width: 200 }
            , { field: 'analysis', title: '解析' }
            , { fixed: 'right', width: 150, align: 'center', toolbar: '#barDemo' }
          ]]
        });
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  return false;
}


axios.get(axios.defaults.baseURL + '/userque/info')
  .then(res => {
    console.log(res.data);
    let data = res.data;
    document.querySelector('.headpic').src = `${data.avatar}`;
    document.querySelector('.nickname').innerHTML = `${data.nickname}`;
    document.querySelector('.sname').value = `${data.sname}`;
    document.querySelector('.stuno').value = `${data.stuno}`;
    document.querySelector('.sgid').value = `${data.gid}`;
    document.querySelector('.stel').value = `${data.tel}`;
    document.querySelector('.sqq').value = `${data.qq}`;
    document.querySelector('.sinfo').value = `${data.remarks}`;
  })
  .catch(err => {
    console.error(err);
  })





