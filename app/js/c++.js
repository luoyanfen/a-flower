axios.defaults.baseURL = 'http://admin.jianmian.com:8080';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;

axios.get('/chapter')
.then(res => {
console.log(res.data)
    let htmlarr=res.data.map(function(v,i){
        console.log(v)
        return `<div class="item">
        <a href="${v.herf}"> <p>${v.cname}</p></a>
    </div>`
    })

    console.log(res)
    document.querySelector(".content").innerHTML=htmlarr.join("")
})
.catch(err => {
    console.error(err); 
})



