let book = {
    name: 'JavaScript编程设计',
    number: 2,
    id: 1
}
axios.interceptors.response.use(function (response) {
    let { config: { method, url, data } } = response
    //这个data为请求时的data
    //let config = response.config
    //let {method,url,data} = config data
    if (url === '/books/1' && method == 'get') {
        response.data = book //这个data是响应的data

    } else if (url === '/books/1' && method == 'put') {
        Object.assign(book, data)
        response.data = book
    }
    return response
})
//以上是假的后台
axios.get('/books/1')
    .then(({ data }) => { //data=response.data
        let originalHtml = $('#app').html()
        let newHtml = originalHtml.replace('__name__', data.name)
            .replace('__number__', data.number)
        $('#app').html(newHtml)
    })

$('#app').on('click', '#addOne', function () {
    //事件委托,当点击#app里的元素，且元素符合addOne，就执行以下代码，即使代码被替换
    var oldNumber = $('#number').text()
    var newNumber = oldNumber - 0 + 1
    axios.put('/books/1', {
        number: newNumber
    }).then(() => {
        $('#number').text(newNumber)
    })

})
$('#app').on('click', '#minusOne', function () {
    var oldNumber = $('#number').text()
    var newNumber = oldNumber - 0 - 1
    axios.put('/books/1', {
        number: newNumber
    }).then(() => {
        $('#number').text(newNumber)
    })
})
$('#app').on('click', '#reset', function () {
    axios.put('/books/1', {
        number: 0
    }).then(() => {
        $('#number').text(0)
    })
})