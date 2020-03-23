let http = require('http')
let fs = require('fs')
const express = require('express');
const app = new express();
app.get('/add',function (req,res) {
    let title = req.query.title
    let content = req.query.content
        fs.writeFile(title,content,err => {
            if(err){
                res.end(err.message)
            }
        })

    res.end('Them thanh công')
})
app.get('/addFile',function (req,res) {
    res.sendFile(__dirname+'/add.html')
})
app.get('/deleteFile',function (req,res){
    res.sendFile(__dirname+'/delete.html')
})
app.get('/', function(request, response){
    response.sendFile(__dirname+'/index.html');
});
app.get('/delete', function(request, response){
    fs.unlink(request.query.title,function (err) {
        response.end('Có lỗi xảy ra')
    })
    response.end('Xoa file thanh cong')
});
app.get('/edit', function(request, response){
    fs.writeFile(request.query.title, request.query.content, function (err) {
        if (err) throw err;
        response.end('Sua File thanh cong !')
    });
});
app.get('/editFile', function(request, response){

    response.sendFile(__dirname+'/edit.html')
});
app.get('/readFile',function (req,res){
    res.sendFile(__dirname+'/read.html')
})
app.get('/read', function(request, response){
    fs.readFile(request.query.title, function(err, data) {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
        response.end();
    });
});
app.listen(9000)