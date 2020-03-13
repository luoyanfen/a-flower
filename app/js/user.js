axios.defaults.baseURL = 'http://admin.jianmian.com:8080';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;

axios.get('/user')
.then(res => {
    let arr=res.data.map(function(us,i){
      console.log(i)
      console.log(us)
        return `<div>
        <a href="${us.ihref}">
        <div class="iconfont ${us.icon}"  >
          <div>
            <li>${us.iname}</li>
            <p>丰富逻辑，强大逻辑</p>
            <p>问卷密码，红包抽奖</p>
          </div>
        </div>
      </div></a>`
     
    })
    document.querySelector(".buttom-content").innerHTML=arr.join("");
    
})
.catch(err => {
    console.error(err); 
})
