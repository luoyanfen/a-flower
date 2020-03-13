axios.defaults.baseURL = 'http://admin.jianmian.com:8080';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;

axios.get('/courses')
.then(res => {
    let arr=res.data.map(function(lo,i){
      console.log(i)
        return `<div class="iconfont ">
        <a href="${lo.vurl}">
      <div style= background-color:${lo.color}  class="imgg">${lo.vname}</div>
        <li>${lo.vname}</li>
        <p>${lo.info}</p>
    </a>
  </div>`
    })
    console.log(res.data[0].color)
    document.querySelector(".buttom-content").innerHTML=arr.join("");
    
})
.catch(err => {
    console.error(err); 
})
